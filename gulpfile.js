var _ = require('underscore');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var path = require('path');
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
var loopbackAngular = require('gulp-loopback-sdk-angular');
var templateCache = require('gulp-angular-templatecache');

var pkg = require('./package.json');

gulp.task('default', ['build'], function () {
    gulp.watch("./scss/**/**.*", ['sass']);
    gulp.watch("./client-src/components/**/*.js", ['angular']);
    gulp.watch("./client-src/components/**/*.html", ['angular-templates']);
    //gulp.watch("./common/models/**/*.*", ['nglb']);
});

gulp.task('build', ['sass', 'angular', 'modules', 'loopback'], function () {

});

gulp.task('loopback', ['statics', 'loopback-storage'], function () {
    return gulp.src('./server/server.js')
        .pipe(loopbackAngular())
        .pipe(rename('lb-services.js'))
        .pipe(gulp.dest('./client/js'));
});

gulp.task('loopback-storage', function (cb) {
    if (!fs.existsSync("./storage")) {
        fs.mkdirSync("./storage");
    }
    cb();
});

gulp.task('sass', function () {

    return gulp.src("./scss/**/**.scss", {
        read: true,
    })
        .pipe(sass().on('error', sass.logError))
        .pipe(minify())
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(gulp.dest("./client/css"));

});

