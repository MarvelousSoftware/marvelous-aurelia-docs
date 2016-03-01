var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var assign = Object.assign || require('object.assign');
var notify = require("gulp-notify");
var typescript = require('gulp-tsb');
var sass = require('gulp-sass');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
var typescriptCompiler = typescriptCompiler || null;
gulp.task('build-system', function () {
  if (!typescriptCompiler) {
    typescriptCompiler = typescript.create(require('../../tsconfig.json').compilerOptions);
  }
  return gulp.src(paths.dtsSrc.concat(paths.source))
    .pipe(plumber())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(typescriptCompiler())
    .pipe(sourcemaps.write({ includeContent: true }))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, { extension: '.html' }))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build-sass', function () {
  return gulp.src(paths.sass)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(paths.output));
});

// copies typescript files without any compilation for source code presentation
gulp.task('copy-typescript', function () {
  return gulp.src(paths.source)
    .pipe(changed(paths.output))
    .pipe(gulp.dest(paths.output));
});
gulp.task('copy-markdown', function () {
  return gulp.src(paths.md)
    .pipe(changed(paths.output, { extension: '.md' }))
    .pipe(gulp.dest(paths.output));
});
gulp.task('copy-csharp', function () {
  return gulp.src(paths.csharp)
    .pipe(changed(paths.output, { extension: '.csharp' }))
    .pipe(gulp.dest(paths.output));
});
gulp.task('copy-json', function () {
  return gulp.src(paths.json)
    .pipe(changed(paths.output, { extension: '.json' }))
    .pipe(gulp.dest(paths.output));
});


// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function (callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'build-sass', 'copy-typescript', 'copy-markdown', 'copy-csharp', 'copy-json'],
    callback
    );
});
