var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('serve', ['sass'], function() {

	browserSync({
    server: "./app/"
	});

	gulp.watch("./scss/*.scss", ['sass']);
	gulp.watch("./app/*.html").on('change', reload);

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("./scss/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("./app/css"))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('default', ['serve']);
