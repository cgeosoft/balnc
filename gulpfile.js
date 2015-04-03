var gulp = require('gulp');
var sass = require('gulp-sass')
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var jsoncombine = require("gulp-jsoncombine");

gulp.task('inject_scripts', function() {
	var sources = gulp.src("./app/scripts/**/*.js", {
			read: true
		})
		.pipe(angularFilesort());

	gulp.src('./app/index.html')
		.pipe(inject(sources, {
			relative: true
		}))
		.pipe(gulp.dest('./app'));

});

gulp.task('temp_database', function() {
	gulp.src("./data/*.json")
		.pipe(jsoncombine("database.json", function(data) {
			return new Buffer(JSON.stringify(data));
		}))
		.pipe(gulp.dest("./app/data/"));
});

gulp.task('serve', ['sass','inject_scripts','temp_database'], function() {

	browserSync({
		server: "./app/"
	});

	gulp.watch("./data/*.json", ['temp_database']);
	gulp.watch("./scss/*.scss", ['sass']);
	gulp.watch("./app/scripts/*.js").on('change', reload);
	gulp.watch("./app/views/**/*.html").on('change', reload);

});

gulp.task('sass', function() {
	return gulp.src("./scss/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("./app/css"))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('default', ['serve']);
