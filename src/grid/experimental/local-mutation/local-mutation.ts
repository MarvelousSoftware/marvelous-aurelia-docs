import data from 'data';
import {Grid} from 'marvelous-aurelia-grid';

export class LocalDataSourceMutation {
  gridOptions;
  grid: Grid;
  input = {
    firstName: undefined,
    lastName: undefined,
    age: undefined
  }

  constructor(http) {
    this.gridOptions = {
      dataSource: {
        read: data.get
      }
    };
  }

  add() {
    this.grid.dataSource.addItem({
      age: this.input.age,
      firstName: this.input.firstName,
      lastName: this.input.lastName
    });
  }

  remove(item) {
    this.grid.dataSource.removeItem(item);
  }
}
