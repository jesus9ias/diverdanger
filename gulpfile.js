var gulp = require('gulp');
var webpack = require('webpack');
var webpackGulp = require('gulp-webpack');
var webpackConfig = require('./webpack/config.js');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: false,
      directoryListing: true,
      open: './index.html'
    }));
});

gulp.task('build', function() {
  return gulp.src('src/index.js')
    .pipe(webpackGulp(webpackConfig, webpack))
    .pipe(gulp.dest('./dist'));
});

gulp.task('images', function() {
  gulp.src(['./src/assets/**/*'])
  .pipe(gulp.dest('dist/assets/'));
});

gulp.task('default', ['build', 'webserver']);
