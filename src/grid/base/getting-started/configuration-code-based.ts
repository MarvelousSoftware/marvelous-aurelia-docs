import data from 'data';

export class SomePage {
  gridOptions;

  constructor() {
    this.gridOptions = {
      dataSource: { // camel case instead of dash case
        read: data.getRandom(1000)
      },      
      pagination: {
        size: 10,
        all: [5, 10, 20, 40]
      },
      columns: [
        { heading: 'First Name', field: 'firstName' },
        { heading: 'Last Name', field: 'lastName' }
      ]
    };
  }
}
