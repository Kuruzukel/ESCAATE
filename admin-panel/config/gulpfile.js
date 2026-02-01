const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

// Compile SCSS
gulp.task('sass', function () {
    return gulp.src('../src/assets/css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('../src/assets/css'))
        .pipe(browserSync.stream());
});

// Watch files
gulp.task('watch', function () {
    browserSync.init({
        server: '../'
    });
    gulp.watch('../src/assets/css/**/*.scss', gulp.series('sass'));
    gulp.watch('../src/**/*.html').on('change', browserSync.reload);
    gulp.watch('../src/assets/js/**/*.js').on('change', browserSync.reload);
});

// Default task
gulp.task('default', gulp.series('watch'));
