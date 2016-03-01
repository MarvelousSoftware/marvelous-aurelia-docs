import {bindable, bindingMode} from 'aurelia-framework';

export class Debug {
  bindingContext = null;
  json: string;
  interval: number;
  @bindable model;

  constructor() {
  }

  updateJson() {
    if (this.bindingContext === null) {
      this.json = 'null';
    } else if (this.bindingContext === undefined) {
      this.json = 'undefined'
    } else {
      this.json = JSON.stringify(this.bindingContext, null, 2);
    }
  }

  bind(bindingContext) {
    this.bindingContext = this.model;
    this.updateJson();
    this.interval = setInterval(() => this.updateJson(), 150);
  }
  
  modelChanged() {
    this.bindingContext = this.model;
  }
  
  unbind() {
    this.bindingContext = null;
    clearInterval(this.interval);
  }
}