var _ = require('underscore');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
var shell = require('gulp-shell');
var pkg = require('./package.json');
var through = require('through2');
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
var bump = require('gulp-bump');

gulp.task('default', ['build'], function() {
    gulp.watch("./scss/**/**.*", ['sass']);
    gulp.watch("./client/src/**/*.js", ['scripts']);
    gulp.watch("./common/models/**/*.*", ['nglb']);
});

gulp.task('build', ['sass', 'scripts', 'nglb'], function() {});

gulp.task('nglb', shell.task([
    'lb-ng ./server/server.js ./client/assets/scripts/lb-services.js'
]));

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

gulp.task('scripts', ['config'], function() {

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

gulp.task('config', ['bump'], function() {
    var _client = require('./server/config.json').client;
    return fs.writeFile(
        "./client/src/config.js",
        "(function() { window.APP=" + JSON.stringify({
            name: pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1),
            description: pkg.description,
            version: pkg.version,
            repository: pkg.repository,
            author: pkg.author,
            client: _client,
        }) + "; })()"
    );

});

gulp.task('bump', function() {
    return gulp.src('./package.json')
        .pipe(bump({
            type: "prerelease"
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('db:migrate', ['db:migrate-schema'], function(cb) {

    var app = require('./server/server.js');
    var defaults = require('./server/config.json').defaults;

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

            app.models.AppUser.create(_users, function(err, users) {
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

    var app = require('./server/server.js');
    var ds = app.dataSources.db;

    var models_count = fs.readdirSync("./mock").length;

    gulp.src("./mock/*.json")
        .pipe(through.obj(function(file, enc, next) {

            var name = path.basename(file.path, '.json');
            var _model = {
                name: name.charAt(0).toUpperCase() + name.slice(1),
            };

            gutil.log("Cleaning", gutil.colors.magenta(_model.name));

            app.models[_model.name].deleteAll(function(err) {
                if (err) cb(err);
                next();
            });

        }))
        .on('finish', function() {
            // ds.disconnect(function() {
            cb();
            // });
        })
        .on('error', function(error) {
            gutil.log(error);
            cb(error);
        });

});

gulp.task('db:mock', ['db:clean'], function(cb) {


    var app = require('./server/server.js');
    var ds = app.dataSources.db;

    var models_count = fs.readdirSync("./mock").length;

    gulp.src("./mock/*.json")
        .pipe(through.obj(function(file, enc, next) {

            var name = path.basename(file.path, '.json');
            var _model = {
                name: name.charAt(0).toUpperCase() + name.slice(1),
                data: JSON.parse(file.contents.toString("utf-8")),
            };

            gutil.log("Creating", gutil.colors.magenta(_model.data.length), "items of", gutil.colors.magenta(_model.name), "in database");

            app.models[_model.name].create(_model.data, function(err, obj) {
                if (err) cb(err);
                next();
            });

        }))
        .on('end', function() {
            // ds.disconnect(function() {
            cb();
            // });
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
