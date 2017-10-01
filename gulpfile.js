var gulp = require('gulp');
var webpack = require('webpack');
var webpackGulp = require('gulp-webpack');
var webpackConfig = require('./webpack/dev.js');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: false,
      directoryListing: true,
      open: './dist/dev/index.html'
    }));
});

gulp.task('build', function() {
  return gulp.src('src/index.js')
    .pipe(webpackGulp(webpackConfig, webpack))
    .pipe(gulp.dest('./dist/dev'));
});

gulp.task('sass:dev', function() {
  gulp.src(['./src/dev.scss'])
    .pipe(sass({
      'include css': true,
    }))
    .pipe(gulp.dest('./dist/dev/css/'));
});

gulp.task('sass:prod', function() {
  gulp.src(['./src/prod.scss'])
    .pipe(sass({
      'include css': true,
    }))
    .pipe(minify())
    .pipe(gulp.dest('./dist/prod/css/'));
});

gulp.task('assets:dev', function() {
  gulp.src(['./src/assets/**/*'])
  .pipe(gulp.dest('dist/dev/assets/'));
});

gulp.task('assets:prod', function() {
  gulp.src(['./src/assets/**/*'])
  .pipe(gulp.dest('dist/prod/assets/'));
});

gulp.task('default', ['build', 'sass:dev', 'webserver']);
