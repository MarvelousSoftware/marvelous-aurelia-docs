export class Component {
  name: string;
  value: string;
  
  activate(param) {
    this.name = param.name;
    this.value = param.value;
  }
}