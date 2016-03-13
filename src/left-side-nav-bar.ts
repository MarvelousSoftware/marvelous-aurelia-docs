import {bindable} from 'aurelia-framework';

export class LeftSideNavBar {
  @bindable router = null;

  groupedRoutes = {};
  groups = [];

  bind() {
    for (let route of this.router.navigation) {
      this.addRoute(route);
    }
  }

  addGroup(name) {
    if (this.groups.indexOf(name) !== -1) {
      return;
    }
    this.groups.push(name);
  }

  addRoute(route) {
    if (route.config.group === undefined) {
      return;
    }

    this.addGroup(route.config.group);
    let routes = this.groupedRoutes[route.config.group];

    if (routes === undefined) {
      routes = this.groupedRoutes[route.config.group] = [];
    }

    routes.push(route);
  }
}
