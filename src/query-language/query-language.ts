import {Samples} from '../samples';
import {ICodePreviewFileDefinition} from 'docs/code-preview';
import config from '../config';

let queryLanguage = Samples.instance.getOrCreateModule('query-language');
queryLanguage.createGroup('', 'base')
  .add({
    title: 'Getting started',
    name: 'getting-started',
    href: '#/query-language/getting-started'
  }, false)
  .add({
    title: 'Basic usage',
    name: 'basic',
    description: false,
    files: [
      { name: 'CitiesWithQueryLanguageController.ts', src: 'query-language/base/basic/server-side-config.csharp', type: 'csharp' }
    ]
  })
  .add({
    title: 'Predefined functions',
    name: 'predefined-functions',
    description: false,
    files: [
      { name: 'MqlWithFunctionsController.ts', src: 'query-language/base/predefined-functions/server-side-config.csharp', type: 'csharp' }
    ]
  })
  .add({
    title: 'Custom functions',
    name: 'custom-functions',
    description: false,
    files: [
      { name: 'MqlWithFunctionsController.ts', src: 'query-language/base/custom-functions/server-side-config.csharp', type: 'csharp' }
    ]
  })
  .add({
    title: 'Syntax configuration',
    name: 'syntax-config',
    description: false,
    labels: ['new'],
    files: [
      { name: 'MqlWithCustomSyntaxController.ts', src: 'query-language/base/syntax-config/server-side-config.csharp', type: 'csharp' }
    ]
  })
  .add({
    title: 'Aurelia independent',
    name: 'without-aurelia',
    labels: ['new'],
    files: [
      { name: 'MqlWithCustomSyntaxController.ts', src: 'query-language/base/syntax-config/server-side-config.csharp', type: 'csharp' }
    ]
  });


export class Examples {
  routes = [];
  router;

  configureRouter(config, router) {
    this.routes.push({ route: ['sample/:name'], name: 'sample', moduleId: `../sample`, nav: false, 
      title: 'Sample', sampleModule: queryLanguage.name });
    this.routes.push({ route: ['getting-started', ''], name: 'getting-started', moduleId: `./base/getting-started/getting-started`, 
      nav: false, title: 'Getting started' });
      
    config.map(this.routes);

    let navigation = Samples.instance.createNavigation(queryLanguage.name, router);
    this.router = { navigation: navigation };
  }
}
