import {Schema, Row, TextInput, TextArea, CheckboxInput, NumberInput, Select, fieldVisibility} from 'marvelous-aurelia-forms';

export class DynamicRuntimeChanges {
  schema: Schema;
  submitted;
  formModel: any = {};

  types = {
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

  constructor() {
    this.schema = new Schema([
      new Row({
        name: 'base',
        columns: 3,
        fields: [
          new TextInput({
            name: 'fullName',
            label: 'Full Name',
            span: 2
          }), 
          new NumberInput({
            name: 'age',
            label: 'Age',
            type: 'integer'
          }), 
          new CheckboxInput({
            name: 'additionalInfo',
            span: 3,
            label: 'Provide additional information',
            onChange: (field: CheckboxInput) => {
              if (field.value) {
                this.addAdditionalRow();
                this.addCommentField();
                return;
              }

              this.schema.removeRow('additional');
              this.schema.rows['base'].removeField('comment');
            }
          })
        ]
      })
    ]);
  }

  addAdditionalRow() {
    this.schema.addRow(new Row({
      name: 'additional',
      columns: 2,
      fields: [
        new Select({
          name: 'country',
          label: 'Country',
          onChange: (field: Select) => {
            let typeField = <Select>this.schema.fields['type'];

            if (!field.value) {
              typeField.visibility = fieldVisibility.disabled;
              typeField.value = undefined;
              return;
            }

            typeField.items = this.types[field.value];
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
        new Select({
          name: 'type',
          label: 'Type',
          visibility: fieldVisibility.disabled,
          defaultText: '--- select type ---',
          getText: (item) => item.name
        })
      ]
    }));
  }

  addCommentField() {
    this.schema.rows['base'].addFieldAt(new TextArea({
      name: 'comment',
      label: 'Comment',
      rows: 4,
      span: 3
    }), 2);
  }

  submit() {
    this.submitted = JSON.stringify(this.formModel, null, 2);
  }
}