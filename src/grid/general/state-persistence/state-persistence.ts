import {Grid} from 'marvelous-aurelia-grid';
import config from 'config';

export class StatePersistence {
  grid: Grid;
  state: any;
  config = config;

  load() {
    if (!this.state) {
      return;
    }

    this.grid.loadState(this.state);
  }

  save() {
    this.state = this.grid.saveState();
  }
}