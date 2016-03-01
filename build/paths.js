var pkg = require('../package.json');
var appRoot = 'src/';
var outputRoot = 'wwwroot/dist/';
var jspmPackages = 'wwwroot/jspm_packages';

var getDependencyInfo = function (name, packageName) {
  packageName = 'marvelous-aurelia-' + (packageName || name);
  var fullPackageName = packageName + '@dev';
  var packagesDirectory = jspmPackages + '/github/marveloussoftware/';
  
  return {
    name: name,
    fullPackageName: fullPackageName,
    main: 'github:marveloussoftware/' + fullPackageName + '/' + name,
    packagesDirectory: packagesDirectory,
    copy: [
      {
        src: pkg.marvelous.projects[name] + 'dev/system/**/*.*',
        dest: packagesDirectory + fullPackageName
      },
      {
        src: pkg.marvelous.projects[name] + 'dev/' + packageName + '.d.ts',
        dest: 'typings/marvelous-software'
      }],
    buildSyncFile: pkg.marvelous.projects[name] + 'dev/buildSyncFile.txt'
  }
}

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  sass: appRoot + '**/*.scss',
  md: appRoot + '**/*.md',
  csharp: appRoot + '**/*.csharp',
  json: appRoot + '**/*.json',
  output: outputRoot,
  export: {
    src: 'wwwroot/**/*',
    dest: 'export/'
  },
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/**/*.ts',
  e2eSpecsDist: 'test/e2e/dist/',
  jspmPackages: jspmPackages,
  dtsSrc: [
    'typings/**/*.ts',
    jspmPackages + '/**/*.d.ts'
  ],
  deps: [
    getDependencyInfo('core'),
    getDependencyInfo('queryLanguage', 'query-language'),
    getDependencyInfo('grid'),
    getDependencyInfo('forms')
  ]
}
var deps = module.exports.deps;
deps.watch = deps.map(function (x) { return x.buildSyncFile; });