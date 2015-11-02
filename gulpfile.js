var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var appFiles = ['lib/*.js'];
var testFiles = ['test/*.js'];

gulp.task('jshint:test', function() {
  return gulp.src(testFiles)
    .pipe(jshint.reporter('default'));
});

gulp.task('jshint:transform', function() {
  return gulp.src(appFiles)
    .pipe(jshint.reporter('default'));
});

gulp.task('mocha', function() {
  return gulp.src('./test/*.js', {read: true})
    .pipe(mocha({reaporter: 'nyan'}));
});


gulp.task('jshint', ['jshint:test', 'jshint:transform']);
gulp.task('default', ['jshint', 'mocha']);
