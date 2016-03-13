import {Samples} from '../samples';
import {ICodePreviewFileDefinition} from 'docs/code-preview';
import config from '../config';

let grid = Samples.instance.getOrCreateModule('grid');

let common = 'grid/common-sample-files/';
let files = {
  simpleCities: { name: 'CitiesController.csharp', src: common + 'CitiesController.csharp', type: 'csharp' },
  queryLanguageCities: { name: 'CitiesController.csharp', src:common + 'CitiesWithQueryLanguageController.csharp', type: 'csharp' },
  globalAsax: { name: 'Global.asax.csharp', src: common + 'Global.asax.csharp', type: 'csharp' },
  data: { name: 'data.ts', src: common + 'data.ts', type: 'typescript' },
  config: { name: 'config.ts', src: common + 'config.ts', type: 'typescript' }
}

grid.createGroup('', 'base')
  .add({
    title: 'Getting started',
    name: 'getting-started',
    href: '#/grid/getting-started'
  }, false);

grid.createGroup('Data Source', 'data-source')
  .add({
    title: 'Binding to local data',
    name: 'local-data',
    files: [files.data]
  })
  .add({
    title: 'Binding to remote data',
    name: 'remote-data',
    files: [files.config, files.simpleCities, files.globalAsax]
  })
  .add({
    title: 'Custom data source parameter',
    name: 'custom-param',
    files: [files.config, files.simpleCities, files.globalAsax],
    description: false
  })
  .add({
    title: 'HttpClient based read',
    name: 'httpclient-based-read',
    files: [files.config, files.simpleCities, files.globalAsax]
  });

grid.createGroup('General', 'general')
  .add({
    title: 'Column template',
    name: 'column-template'
  })
  .add({
    title: 'Pagination',
    name: 'pagination'
  })
  .add({
    title: 'Column reordering',
    name: 'column-reordering',
    description: false
  })
  .add({
    title: 'Grouping',
    name: 'grouping',
    description: false
  })
  .add({
    title: 'State persistence',
    name: 'state-persistence'
  })
  .add({
    title: 'Custom component',
    name: 'custom-component',
    files: [
      { name: 'refresh-component.ts', src: 'grid/general/custom-component/refresh-component.ts', type: 'typescript' },
      { name: 'refresh-component.html', src: 'grid/general/custom-component/refresh-component.html', type: 'html' }
    ]
  })
  .add({
    title: 'Selection',
    name: 'selection',
    labels: ['new']
  })
  .add({
    title: 'Localization',
    name: 'localization',
    labels: ['new'],
    files: [
      { name: 'localization-config.ts', src: 'grid/general/localization/localization-config.ts', type: 'typescript' }
    ]
  })
  .add({
    title: 'Query language',
    name: 'query-language',
    files: [files.config, files.queryLanguageCities, files.globalAsax]
  });

grid.createGroup('Sorting', 'sorting')
  .add({
    title: 'Single column',
    pageTitle: 'Single column sorting',
    name: 'single-column'
  })
  .add({
    title: 'Multiple columns',
    pageTitle: 'Multiple column sorting',
    name: 'multiple-columns'
  })
  .add({
    title: 'Remote binding',
    pageTitle: 'Sorting with remote binding',
    name: 'remote',
    files: [files.config, files.simpleCities, files.globalAsax]
  });

grid.createGroup('Column chooser', 'column-chooser')
  .add({
    title: 'Local binding',
    pageTitle: 'Column chooser with local binding',
    name: 'local-binding'
  })
  .add({
    title: 'Remote binding',
    pageTitle: 'Column chooser with remote binding',
    name: 'remote-binding',
    files: [files.config, files.simpleCities, files.globalAsax]
  });

grid.createGroup('Filtering', 'filtering')
  .add({
    title: 'Filter row',
    name: 'filter-row',
    files: [files.config, files.simpleCities, files.globalAsax]
  });

if(config.environment.current === config.environment.list.development) {
  grid.createGroup('Experimental', 'experimental')
    .add({
      title: 'Local data source mutation',
      name: 'local-mutation'
    })
    .add({
      title: 'Remote data source mutation',
      name: 'remote-mutation'
    });
}

export class Examples {
  routes = [];
  router;

  configureRouter(config, router) {
    this.routes.push({ route: ['sample/:name'], name: 'sample', moduleId: `../sample`, nav: false, title: 'Sample', sampleModule: 'grid' });
    this.routes.push({ route: ['getting-started', ''], name: 'getting-started', moduleId: `./base/getting-started/getting-started`, nav: false, title: 'Getting started' });
    config.map(this.routes);

    let navigation = Samples.instance.createNavigation('grid', router);
    this.router = { navigation: navigation };
  }

  addRoute(pageTitle, name, group) {
    this.routes.push({ route: [name], name: name, moduleId: `./${name}/${name}`, nav: true, title: pageTitle, group: group });
    return this;
  }
}
