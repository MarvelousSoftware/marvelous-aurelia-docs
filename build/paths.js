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
    getDependencyInfo('marvelous-aurelia-core', 'core'),
    getDependencyInfo('marvelous-aurelia-query-language', 'query-language'),
    getDependencyInfo('marvelous-aurelia-grid', 'grid'),
    getDependencyInfo('marvelous-aurelia-forms', 'forms'),
    getDependencyInfo('marvelous-query-language', 'query-language')
  ]
}
var deps = module.exports.deps;
deps.watch = deps.map(function (x) { return x.buildSyncFile; });

function getDependencyInfo (packageName, mainFile) {
  var packagesDirectory = jspmPackages + '/github/marveloussoftware/';
  
  var jspmPackageDefinition = pkg.jspm.dependencies[packageName];
  var versionStartIndex = jspmPackageDefinition.indexOf('@');
  var version = jspmPackageDefinition.substr(versionStartIndex + 1);
  if(isNaN(parseInt(version[0]))) {
    version = version.substr(1);
  }
  
  var fullPackageName = packageName + '@' + version;
  
  return {
    name: packageName,
    fullPackageName: fullPackageName,
    main: 'github:marveloussoftware/' + fullPackageName + '/' + mainFile,
    packagesDirectory: packagesDirectory,
    copy: [
      {
        src: pkg.marvelous.projects[packageName] + 'dev/system/**/*.*',
        dest: packagesDirectory + fullPackageName
      },
      {
        src: pkg.marvelous.projects[packageName] + 'dev/' + packageName + '.d.ts',
        dest: packagesDirectory + fullPackageName
      }],
    buildSyncFile: pkg.marvelous.projects[packageName] + 'dev/buildSyncFile.txt'
  }
}