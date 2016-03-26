Most of the time forms are static, but what if the requirement is to change it while it has been already rendered? 
Fortunately `MarvelousAureliaForms` supports such scenario and all changes to the schema are reflected in the displayed form.
This makes scenarios like getting changes from server-side and rendering it in the browser possible. In this particular
example changes are triggered by checkbox, but form could be changed anywhere and anytime while the application is running.