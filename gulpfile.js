const gulp = require('gulp');
const uglify = require('gulp-uglify');
const minifycss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const sass = require('gulp-sass');
 
sass.compiler = require('node-sass');


gulp.task('minify-js', function () {
  return gulp.src('./src/js/**/*.js')
  .pipe(uglify())
  .pipe(concat('script.min.js'))
  .pipe(gulp.dest('./build/js'));
});


gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifycss({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./build/css'));
});


gulp.task('image-min', function () {
  return gulp.src('./src/img/*')
  .pipe(imagemin({ progressive: true, optimizationLevel: 7 }))
  .pipe(gulp.dest('./build/img'));
});


gulp.task('browser-sync', function() {
  return browserSync.init({
    watch: true,
    server: {
      baseDir: "./"
    }
  });

});

const watch = function () {
  gulp.watch('./index.html').on('change', browserSync.reload);
  gulp.watch('./src/js/**/*.js', ['minify-js']).on('change', browserSync.reload);
  gulp.watch('./src/scss/**/*.scss', ['sass']).on('change', browserSync.reload);
  gulp.watch('./src/img/**/*', ['image-min']).on('change', browserSync.reload);
}


gulp.task('default', gulp.series('image-min', 'minify-js', 'sass', 'browser-sync', watch));
