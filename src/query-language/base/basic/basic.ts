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
  
  samples = [
    'Country = "United States"', 
    'Country = China and Population < 4500000', 
    'Country = China and (Population < 4500000 or Density < 1400) and TotalArea > 1000',
    'City starts with S',
    'Created < 1/1/2016'];
  
  constructor(http: HttpClient) {
    this.queryLanguageOptions = {
      autoComplete: config.apiUrl('api/query-language/cities/auto-completion'),
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
    return this.http.fetch('query-language/cities')
      .then(response => response.json())
      .then(x => this.tableRows = x.data);
  }

  submit() {
    return this.http.fetch('query-language/cities?query=' + this.queryLanguage.query)
      .then(response => response.json())
      .then(x => { this.tableRows = x.data; return x; });
  }
  
  setQuery(query: string) {
    this.queryLanguage.query = query;
    this.submit();
  }
}
