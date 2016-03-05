import config from 'config';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Grid, dataSourceMode, IReadContext} from 'marvelous-aurelia-grid';

@inject(HttpClient)
export class HttpClientBasedRead {
  grid: Grid;
  gridOptions;

  constructor(http: HttpClient) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
          mode: 'cors'
        });
    });
    
    this.gridOptions = {
      dataSource: {
        mode: dataSourceMode.serverSide,
        read: (context: IReadContext) => {
          let apiUrl = config.apiUrl(`api/people`);
          
          // Grid needs to read parameters like current page, page size and many more (depending on the configuration).
          // These parameters should come in the query string. `context.url` takes a base URL as a parameter and returns
          // a new URL, readable by backend service (MarvelousSoftware.Grid.DataSource package).
          return http.fetch(context.url(apiUrl), {
            method: 'GET'
          }).then(x => x.json());
        }
      }
    };
  }
}
