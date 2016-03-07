import {Grid} from 'marvelous-aurelia-grid';
import config from 'config';

export class Translations {
  config = config;
  languages = ['en-US', 'pl-PL', 'custom']
  selectedLanguage: string;
  
  selectedLanguageChanged() {
    Grid.changeLanguage(this.selectedLanguage);
  }
}
