import {inject, BindingEngine, Container, useView, bindable, customElement} from 'aurelia-framework'

@inject()
export class ExperimentalCompose {
  models: SampleComponent[] = [];
  models2: SampleComponent[] = [];
  
  constructor(private _bindingEngine: BindingEngine) {
    this.models.push(
      new SampleComponent('foo', '1'),
      new SampleComponent('bar', '2'),
      new SampleComponent('foobar', '3')
    );
    this.models2.push(
      new SampleComponent('foo2', '1'),
      new SampleComponent('bar2', '2'),
      new SampleComponent('foobar2', '3')
    );
  }
  
  change() {
    this.models[0].name = 'changed';
    this.models2[0].name = 'changed';
  }
}

//@useView('./compose/component.html')
//@customElement('sample-component2')
export class SampleComponent {
  private _bindingEngine: BindingEngine;
    
  /*@bindable*/ name: string;
  /*@bindable*/ value: string;
  
  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
    
    this._bindingEngine = Container.instance.get(BindingEngine);
    this._bindingEngine.propertyObserver(this, 'name').subscribe((n)  => {
      console.log('new value:', n);
    });
  }
  
  activate() {
    console.log(this.name, 'MODEL ACTIVATED!');
  }
}


// General idea:
// 1. custom bindable attribute
// 2. defined field would not be custom element
// 3. custom element would be generated automatically by metadata from defined field