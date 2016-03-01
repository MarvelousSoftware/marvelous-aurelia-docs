Under the hood almost every grid's feature is a component. This approach allows to create loosely coupled pieces 
which are responsible only for their responsibilities. This demo shows how to create a custom component.

Each component has to specify a type (constructor function). What is cool about it is that `@inject` works as you expect
and even better. It allows to inject instances generated on per grid basis, like the `Grid` itself or 
`OptionsReader` (created for each grid instance). All these instances are available in the grid instance, since it is rather
not a good idea to couple a plugin to a full grid implementation while it uses only a small part of grid api. It is also
great for unit testing.

For simple components `Grid` might be good enough to implement what you need, but if you would like to use it in 
some more sophisticated manner then here is a brief description of instances generated on grid basis:

* `OptionsReader` - allows to parse grid options. Uses conventions to handle both DOM based and code based options.
* `ComponentsArray` - holds all components.
* `DataSource` - allows to read the data source. Abstraction for local and remote binding.
* `GridOptions` - holds global options, not suitable for any component. Since underneath almost every feature is a component
then currently it holds only columns.
* `GridInternals` - internal grid api, you rather shouldn't use it. 

Each component also needs to specify a position. It determines where the component is going to be rendered. Here are available options:
* `top`
* `afterColumns`
* `footer`
* `background`

Top 3 are rather straightforward. `background` is a bit tricky though. If `view` is not specified then it just won't be 
rendered anywhere (believe it or not - sorting and column reordering is handled like that). If `view` is declared then it will be
rendered under the grid. It might be useful for rendering elements like popups which needs to be somewhere on the page, but the place is
not relevant (that is how column chooser works).

Layout is optional. By default it is `full`. Other allowed value is `forEachColumn` and it allows to render the component for each
column. That is basically how filter row works.

NOTE: If you are interested in more advanced components then have a look at pagination, column chooser or any other existing component.
You can find it here: TODO: github repo src/grid/components link.