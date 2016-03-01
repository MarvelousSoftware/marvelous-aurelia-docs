import {inject} from 'aurelia-framework';

let highlight = (<any>window).hljs;

@inject(Element)
export class GridGettingStarted {
  constructor(private _element: HTMLElement) {

  }

  attached() {
    Array.from(this._element.querySelectorAll('pre.highlight')).forEach(element => {
      highlight.highlightBlock(element);
    });
  }
}