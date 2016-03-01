import {Schema, Row} from 'marvelous-aurelia-forms';
import {Volume} from './volume';

export class DynamicCustomControl {
  schema: Schema;
  submitted;
  
  constructor() {
    this.schema = new Schema([
      new Volume({
        name: 'volume',
        label: 'Volume'
      })
    ]);
  }
  
  submit(context) {
    this.submitted = JSON.stringify(context.model, null, 2);
    if(context.isValid) {
      // .. bussiness logic
    }
  }
}