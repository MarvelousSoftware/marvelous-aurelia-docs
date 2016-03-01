import {ObserverLocator, inject} from 'aurelia-framework';
import {fieldVisibility} from 'marvelous-aurelia-forms';

@inject(ObserverLocator)
export class BasicAllControls {
  model;
  visibility;
  submittedForm;
  countries;

  constructor(observer: ObserverLocator) {
    this.model = {
      firstName: '',
      lastName: ''
    }

    this.countries = [
      { name: 'Poland', id: 'pl' },
      { name: 'Germany', id: 'de' },
      { name: 'France', id: 'fr' }
    ];

    this.visibility = {
      lastName: fieldVisibility.disabled,
      fullName: fieldVisibility.readOnly
    }

    observer.getObserver(this.model, 'firstName').subscribe(() => {
      if (this.model.firstName) {
        this.visibility.lastName = fieldVisibility.enabled;
      } else {
        this.visibility.lastName = fieldVisibility.disabled;
      }
      this.updateFullName();
    });

    observer.getObserver(this.model, 'lastName').subscribe(() => {
      this.updateFullName();
    });
  }
  
  updateFullName() {
    if (!this.model.firstName && !this.model.lastName) {
      this.model.fullName = '';
      return;
    }
    this.model.fullName = `${this.model.firstName} ${this.model.lastName}`;
  }

  submit() {
    this.submittedForm = JSON.stringify(this.model);
  }
}