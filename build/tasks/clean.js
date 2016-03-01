var gulp = require('gulp');
var paths = require('../paths');
var del = require('del');
var rimraf = require('gulp-rimraf');

// deletes all files in the output path
gulp.task('clean', function() {
  return gulp.src([paths.output])
    .pipe(rimraf());
});
