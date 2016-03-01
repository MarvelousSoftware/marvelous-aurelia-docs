import data from '../../data';

export class RuntimeComponentAvailability {
  gridOptions;
  grid;
  
  constructor(http) {
    this.gridOptions = {
      dataSource: {
        read: data.get
      }
    };
  }
  
  enable(component) {
    component.enable();
  }
  
  disable(component) {
    component.disable();
  }
}
