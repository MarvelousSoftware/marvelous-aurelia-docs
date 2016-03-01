import {Schema, Row, TextInput} from 'marvelous-aurelia-forms';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export class ValidationAsync {
  schema: Schema;
  submitted;

  constructor(http: HttpClient) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
          mode: 'cors'
        });
    });

    let form = {
      countryCode: new TextInput({
        label: 'Country Code',
        validators: {
          required: true,
          countryCode: {
            // isValid method calls external resource, so it is a good candidate for
            // debounce in order to avoid too much pressure on the server
            debounce: 150,
            isValid: (context) => {
              return new Promise((resolve, reject) => {
                http.fetch(`https://restcountries.eu/rest/v1/alpha/${context.value}`)
                  .catch(x => { resolve(false); return x; })
                  .then(x => { x.json().then(c => { resolve(x.status >= 200 && x.status < 300); }); });
              });
            },
            getError: () => `Are you sure you've typed valid country code? Looks like it doesn't exist.`
          }
        }
      })
    };

    this.schema = new Schema(form);
  }

  submit(context) {
    this.submitted = JSON.stringify(this.schema.getModel(), null, 2);

    if (context.isValid) {
      // .. bussiness logic
    }
  }
}