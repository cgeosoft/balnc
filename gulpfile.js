var _ = require('underscore');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var pkg = require('./package.json');
var config = require('./config.json');

var angularFilesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');
var connectModrewrite = require('connect-modrewrite');
var minify = require('gulp-clean-css');
var minimatch = require('minimatch');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('default', ['watch']);

gulp.task('watch', ['sass', 'build'], function() {

  gulp.watch("./scss/**/**.*", ['sass']);
  gulp.watch("./client/src/**/*.js", ['build']);

});

gulp.task('sass', function() {

  return gulp.src("./scss/**/**.scss", {
      read: true,
    })
    .pipe(sass().on('error', sass.logError))
    .pipe(minify())
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(gulp.dest("./client/assets/css"));

});

gulp.task('build', ['config'], function() {

  return gulp.src("./client/src/**/*.js")
    .pipe(angularFilesort())
    .pipe(sourcemaps.init())
    .pipe(concat("app.min.js", {
      newLine: ';'
    }))
    .pipe(ngAnnotate({
      add: true
    }))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("./client/assets/scripts"));

});

gulp.task('config', function() {

  return fs.writeFile(
    "./client/src/config.js",
    "(function() { window.APP=" + JSON.stringify({
      name: pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1),
      description: pkg.description,
      version: pkg.version,
      repository: pkg.repository,
      author: pkg.author,
      config: config
    }) + "; })()"
  );

});

gulp.task('db:migrate', ['db:migrate-schema'], function(cb) {

  var app = require('./server/server.js');
  var _roles = _.map(config.roles, function(item) {
    return {
      name: item
    };
  });

  var _users = _.map(config.users, function(item) {
    var _u = _.clone(item);
    _u.created = new Date();
    delete _u.role;
    return _u;
  });

  app.models.Role.create(_roles, function(err, roles) {
    if (err) throw err;
    gutil.log('Default roles created', gutil.colors.magenta(config.roles.join(", ")));

    config.users.forEach(function(_user, i) {
      app.models.User.create(_user, function(err, user) {
        if (err) throw err;
        app.models.Role.findOne({
          where: {
            name: user.role,
          }
        }, function(err, role) {
          if (err) throw err;
          gutil.log('Created user', gutil.colors.magenta(user.username), "and assigned to", gutil.colors.magenta(role.name), "role");

          if (i == config.users.length - 1) {
            cb();
          }
        });
      });
    });

  });

});

gulp.task('db:migrate-schema', function(cb) {

  var app = require('./server/server.js');

  var models = require(path.resolve(__dirname, './server/model-config.json'));
  var datasources = require(path.resolve(__dirname, './server/datasources.json'));
  var ds = app.dataSources.db;

  var _models = [];

  Object.keys(models).forEach(function(key) {
    if (typeof models[key].dataSource != 'undefined' && models[key].dataSource == "db") {
      if (typeof datasources[models[key].dataSource] != 'undefined') {
        _models.push(key);
      }
    }
  });

  ds.once('connected', function() {
    gutil.log("Connected:", gutil.colors.magenta(ds.name), ds.settings.host, ":", ds.settings.port, "/", ds.settings.database);
    ds.automigrate(_models, function(err) {
      if (err) throw err;
      cb();
    });
  });

});


function _getMockModels(files) {

  return _.map(files, function(file) {
    var name = path.basename(file, '.json');
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      data: require(file),
    };
  });

}

gulp.task('db:clean', function(cb) {

  var glob = require('glob');
  var app = require('./server/server.js');
  var ds = app.dataSources.db;

  return glob("./mock/*.json", {}, function(err, files) {
    if (err) cb(err);

    var _models = _getMockModels(files);

    gutil.log("Found", gutil.colors.magenta(_models.length), "models");

    _.each(_models, function(_model, i) {
      gutil.log("Delete all", gutil.colors.magenta(_model.name));
      app.models[_model.name].deleteAll(function(err) {
        if (err) cb(err);
        if (i == _models.length - 1) {
          cb();
        }
      });
    });
  });

});

gulp.task('db:mock', ['db:clean'], function(cb) {

  var glob = require('glob');
  var app = require('./server/server.js');
  var ds = app.dataSources.db;

  glob("./mock/*.json", {}, function(err, files) {
    if (err) cb(err);

    var _models = _getMockModels(files);

    gutil.log("Found", gutil.colors.magenta(_models.length), "models");

    _.each(_models, function(_model, i) {
      gutil.log("Inserting", gutil.colors.magenta(_model.data.length), "items of", gutil.colors.magenta(_model.name));
      app.models[_model.name].create(_model.data, function(err) {
        if (err) cb(err);
        if (i == _models.length - 1) {
          cb();
        }
      });
    });

    // _models.forEach(function(_model, i) {
    //   _model.data.forEach(function(_data, j) {
    //     app.models[_model.name].upsert(_data, function(err, data) {
    //       if (err) throw (err);
    //       if (i == _models.length - 1) {
    //         cb();
    //         process.exit(0);
    //       }
    //     });
    //   });
    // });

  });

});
