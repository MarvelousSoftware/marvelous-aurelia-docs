import config from 'config';

export class QueryLanguage {
  dataUrl = config.apiUrl('api/cities');
  autoCompleteUrl = config.apiUrl('api/cities/auto-completion');
}
