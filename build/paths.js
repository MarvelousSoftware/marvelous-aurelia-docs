var pkg = require('../package.json');
var appRoot = 'src/';
var outputRoot = 'wwwroot/dist/';
var jspmPackages = 'wwwroot/jspm_packages';

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

function getDependencyInfo (name, packageName) {
  packageName = 'marvelous-aurelia-' + (packageName || name);
  var packagesDirectory = jspmPackages + '/github/marveloussoftware/';
  
  var jspmPackageDefinition = pkg.jspm.dependencies[packageName];
  var versionStartIndex = jspmPackageDefinition.indexOf('@');
  var version = jspmPackageDefinition.substr(versionStartIndex + 1);
  if(isNaN(parseInt(version[0]))) {
    version = version.substr(1);
  }
  
  var fullPackageName = packageName + '@' + version;
  
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