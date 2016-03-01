import {Schema, Row, TextInput, TextArea, CheckboxInput, NumberInput, Select, fieldVisibility} from 'marvelous-aurelia-forms';

export class ValidationPredefined {
  schema: Schema;
  submitted;
  valid = true;
  validations;

  constructor() {
    let form = {
      firstName: new TextInput({
        label: 'First Name',
        validators: {
          required: true,
          length: {
            min: 3,
            max: 40
          }
        }
      }),
      lastName: new TextInput({
        label: 'Last Name',
        validators: {
          required: true,
          length: {
            min: 3,
            max: 40
          }
        }
      }),
      age: new NumberInput({
        label: 'Age',
        validators: {
          required: true
        }
      }),
      country: new Select({
        label: 'Country',
        items: ['France', 'Germany', 'Poland'],
        validators: {
          required: true
        }
      }),
      email: new TextInput({
        label: 'Email',
        validators: {
          email: true
        }
      }),
      site: new TextInput({
        label: 'Web Site',
        validators: {
          url: true
        }
      }),
      phone: new TextInput({
        label: 'Phone',
        validators: {
          phone: true
        }
      }),
      promoCode: new TextInput({
        label: 'Promo Code',
        validators: {
          pattern: {
            value: /^.{3}-.{3}-.{3}$/,
            getError: () => 'Invalid value. Promo code format: xxx-xxx-xxx.'
          }
        }
      }),
      notes: new TextArea({
        label: 'Notes',
        span: 2, // full row
        validators: {
          required: true
        }
      }),
      tsAndCs: new CheckboxInput({
        label: 'Accept terms and conditions',
        span: 2, // full row
        validators: {
          required: true
        }
      })
    };

    this.schema = new Schema(form, 2);
  }

  submit(context) {
    this.submitted = JSON.stringify(context.model, null, 2);
    this.valid = context.isValid;
    this.validations = context.validations;

    if (context.isValid) {
      // .. bussiness logic
    }
  }
}