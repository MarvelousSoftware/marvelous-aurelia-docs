export let formsConfig = {
  /**
   * If true then custom elements related to forms will be available globaly.
   * Default: true.
   */
  globalizeResources: true,
  
  /**
   * Default tab index for all fields. Might be overridden per field basis.
   * Default: 1.
   */
  tabIndex: 1,
  
  fields: {
    textInput: {
      templateUrl: 'marvelous-aurelia-forms/forms/templates/text-input.html'
    },
    textArea: {
      templateUrl: 'marvelous-aurelia-forms/forms/templates/text-area.html',
      rows: 2
    },
    checkboxInput: {
      templateUrl: 'marvelous-aurelia-forms/forms/templates/checkbox-input.html'
    },
    numberInput: {
      templateUrl: 'marvelous-aurelia-forms/forms/templates/number-input.html'
    },
    select: {
      templateUrl: 'marvelous-aurelia-forms/forms/templates/select.html'
    }
  }
}