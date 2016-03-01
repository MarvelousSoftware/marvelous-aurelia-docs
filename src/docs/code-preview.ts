import {customElement, bindable, inject, TaskQueue, Aurelia, Container} from 'aurelia-framework'

let highlight = (<any>window).hljs;

@customElement('code-preview')
@inject(Element, TaskQueue, Aurelia)
export class CodePreview {
  @bindable files: { name: string, text: string, type: string }[] = [];

  constructor(private _element: HTMLElement, private _taskQueue: TaskQueue, private _aurelia: Aurelia) {
  }

  static loadFiles(files: ICodePreviewFileDefinition[]) {
    let aurelia = <Aurelia>Container.instance.get(Aurelia);
    
    // creates list with empty values prefilled in to preserve items order
    let loadedFiles = files.map(x => { return {}; });
    
    let i = 0;
    let finished = 0;
    return new Promise<any[]>((resolve, reject) => {
      files.forEach(file => {
        let fileIndex = i;
        aurelia.loader.loadText(file.src).then((x: string) => {
          let code = highlight.highlight(file.type, x).value;
          
          loadedFiles.splice(fileIndex, 1, {
            name: file.name,
            text: code,
            type: file.type
          });
          
          finished++;
          if (loadedFiles.length == finished) {
            resolve(loadedFiles);
          }
        }, () => {
          finished++;
          console.error('File not loaded: ' + file.src);
          if (loadedFiles.length == finished) {
            resolve(loadedFiles);
          }
        });
        i++;
      });
    });
  }
}

export interface ICodePreviewFileDefinition {
  name: string;
  src?: string;
  type: string;
}