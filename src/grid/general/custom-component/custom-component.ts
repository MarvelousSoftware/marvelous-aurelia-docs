import {componentPosition, componentLayout, Grid, ComponentRegistration} from 'marvelous-aurelia-grid';
import {RefreshComponent} from './refresh-component';
import config from 'config';

export class CustomComponent {
  config = config;
  gridOptions;
  grid: Grid;
  attached = false;
  refreshButtonSide = 'right';

  constructor() {
    this.gridOptions = {      
      // adds new component at the top of the grid
      components: [new ComponentRegistration({
        name: 'top-refresh', // unique name of the component
        type: RefreshComponent,
        view: 'grid/general/custom-component/refresh-component.html',
        position: componentPosition.top,
        layout: componentLayout.full
      })]
    };
  }

  attachComponent() {
    // adds new component on button click, this time on the bottom of the grid
    this.grid.components.add(new ComponentRegistration({
      name: 'bottom-refresh',
      type: RefreshComponent,
      view: 'grid/general/custom-component/refresh-component.html',
      position: componentPosition.footer,
      layout: componentLayout.full
    }));

    // disallows to add more components
    this.attachComponent = () => { };
  }
}
