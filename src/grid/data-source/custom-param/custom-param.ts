import config from 'config';
import {inject, BindingEngine} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Grid, dataSourceMode} from 'marvelous-aurelia-grid';

@inject(BindingEngine, HttpClient)
export class CustomDataSourceParam {
  grid: Grid;
  gridOptions;
  projects: any;
  selectedProject: { Name: string, Id: number };
  observers = [];

  constructor(bindingEngine: BindingEngine, private http: HttpClient) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
          mode: 'cors'
        });
    });

    this.observers.push(bindingEngine.propertyObserver(this, 'selectedProject')
      .subscribe((n, o) => { this.selectedProjectChanged(n, o); })
      .dispose);

    this.gridOptions = {
      dataSource: {
        mode: dataSourceMode.serverSide,
        read: () => {
          if (!this.selectedProject) {
            // project is not selected yet therefore grid needs to wait a bit longer
            return;
          }
          
          // project already selected, data ready to download
          return config.apiUrl(`api/project/${this.selectedProject.Id}/people`);
        }
      }
    };
  }

  activate() {
    return this.http.fetch(config.apiUrl('api/projects'))
      .then(x => x.json())
      .then(x => {
        this.projects = x.data;
        this.selectedProject = this.projects[0];
      });
  }

  unbind() {
    this.observers.forEach(x => x());
  }

  selectedProjectChanged(newVal, oldVal) {
    if (newVal !== oldVal) {
      this.grid.refresh();
    }
  }

  refresh() {
    this.grid.refresh();
  }
}
