import data from '../../data';
import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {dataSourceMode} from 'marvelous-aurelia-grid';

@inject(HttpClient)
export class RemoteDataSourceMutation {
  gridOptions;
  grid;
  input = {};
  adding = false;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.gridOptions = {
      dataSource: {
        mode: dataSourceMode.serverSide,
        read: `http://localhost:54328/api/cities`
      }
    };
  }

  add() {
    this.adding = true;
    this.http.post('http://localhost:54328/api/cities', this.input).then(() => {
      this.grid.dataSource.addItem(JSON.parse(JSON.stringify(this.input)));
      this.adding = false;
    }, () => {
      this.adding = false;
    });
  }
}
