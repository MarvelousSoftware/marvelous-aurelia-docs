import {customElement, bindable, Aurelia, inject} from 'aurelia-framework';

let highlight = (<any>window).hljs;

@customElement('m-code')
@inject(Aurelia)
export class Code {
  @bindable language: string;
  @bindable filePath: string;
  
  content: string;
  
  constructor(private _aurelia: Aurelia) {
  }

  attached() {
    this._aurelia.loader.loadText(this.filePath).then((content: string) => {
      this.content = highlight.highlight(this.language, content).value;
    });
  }
} 