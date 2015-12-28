var _ = require('underscore');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var pkg = require('./package.json');

var angularFilesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');
var config = require('./config.json');
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

gulp.task('db:migrate', function() {

  var deferred = require('q').defer();
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
      ds.disconnect(function() {
        gutil.log('Migrated', gutil.colors.magenta(_models.join(", ")));
        deferred.resolve();
      });
    });
  });

  return deferred.promise;

});

gulp.task('db:mock', ['db:migrate'], function() {

  var q = require('q');
  var deferred = q.defer();
  var glob = require('glob');
  var app = require('./server/server.js');
  var ds = app.dataSources.db;

  function insert(model, next) {
    gutil.log("Processing:", gutil.colors.magenta(model.name));
    app.models[model.name].create(model.data, function(err, data) {
      if (err) throw (err);
      gutil.log("Inserted ", gutil.colors.magenta(data.length), "of", model.name);
      next();
    });
  }

  ds.connect();

  q.Promise(function(_resolve, _reject, notify) {
      var _models = [];
      glob("./mock/*.json", {}, function(err, files) {
        if (err) _reject(err);
        files.forEach(function(file) {
          var name = path.basename(file, '.json');
          _models.push({
            name: name.charAt(0).toUpperCase() + name.slice(1),
            data: require(file),
          });
        });
        gutil.log("Found", _models.length, "models");
        return _resolve(_models);
      });
    })
    .then(function(models) {
      var deferred2 = q.defer();
      ds.once('connected', function() {
        gutil.log("Connected:", gutil.colors.magenta(ds.name), ds.settings.host, ":", ds.settings.port, "/", ds.settings.database);

        gutil.log("models", models.length);
        // var index = _models.length;
        // do {
        //
        //   var i = _models.length - index;
        //   gutil.log("prog", index, _models);
        //   insert(_models[i]);
        //
        // } while (index-- > 0);
        return deferred2.resolve();
      });
      return deferred.promise;
    }, function(reject) {
      throw reject;
      deferred.resolve();
    });

  return deferred.promise;
  // return deferred.promise;

});
