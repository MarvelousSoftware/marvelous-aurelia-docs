import {customField, Field} from 'marvelous-aurelia-forms';
import {bindable, customElement} from 'aurelia-framework';

@customField('volume')
export class Volume extends Field {
  @bindable() label: string;
  
  _isDown = false;
  _unregister: ()=>void;
  
  constructor(field) {
    super(field);
    
    // sets default value for the templateUrl
    // might be changed by binded property or templateUrl in the field param
    this.defaultFor(x => this.templateUrl, () => 'forms/model-based/custom-control/volume.html');
    
    // sets default value to 0
    this.defaultFor(x => this.value, () => 0);
  }
  
  attached() {    
    // registers for up event
    let up = () => this.up();
    document.addEventListener('mouseup', up);
    this._unregister = () => document.removeEventListener('mouseup', up);
  }
  
  detached() {
    // disposes event listener to avoid memory leak
    this._unregister();
  }
  
  down(event: MouseEvent) {
    this._isDown = true;
    this._setNewValue(event);
  }
  
  moved(event: MouseEvent) {
    if(this._isDown === false) {
      return;
    }
    
    this._setNewValue(event);
  }
  
  up() {
    this._isDown = false;
  }
  
  createInternalValue() {
    // There are controls with need of separate values
    // for view (internal) and publicly available, e.g. NumberInput, which needs to hold
    // value as number, but the view has to display stringified version.
    
    // This method might be invoked if value needs to be converted
    // to internalValue (the one used on the view model).
    // Default implementation casts value to string and since 
    // volume control holds internalValue as number
    // then it needs to return pure value instead of stringified version.
    
    return this.value;
  }
  
  private _setNewValue(event: MouseEvent) {
    // sets new value using cursor position (relative to srcElement) and width of volume bar 
    let width = this.element.querySelector('.volume-bar').clientWidth;
    this.internalValue = parseInt((event.offsetX / width * 100).toFixed(0));
    
    // control implementation should invoke onChange in case of any internalValue change
    this.onChanged();
  }
}