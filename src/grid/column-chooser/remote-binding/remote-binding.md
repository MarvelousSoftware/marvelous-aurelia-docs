Too many columns may lead to poor user experience, but some applications (especially LOB) requires a lot of data which needs to be displayed.
To solve this particular issue `MarvelousAureliaGrid` offers `Column Chooser` feature which allows to display only a couple of columns while the rest is
hidden. Once column is needed user may use drag and drop to get the data.

This demo shows how to use `Column Chooser` with remote binding. What is worth to mention is that with `ASP.NET` and `MarvelousSoftware.Grid.DataSource` 
package installed only the part of data which is needed to be displayed on the screen is being downloaded from the server. In case of large number of columns
that may lead to significant performance improvement.

NOTE: in case if user would like to be able to save applied customizations [state persistance](#/grid/sample/general-state-persistence) might be used.