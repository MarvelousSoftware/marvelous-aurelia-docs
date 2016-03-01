export class StatePersistence {
  grid;
  state;
  
  load() {
    if(!this.state) {
      return;
    }
    
    this.grid.loadState(this.state);
  }
  
  save() {
    this.state = this.grid.saveState();
  }
}