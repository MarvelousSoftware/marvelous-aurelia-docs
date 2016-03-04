import {Samples} from 'samples';
import config from '../config';

let module = Samples.instance.getOrCreateModule('forms');

module.createGroup('', 'base')
  .add({
    title: 'Getting started',
    name: 'getting-started',
    href: '#/forms/getting-started'
  }, false);

module.createGroup('Model based', 'model-based')
  .addSimple('Rows and columns', 'rows')
  .addSimple('Runtime changes', 'runtime-changes')
  .add({
    title: 'Custom templates',
    name: 'custom-templates',
    files: [{ name: 'text-field-custom-template.html', type: 'html' }]
  })
  .add({
    title: 'Custom control',
    name: 'custom-control',
    files: [{ name: 'volume.ts', type: 'typescript' }, { name: 'volume.html', type: 'html' }]
  });

module.createGroup('HTML based', 'html-based')
  .addSimple('All controls', 'all-controls')
  .add({
    title: 'Custom templates',
    name: 'custom-templates',
    files: [{ name: 'text-field-custom-template.html', type: 'html' }]
  });

module.createGroup('Validation', 'validation')
  .addSimple('Predefined validators', 'predefined')
  .addSimple('Inline custom validators', 'custom-inline')
  .addSimple('Global custom validators', 'custom-global')
  .addSimple('Overriding predefined validators', 'overriding')
  .addSimple('Asynchronous validation', 'async');

export class Examples {
  routes = [];
  router;

  configureRouter(config, router) {
    this.routes.push({ route: ['sample/:name'], name: 'sample', moduleId: `../sample`, nav: false, title: 'Sample', sampleModule: 'forms' });
    this.routes.push({ route: ['getting-started', ''], name: 'getting-started', moduleId: `./getting-started/getting-started`, nav: false, title: 'Getting started' });
    config.map(this.routes);

    let navigation = Samples.instance.createNavigation('forms', router);
    this.router = { navigation: navigation };
  }

  addRoute(pageTitle, name, group) {
    this.routes.push({ route: [name], name: name, moduleId: `./${name}/${name}`, nav: true, title: pageTitle, group: group });
    return this;
  }

}
