import data from 'data';

export class SomePage {
  gridOptions;

  constructor() {
    this.gridOptions = {
      dataSource: {
        read: data.getRandom(1000)
      },      
      pagination: {
        size: 10,
        all: [5, 10, 20, 40]
      }
    };
  }
}
