var gulp = require('gulp');
var runSequence = require('run-sequence');
var paths = require('../paths');
var rimraf = require('gulp-rimraf');

// deletes all files in the output path
gulp.task('clean-export', function() {
  return gulp.src([paths.export.dest])
    .pipe(rimraf());
});

gulp.task('export-copy', function() {
  return gulp.src(paths.export.src)
    .pipe(gulp.dest(paths.export.dest));
});

// use after prepare-release
gulp.task('export', function(callback) {
  return runSequence(
    'copy-internal-dependencies',
    'bundle',
    'clean-export',
    'export-copy',
    'unbundle',
    callback
  );
});
