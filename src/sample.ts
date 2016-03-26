import {inject, Aurelia, ViewSlot, customElement, HtmlBehaviorResource, Container, ViewEngine, View, ViewResources} from 'aurelia-framework';
import {metadata} from 'aurelia-metadata';
import {activationStrategy} from 'aurelia-router';
import {Sample as S, Samples} from 'samples';
import {CodePreview} from 'docs/code-preview';
import {Compiler} from 'marvelous-aurelia-core/compiler';
import marked from 'marked';

marked.setOptions({
  highlight: function (code, lang) {
    let highlight = (<any>window).hljs;
    return highlight.highlight(lang, code).value;
  }
});

@inject(Element, Compiler, Aurelia, ViewEngine)
export class Sample {
  sample: S;
  description: string;
  notFound = false;

  files: any[];

  private _viewSlot: ViewSlot;
  private _compiledSample: HTMLElement;  
  
  constructor(private _element: Element, private _compiler: Compiler, private _aurelia: Aurelia, private _viewEngine: ViewEngine) {
  }

  activate(params: { name?: string }, routeConfig) {
    let promises = [];
    this.sample = undefined;
    this.description = undefined;
    
    let content = document.body.querySelector('#page-content-wrapper');
    if(content) {
      content.scrollTop = 0;
    }
    
    let config = routeConfig.navModel.config;
    let module = config.sampleModule;
    if (!module) {
      throw new Error(`Specify 'sampleModule' in the route configuration.`);
    }

    if (params.name) {
      this.sample = Samples.instance.getSample(module, params.name);
    } else {
      this.sample = Samples.instance.getDefaultSample(module);
    }
    
    if(!this.sample) {
      this.notFound = true;
      return;
    }
    
    routeConfig.navModel.title = this.sample.title;
    
    if (this.sample.description) {
      promises.push(this._aurelia.loader.loadText(this.sample.getFilePathWithExtension('md')).then((x: string) => {
        let html = marked(x);
        
        let wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        Array.from(wrapper.querySelectorAll('pre')).forEach(p => p.className = "hljs");
        
        this.description = wrapper.innerHTML;
      }, () => { }));
    }
    
    promises.push(this.loadSampleResource().then(() => {
      this.compileSample();
    }));
    
    promises.push(CodePreview.loadFiles(this.sample.files).then(files => this.files = files));
    
    return Promise.all(promises);
  }

  compileSample() {
    if (this._viewSlot) {
      this._viewSlot.detached();
      this._viewSlot.unbind();
    }

    //var placeholder = <HTMLElement>this._element.querySelector('.sample-placeholder');
    this._compiledSample = document.createElement('div');
    
    var sampleElement = document.createElement(this.sample.id);

    var fragment = document.createDocumentFragment();
    fragment.appendChild(sampleElement);

    this._viewSlot = this._compiler.compile(this._compiledSample, fragment, {});
    let view = (<any>this._viewSlot).children[0];
    let viewModel = view.controllers[0].viewModel;
    if(viewModel.activate) {
      viewModel.activate();
    }
  }

  loadSampleResource(): Promise<ViewResources> {
    return this._viewEngine.importViewResources([this.sample.getModuleId()], [this.sample.id], this._aurelia.resources);
  }

  attached() {
    var placeholder = <HTMLElement>this._element.querySelector('.sample-placeholder');
    placeholder.appendChild(this._compiledSample);
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  detached() {
    if (this._viewSlot) {
      this._viewSlot.detached();
      this._viewSlot.unbind();
    }
  }
}