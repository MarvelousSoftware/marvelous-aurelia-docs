import {LogManager, Aurelia} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';
import config from './config';
import 'marvelous-aurelia-grid/styles/default.css!';
import 'marvelous-aurelia-forms/styles/default.css!';
import 'marvelous-aurelia-query-language/styles/default.css!';

import 'styles/styles.css!';
import 'bootstrap';
import 'font-awesome';
import 'fetch';

import 'forms/forms';
import {Samples} from 'samples';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.info);

export function configure(aurelia: Aurelia) {
  let use = aurelia.use;

  use
    .standardConfiguration()
    .globalResources('docs/debug')
    .globalResources('docs/code')
    .globalResources('docs/code-preview')
    .globalResources('docs/date-format')
    .globalResources('docs/date-time-format')
    .globalResources('docs/yes-no-format')
    .plugin('aurelia-animator-css')
    .plugin('marvelous-aurelia-grid')
    .plugin('marvelous-aurelia-forms')
    .plugin('marvelous-aurelia-query-language');

  if (config.environment.current == 'PRODUCTION') {
    use.plugin('aurelia-google-analytics', config => {
      config.init('UA-74457824-1');
      config.attach({
        logging: {
          enabled: false // Set to `true` to have some log messages appear in the browser console.
        },
        pageTracking: {
          enabled: true // Set to `false` to disable in non-production environments.
        },
        clickTracking: {
          enabled: false // Set to `false` to disable in non-production environments.
        }
      });
    });
  }
  
  aurelia.start().then(a => {
    a.setRoot();
  });
}