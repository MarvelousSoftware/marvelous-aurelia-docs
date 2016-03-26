Too many columns may lead to poor user experience, but some applications (especially LOB) requires a lot of data which needs to be displayed.
To solve this particular issue `MarvelousAureliaGrid` offers `Column Chooser` feature which allows to display only a couple of columns while the rest is
hidden. Once column is needed user may use drag and drop to get the data.

This demo shows how to use `Column Chooser` with local binding.

NOTE: a common scenario is to let user save customized view. [State persistance](#/grid/sample/general-state-persistence) could be used for that.