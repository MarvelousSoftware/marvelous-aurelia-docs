var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

// outputs changes to files to the console
function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function (callback) {
  return runSequence(
    'clean-internal-dependencies',
    'copy-internal-dependencies',
    'build',
    'watch-for-local-changes',
    'watch-for-external-changes',
    callback
    );
});

gulp.task('watch-for-external-changes', function () {
  return gulp.watch(paths.deps.watch, ['copy-internal-dependencies', browserSync.reload]).on('change', reportChange);
});

gulp.task('watch-for-local-changes', function () {
  gulp.watch(paths.source, ['build-system', 'copy-typescript', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.html, ['build-html', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.sass, ['build-sass', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.md, ['copy-markdown', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.csharp, ['copy-csharp', browserSync.reload]).on('change', reportChange);
});