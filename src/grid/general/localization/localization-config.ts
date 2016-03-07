import {IGridConfig} from 'marvelous-aurelia-grid';
import 'marvelous-aurelia-grid/styles/default.css!';
// ...

export function configure(aurelia) {  
  let config = aurelia.use;
  
  config
    // ...
    .plugin('marvelous-aurelia-grid', (config: IGridConfig) => {
      // registers translations under 'custom' key 
      config.translations['custom'] = {
        'grouping/info': 'Just drop a column here'
      };
    });
  
  aurelia.start().then(a => {
    a.setRoot();
  });
}