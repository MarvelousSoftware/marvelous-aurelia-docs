import {Schema, Row, TextInput, IValidatorContext} from 'marvelous-aurelia-forms';

export class ValidationCustomInline {
  schema: Schema;
  submitted;

  constructor() {
    let form = {
      firstName: new TextInput({
        label: 'First Name',
        validators: {
          required: true,
          words: {
            // custom, inline validator named words, although the name is not important
            // in case of inline validators.
            
            // most validators does not need to be invoked if field value is empty
            // required is one exception
            // use shouldValidateEmpty to specify if your validator needs to validate even
            // when field is empty
            // shouldValidateEmpty: true
            
            // custom property, accessible in the validator
            // this one specifies that space is allowed in the field's value
            allowedSpecialChars: [' '],
            
            // isValid is a method invoked on each value change
            isValid: (context: IValidatorContext) => {
              // gets sepecial chars using current field's value
              let matches = /(\W)/g.exec(context.value);

              if (!matches || matches.length === 1) {
                // if doesn't contain any special characters then
                // field is valid
                return true;
              }

              for (let i = 1; i < matches.length; i++) {
                if (context.validator['allowedSpecialChars'].indexOf(matches[i]) === -1) {
                  // if contains any special character not listed in allowedSpecialChars custom property
                  // then field is invalid
                  return false;
                }
              }
              
              // otherwise field is valid
              return true;
              
              // NOTE: this method could return a promise, check out Asynchronous validation section
            },
            
            // getError is invoked if isValid returns false
            // this method should return a string or Promise<string>
            getError: () => 'First Name cannot contain any special character.'
          }
        }
      })
    };

    this.schema = new Schema(form);
  }

  submit(context) {
    this.submitted = JSON.stringify(context.model, null, 2);
    if (context.isValid) {
      // .. bussiness logic
    }
  }
}