import config from 'config';
import {dataSourceMode} from 'marvelous-aurelia-grid';

export class RemoteData {
  gridOptions;

  constructor() {
    this.gridOptions = {
      dataSource: {
        mode: dataSourceMode.serverSide,
        read: config.apiUrl(`api/cities`),
        onDataReadError: error => {
          console.log(error);
        }
      }
    };
 
    // `gridOptions.dataSource.read` could be a various of things:
    /*
      read: string, // url
      read: (context: IDataSourceReadContext) => string // function which returns url
      read: Promise<any[]> // promise which is resolving with an array of data to be displayed 
      read: (context: IDataSourceReadContext) => Promise<any[]> // same as above, but wrapped in the function
      read: any[] // just an array of data
    */
  }
}
