import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import config from 'config';

// loads the query language
// it registers marvelousQueryLanguage to global scope (pure, old fasion way of components creation)
import 'marvelous-query-language';
import {IQueryLanguageOptions, QueryLanguageFactory, QueryLanguageEditor} from 'marvelous-query-language';

@inject(HttpClient, Element)
export class WithoutAurelia {
  tableRows: any[];
  http: HttpClient;
  queryLanguageEditor: QueryLanguageEditor;
  
  samples = ['FirstName contains abel and (Age > 40 or Age < 30)', 'Rating = NULL'];
  
  constructor(http: HttpClient, private element: Element) {    
    http.configure(httpConfig => {
      httpConfig
        .useStandardConfiguration()
        .withBaseUrl(config.apiUrl('api/'));
    });
    this.http = http;
  }
  
  activate() {
    let mql: QueryLanguageFactory = (<any>window).marvelousQueryLanguage; 
    this.queryLanguageEditor = mql.createEditor({
      element: this.element.querySelector('.people-filter-editor'),
      autoComplete: config.apiUrl('api/mql/predefined-functions/people/auto-completion'),
      inlineButton: true,
      inlineButtonText: 'Apply',
      onSubmit: () => this.submit()
    });
    
    return this.http.fetch('mql/predefined-functions/people')
      .then(response => response.json())
      .then(x => this.tableRows = x.data);
  }
  
  submit() {
    return this.http.fetch('mql/predefined-functions/people?query=' + this.queryLanguageEditor.query)
      .then(response => response.json())
      .then(x => { 
        this.tableRows = x.data;
        
        // TODO: this line is really important, explain why in all examples 
        return x; 
      });
  }
  
  setQuery(query: string) {
    this.queryLanguageEditor.query = query;
    this.submit();
  }
}
