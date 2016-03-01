import {Schema, TextInput} from 'marvelous-aurelia-forms';

export class DynamicCustomTemplates {
  schema: Schema;
  submitted;

  constructor() {
    this.schema = new Schema([
      new TextInput({
        name: 'firstName',
        label: 'First Name',
        templateUrl: 'forms/model-based/custom-templates/text-field-custom-template.html'
      }),
      new TextInput({
        name: 'lastName',
        label: 'Last Name',
        templateUrl: 'forms/model-based/custom-templates/text-field-custom-template.html'
      })
    ]);
  }

  submit() {
    this.submitted = JSON.stringify(this.schema.getModel(), null, 2);
  }
}