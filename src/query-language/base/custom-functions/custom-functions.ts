import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {IQueryLanguageOptions, QueryLanguage} from 'marvelous-aurelia-query-language';
import config from 'config';

@inject(HttpClient)
export class Basic {
  tableRows: any[];
  http: HttpClient;
  queryLanguage: QueryLanguage;
  queryLanguageOptions: IQueryLanguageOptions;
  
  samples = ['UserName = currentUser()', 'UserName != currentUser() and Age > 20 and Age < 30'];
  
  constructor(http: HttpClient) {
    this.queryLanguageOptions = {
      autoComplete: config.apiUrl('api/mql/functions/people/auto-completion'),
      inlineButton: true,
      inlineButtonText: 'Apply',
      onSubmit: () => this.submit()
    };

    http.configure(httpConfig => {
      httpConfig
        .useStandardConfiguration()
        .withBaseUrl(config.apiUrl('api/'));
    });

    this.http = http;
  }
  
  activate() {
    return this.http.fetch('mql/functions/people')
      .then(response => response.json())
      .then(x => this.tableRows = x.data);
  }
  
  submit() {
    return this.http.fetch('mql/functions/people?query=' + this.queryLanguage.query)
      .then(response => response.json())
      .then(x => { this.tableRows = x.data; return x; });
  }
  
  setQuery(query: string) {
    this.queryLanguage.query = query;
    this.submit();
  }
}
