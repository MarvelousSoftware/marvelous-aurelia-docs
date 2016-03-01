export class Experimental {
  routes = [];
  router;
  pageTitle = '';

  configureRouter(config, router){    
    this
      .addRoute('Compose', 'compose');

    this.routes[0].route.push('');
    config.map(this.routes);

    router.parent.events.subscribe('router:navigation:complete', () => {
      var activeRoutes = router.navigation.filter(x => x.isActive);
      if(activeRoutes.length) {
        this.pageTitle = activeRoutes[0].title;
      }
    });

    this.router = router;
  }

  addRoute(pageTitle, name) {
    this.routes.push({ route: [name], name: name, moduleId: `./${name}/${name}`, nav: true, title: pageTitle, group: 'Experimental' });
    return this;
  }

}
