import {ICodePreviewFileDefinition} from 'docs/code-preview';

export class Samples {  
  static instance = new Samples(); 
  
  modules = new Map<string, SampleModule>();
  getOrCreateModule(name: string) {
    let module = this.modules.get(name);
    if(!module) {
      module = new SampleModule(name);
      this.modules.set(name, module);      
    }
    return module;
  }
  
  getSample(moduleName: string, id: string) {
    let module = this.modules.get(moduleName);
    return module.getSample(id);    
  }
  
  getDefaultSample(moduleName: string) {
    let module = this.modules.get(moduleName);
    if(!module) {
      return;
    }
    
    let firstGroup = module.groups.entries().next().value[1];
    return firstGroup.samples.entries().next().value[1];
  }
  
  createNavigation(moduleName: string, router) {
    let navi = [];
    let module = this.modules.get(moduleName);
    module.groups.forEach(group => {
      group.samples.forEach(sample => {
        navi.push({
          config: {
            title: sample.title,
            name: sample.id,
            group: sample.group.name
          },
          isActive: false,
          href: sample.href,
          title: sample.title,
          labels: sample.labels
        });
      });
    });
    
    router.parent.events.subscribe('router:navigation:complete', (event) => {
      let url: string = '#' + event.instruction.fragment;
      let isAnyActive = false;
      
      for (let navModel of navi) {
        if(navModel.href === url) {
          navModel.isActive = true;
          isAnyActive = true;
          continue;
        }
        navModel.isActive = false;
      }
      
      if(isAnyActive === false) {
        navi[0].isActive = true;
      }
    });
    
    return navi;
  }
}

export class SampleModule {
  groups = new Map<string, SampleGroup>();
  
  constructor(public name: string) {
  }
  
  createGroup(name: string, directory: string) {
    let group = new SampleGroup(name, directory, this);
    this.groups.set(name, group);
    return group;
  }
  
  getSample(id: string) {
    let sample: Sample;
    this.groups.forEach(x => {
      let found = x.samples.get(id);
      if(found) {
        sample = found;
      }
    });
    return sample;
  }
}

export class SampleGroup {
  samples = new Map<string, Sample>();
  
  constructor(public name:string, public directory: string, public module: SampleModule) {  
  }
  
  addSimple(title: string, name: string) {
    this.add({ name, title });
    return this;
  }
  
  add(sample: ISample, addDefaultFiles = true) {
    let definition = <ISampleDefinition>sample;
    definition.group = this;
    
    if(addDefaultFiles) {
      let oldFiles = definition.files || [];
      definition.files = [];
      definition.files.push({
        name: `${definition.name}.ts`,
        type: 'typescript' 
      });
      definition.files.push({
        name: `${definition.name}.html`,
        type: 'html' 
      });
      oldFiles.forEach(x => definition.files.push(x));
    }
    
    let instance = new Sample(definition);
    
    this.samples.set(instance.id || instance.href, instance);
    return this;
  }
}

export class Sample {
  name: string;
  title: string;
  pageTitle: string;
  href: string;
  files: ICodePreviewFileDefinition[];
  description: boolean;
  group: SampleGroup;
  labels: string[];
  
  get id() {
    return this.group.directory + '-' + this.name;
  }
  
  constructor(sample: ISampleDefinition) {
    if(!sample.title || (!sample.name && !sample.href)) {
      throw new Error('Something is missing.');
    }
    
    if(!sample.name) {
      sample.description = sample.description === undefined ? false : sample.description;
    }
    
    this.name = sample.name;
    this.title = sample.title;
    this.files = sample.files || [];
    this.description = sample.description === undefined ? true : sample.description;
    this.group = sample.group;
    
    this.pageTitle = sample.pageTitle || sample.title;
    this.href = sample.href || `#/${sample.group.module.name}/sample/${this.id}`;
    this.labels = sample.labels || [];
    
    this.files.forEach(x => {
      if(!x.src) {
        x.src = this.getFilePathWithName(x.name);
      }        
    });
  }
  
  getFilePathWithExtension(extension: string) {
    return `${this.group.module.name}/${this.group.directory}/${this.name}/${this.name}.${extension}`
  }
  
  getModuleId() {
    return `${this.group.module.name}/${this.group.directory}/${this.name}/${this.name}`
  }
  
  getFilePathWithName(fileName: string) {
    return `${this.group.module.name}/${this.group.directory}/${this.name}/${fileName}`
  }
}

export interface ISampleDefinition extends ISample {
  group: SampleGroup;
}

export interface ISample {
  title: string;
  pageTitle?: string;
  name?: string;
  href?: string;
  files?: ICodePreviewFileDefinition[];
  description?: boolean;
  labels?: string[];
}