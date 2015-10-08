'use strict';
var gp, gulp;

gulp = require('gulp');
gp   = (require('gulp-load-plugins'))({
  lazy: false
});

gulp.task('default', function() {
  livereload.listen();
});

gulp.task('connect', ['default'], function() {
  return gp.connect.server({
    root: 'app',
    port: 9000,
    livereload: true
  });
});