import 'marvelous-aurelia-forms/styles/default.css!';
// ...

export function configure(aurelia) {  
  let config = aurelia.use;
  
  config
    // ...
    .plugin('marvelous-aurelia-forms', (config) => {
      config.tabIndex = 0;
    });
  
  aurelia.start().then(a => {
    a.setRoot();
  });
}