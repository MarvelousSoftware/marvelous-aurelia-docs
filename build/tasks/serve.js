var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', function(done) {
  browserSync({
    online: false,
    open: false,
    port: 9000,
    server: {
      baseDir: ['./wwwroot'],
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

// helper for bundled version testing
gulp.task('serve-bundled', function(done) {
  return runSequence('copy-internal-dependencies', 'bundle', 'serve', done);
});
