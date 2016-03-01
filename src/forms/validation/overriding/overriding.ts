import {Schema, Row, TextInput, validators} from 'marvelous-aurelia-forms';

// overrides an 'url' validator making https prefix required
// it could be used anywhere, overriding is global
validators.override({
  name: 'url',
  isValid: context => {
    // inspired by: http://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149
    var regex = /^((https:)\/\/)([\da-z\.-]+)\.([a-z\.]{2,})([\/\w \.-]*)*\/?$/
    return regex.test(context.field.value);
  },
  getError: () => 'Value is not an url or "https://" prefix is missing.'
});

export class ValidationOverriding {
  schema: Schema;
  submitted;
  
  constructor() {
    let form = {
      webSite: new TextInput({
        label: 'Web Site',
        validators: {
          required: true,
          url: true
        }
      })
    }
    
    this.schema = new Schema(form);
  }
  
  submit(context) {
    this.submitted = JSON.stringify(context.model, null, 2);
    if(context.isValid) {
      // .. bussiness logic
    }
  }
}