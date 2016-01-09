var _ = require('underscore');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var pkg = require('./package.json');

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
      client: require('./common/config/client/default.json'),
    }) + "; })()"
  );

});

gulp.task('db:migrate', ['db:migrate-schema'], function(cb) {

  var app = require('./server/server.js');
  var defaults =  require('./common/config/system/defaults.json');

  var _roles = _.map(defaults.auth, function(auth) {
    return {
      name: auth.role
    };
  });

  app.models.Role.create(_roles, function(err, roles) {
    if (err) cb(err);

    roles.forEach(function(role, i) {

      var _auth = _.findWhere(defaults.auth, {
        role: role.name
      });

      if (_auth.users.length === 0) {
        // No users where found. Just a role was created
        gutil.log('Empty role created', gutil.colors.magenta(role.name));
        return;
      }

      var _users = _.map(_auth.users, function(item) {
        item.created = new Date();
        return item;
      });

      app.models.User.create(_users, function(err, users) {
        if (err) cb(err);

        users.forEach(function(user, j) {

          role.principals.create({
            principalType: app.models.RoleMapping.USER,
            principalId: user.id
          }, function(err, principal) {
            if (err) cb(err);
            gutil.log('Created user', gutil.colors.magenta(user.username), "[", gutil.colors.magenta(role.name), "]");
          });
        });
      });
    });

    cb();

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

  ds.automigrate(_models, function(err) {
    if (err) cb(err);
    gutil.log('Migrated', gutil.colors.magenta(_models));
    cb();
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

  });

});


gulp.task('test:invoice', function(cb) {

  var glob = require('glob');
  var app = require('./server/server.js');

  app.models.Invoice.find({}, function(err, invoices) {
    if (err) cb(err);

    app.models.Invoice.generate(invoices[0].id, false, function(err, results) {
      if (err) cb(err);

      gutil.log("Generated", gutil.colors.magenta(JSON.stringify(results)));
      cb();
    });

  });

});