gulp.task('angular', ['angular-templates'], function () {

    return gulp.src("./client-src/components/**/*.js")
        .pipe(angularFilesort())
        .pipe(sourcemaps.init())
        .pipe(concat("app.js", {
            newLine: ';'
        }))
        .pipe(ngAnnotate({
            add: true
        }))
        .pipe(gulp.dest("./client/js"))
        .pipe(uglify({
            mangle: true,
        }))
        .pipe(rename({
            suffix: ".min",
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("./client/js"));

});

gulp.task('angular-templates', function () {
    return gulp.src('client-src/components/**/*.html')
        .pipe(templateCache({
            module: "app.templates",
            standalone: true,
        }))
        .pipe(gulp.dest('./client/js'));
});

gulp.task('db:migrate', function (cb) {

    var app = require('./server/server.js');
    var _defaults = require('./server/install/default-data.json');

    // console.log(_defaults.length)

    var _c = 0;

    _defaults.forEach(function (_default) {

        gutil.log('Generating... ', gutil.colors.magenta(_default.type));
        app.models[_default.type].upsert(_default.data, function (err, dat) {

            _c++;

            if (err) {
                gutil.log('Error', gutil.colors.magenta(_default.type), gutil.colors.red(err));
                return;
            }

            gutil.log('Complete', gutil.colors.magenta(_default.type));

            if (_c == _defaults.lengt) {
                gutil.log(gutil.colors.green("Finished"));

                cb();
            }
        });

    }, this);

    // var _roles = _.map(_defaults.auth, function (auth) {
    //     return {
    //         name: auth.role
    //     };
    // });

    // app.models.Role.create(_roles, function (err, roles) {
    //     if (err) cb(err);

    //     roles.forEach(function (role, i) {

    //         var _auth = _.findWhere(defaults.auth, {
    //             role: role.name
    //         });

    //         if (_auth.users.length === 0) {
    //             // No users where found. Just a role was created
    //             gutil.log('Empty role created', gutil.colors.magenta(role.name));
    //             return;
    //         }

    //         var _users = _.map(_auth.users, function (item) {
    //             item.created = new Date();
    //             return item;
    //         });

    //         app.models.AppUser.create(_users, function (err, users) {
    //             if (err) cb(err);

    //             users.forEach(function (user, j) {

    //                 role.principals.create({
    //                     principalType: app.models.RoleMapping.USER,
    //                     principalId: user.id
    //                 }, function (err, principal) {
    //                     if (err) cb(err);
    //                     gutil.log('Created user', gutil.colors.magenta(user.username), "[", gutil.colors.magenta(role.name), "]");
    //                 });
    //             });
    //         });
    //     });

    //     cb();

    // });

});

gulp.task('db:schema', function (cb) {

    var app = require('./server/server.js');

    var models = require(path.resolve(__dirname, './server/model-config.json'));
    var datasources = require(path.resolve(__dirname, './server/datasources.json'));
    var ds = app.dataSources.db;

    var _models = [];

    Object.keys(models).forEach(function (key) {
        if (typeof models[key].dataSource != 'undefined' && models[key].dataSource == "db") {
            if (typeof datasources[models[key].dataSource] != 'undefined') {
                _models.push(key);
            }
        }
    });

    ds.automigrate(_models, function (err) {
        if (err) cb(err);
        gutil.log('Migrated', gutil.colors.magenta(_models));
        cb();
    });

});

gulp.task('db:clean', function (cb) {

    var app = require('./server/server.js');
    var ds = app.dataSources.db;

    var models_count = fs.readdirSync("./mock").length;

    gulp.src("./mock/*.json")
        .pipe(through.obj(function (file, enc, next) {

            var name = path.basename(file.path, '.json');
            var _model = {
                name: name.charAt(0).toUpperCase() + name.slice(1),
            };

            gutil.log("Cleaning", gutil.colors.magenta(_model.name));

            app.models[_model.name].deleteAll(function (err) {
                if (err) cb(err);
                next();
            });

        }))
        .on('finish', function () {
            // ds.disconnect(function() {
            cb();
            // });
        })
        .on('error', function (error) {
            gutil.log(error);
            cb(error);
        });

});

gulp.task('db:mock', ['db:clean'], function (cb) {


    var app = require('./server/server.js');
    var ds = app.dataSources.db;

    var models_count = fs.readdirSync("./mock").length;

    gulp.src("./mock/*.json")
        .pipe(through.obj(function (file, enc, next) {

            var name = path.basename(file.path, '.json');
            var _model = {
                name: name.charAt(0).toUpperCase() + name.slice(1),
                data: JSON.parse(file.contents.toString("utf-8")),
            };

            gutil.log("Creating", gutil.colors.magenta(_model.data.length), "items of", gutil.colors.magenta(_model.name), "in database");

            app.models[_model.name].create(_model.data, function (err, obj) {
                if (err) cb(err);
                next();
            });

        }))
        .on('end', function () {
            // ds.disconnect(function() {
            cb();
            // });
        });


});

gulp.task('test:invoice', function (cb) {

    var glob = require('glob');
    var app = require('./server/server.js');

    app.models.Invoice.find({}, function (err, invoices) {
        if (err) cb(err);

        app.models.Invoice.generate(invoices[0].id, false, function (err, results) {
            if (err) cb(err);

            gutil.log("Generated", gutil.colors.magenta(JSON.stringify(results)));
            cb();
        });

    });

});

gulp.task('statics', function () {
    return gulp.src([
        "./client-src/*.*",
        "./client-src/static/**/*.*",
    ])
        .pipe(gulp.dest('./client'));
})

gulp.task('modules', function (cb) {

    gulp.src([
        "./node_modules/open-sans-fontface/open-sans.css",
        "./node_modules/font-awesome/css/font-awesome.min.css",
        "./node_modules/font-awesome/css/font-awesome.css.map",
        "./node_modules/cg-admin/dist/cg-admin.min.css",
        "./node_modules/leaflet/dist/leaflet.css",
    ])
        .pipe(gulp.dest('./client/css'));

    gulp.src([
        "./node_modules/open-sans-fontface/fonts/**/*.*",
    ])
        .pipe(gulp.dest('./client/css/fonts'));

    gulp.src([
        "./node_modules/font-awesome/fonts/**/*.*",
    ])
        .pipe(gulp.dest('./client/fonts'));

    gulp.src([
        "./node_modules/leaflet/dist/images/**/*.*",
    ])
        .pipe(gulp.dest('./client/images'));

    gulp.src([
        "./node_modules/cg-admin/dist/cg-admin.min.js",
        "./node_modules/cg-admin/dist/cg-admin.min.js.map",
        "./node_modules/underscore/underscore-min.js",
        "./node_modules/underscore/underscore-min.map",
        "./node_modules/moment/min/moment.min.js",
        "./node_modules/chart.js/dist/Chart.min.js",
        "./node_modules/pdfmake/build/pdfmake.min.js",
        "./node_modules/pdfmake/build/pdfmake.min.js.map",
        "./node_modules/pdfmake/build/vfs_fonts.js",
        "./node_modules/leaflet/dist/leaflet.js",
        "./node_modules/angular/angular.min.js",
        "./node_modules/angular/angular.min.js.map",
        "./node_modules/angular-resource/angular-resource.min.js",
        "./node_modules/angular-resource/angular-resource.min.js.map",
        "./node_modules/angular-sanitize/angular-sanitize.min.js",
        "./node_modules/angular-sanitize/angular-sanitize.min.js.map",
        "./node_modules/angular-cookies/angular-cookies.min.js",
        "./node_modules/angular-cookies/angular-cookies.min.js.map",
        "./node_modules/angular-file-upload/dist/angular-file-upload.min.js",
        "./node_modules/angular-file-upload/dist/angular-file-upload.min.js.map",
        "./node_modules/angular-leaflet-directive/dist/angular-leaflet-directive.min.js",
        "./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
        "./node_modules/angular-ui-router/release/angular-ui-router.min.js",
        "./node_modules/angular-ui-router-tabs/src/ui-router-tabs.js",
        "./node_modules/angular-chart.js/dist/angular-chart.min.js",
        "./node_modules/angular-chart.js/dist/angular-chart.min.js.map",
    ])
        .pipe(gulp.dest('./client/js'));

    cb();
});
