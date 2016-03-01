import {inject} from 'aurelia-framework';
import {Grid, GridComponent} from 'marvelous-aurelia-grid';
import {OptionsReader} from 'marvelous-aurelia-core';

@inject(Grid, OptionsReader)
export class RefreshComponent extends GridComponent {    
  constructor(private _grid: Grid, private _optionsReader: OptionsReader) {
    super();
  }  
  
  refresh() {
    this._grid.refresh();
  }
  
  createOptions(): boolean | IOptions {
    // This method is being called by the grid.
    // Most components will follow this pattern:
    // 1. decide whether component is enabled (most of the time basing on defined options)
    // 2. create options to use it further on 
    
    let refresh = this._optionsReader.get('refresh');
    if(refresh.defined === false) {
      // `refresh` is not defined in the options (either code nor dom based)
      // therefore component is not active
      return false;
    }
    
    return {
      // uses `side` attribute from `refresh` node if defined (or `refresh.side` from code based options),
      // otherwise assigns 'left' as default value
      side: refresh.get('side').evaluate() || 'left'
    };
    
    // once options are created they are accessible in the `this.options` property
  }
}

export interface IOptions {
  side: string;
}