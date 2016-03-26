`MarvelousAureliaForms` allows to provide custom configuration. There are multiple ways to do this and this demo shows only one of them. 
Don't worry though, all options are covered in this article.

First let's see how configuration looks in the first place.

```typescript
export interface FormsConfig {
  /**
   * Default tab index for all fields. Might be overridden per field basis.
   * Default: 1.
   */
  tabIndex?: number;
  
  validation?: {
    /**
     * Called on field blur. If returns true then validation will be triggered automatically.
     */
    shouldValidateOnBlur?: (field: Field) => boolean
  };
  
  // .. bunch of other configuration settings
  // to see all of them take a look at source code:
  // https://github.com/MarvelousSoftware/marvelous-aurelia-forms/blob/master/src/forms/config.ts
};
```

Now let's change something. First place where configuration might be changed is plugin registration. These changes are global and thus will be applied to all forms.

```typescript
import 'marvelous-aurelia-forms/styles/default.css!';
// ...

export function configure(aurelia) {  
  let config = aurelia.use;
  
  config
    // ...
    .plugin('marvelous-aurelia-forms', (config) => {
      config.tabIndex = 0;
    });
  
  aurelia.start().then(a => {
    a.setRoot();
  });
}
```

Changing configuration for whole application sometimes is not prefereable. That's why configuration could be applied also to schemas or even fields directly.
The first scenario is presented in this demo. The crucial part is below.

```typescript
let form = {
  // ...
}
this.schema = new Schema(form);
this.schema.config = {
  validation: { 
    shouldValidateOnBlur: () => true
  }
}
```

In the HTML based approach configuration could be applied directly to a field.

```typescript
this.formsConfig = {
  validation: {
    shouldValidateOnBlur: () => true
  }
}
```
```html
<form submit.trigger="submit()">
  <m-text-input label="First Name" value.bind="model.firstName" config="formsConfig"></m-text-input>
  <m-text-input label="Last Name" value.bind="model.lastName" config="formsConfig"></m-text-input>
  <m-text-input label="Full Name" value.bind="model.fullName" config="formsConfig"></m-text-input>
</form>
```