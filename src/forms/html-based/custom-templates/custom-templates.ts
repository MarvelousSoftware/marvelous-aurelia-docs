export class BasicCustomTemplates {
  model;
  submittedForm;
  
  constructor() {
    this.model = {
    }    
  }
  
  submit() {
    this.submittedForm = JSON.stringify(this.model);
  }
}