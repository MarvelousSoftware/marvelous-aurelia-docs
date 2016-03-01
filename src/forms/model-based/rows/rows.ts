import {Schema, Row, TextInput, TextArea, CheckboxInput, NumberInput, Select, fieldVisibility} from 'marvelous-aurelia-forms';

export class DynamicRows {
  schema: Schema;
  submitted;
  
  formModel: { firstName?: string, lastName?: string, age?: number, amount?: number, 
    country?: string, type?: { id: number, name: string }, comment?: string,
    tsAndCs?: boolean } = {};

  constructor() {    
    let types = {
      'pl': [
        { id: 0, name: 'A' },
        { id: 1, name: 'B' },
        { id: 2, name: 'C' }
      ],
      'de': [
        { id: 0, name: 'A' }
      ],
      'fr': [
        { id: 0, name: 'A' },
        { id: 2, name: 'C' }
      ]
    }
    
    let form = {
      firstName: new TextInput({ label: 'First Name', row: 'basic' }),
      lastName: new TextInput({ label: 'Last Name', row: 'basic' }),
      age: new NumberInput({ label: 'Age', type: 'integer', row: 'basic' }),
      amount: new NumberInput({ label: 'Amount', type: 'decimal', row: 'basic' }),
      country: new Select({
        label: 'Country', 
        row: 'basic',
        onChange: (field: Select) => {
          let typeField = <Select>this.schema.fields['type'];

          if (!field.value) {
            typeField.visibility = fieldVisibility.disabled;
            typeField.items = [];
            typeField.value = undefined;
            return;
          }

          typeField.items = types[field.value];
          typeField.visibility = fieldVisibility.enabled;
        },
        defaultText: '--- select country ---',
        getValue: (item) => item.value,
        getText: (item) => item.text,
        items: [
          { text: 'Poland', value: 'pl' },
          { text: 'Germany', value: 'de' },
          { text: 'France', value: 'fr' }
        ]
      }),
      type: new Select({
        label: 'Type', 
        row: 'basic',
        visibility: fieldVisibility.disabled,
        defaultText: '--- select type ---',
        getText: (item) => item.name
      }),
      comment: new TextArea({
        label: 'Comment',
        row: 'additional',
        rows: 4
      }),
      tsAndCs: new CheckboxInput({
        label: 'Terms and conditions',
        row: 'additional'
      })
    }
    
    let rows = {
      basic: new Row({name: 'basic', columns: 2}),
      additional: new Row({name: 'additional'})
    };
    
    this.schema = new Schema(form, [rows.basic, rows.additional]);
  }

  submit() {
    this.submitted = JSON.stringify(this.formModel, null, 2);
  }
}