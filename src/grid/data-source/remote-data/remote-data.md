`MarvelousAureliaGrid` needs some data feed, either local or remote. In this demo you can see how to bind to remote data.

In case of a remote binding server needs to understand and properly handle the request. While it is possible to handle
it without any external library it is recommended to use `MarvelousSoftware.Grid.DataSource` package for `ASP.NET`
based applications. It does provide an extension method called `ToDataSourceResult` which automatically handles `IQueryable<T>` type.
This method makes sure that only needed data will be downloaded. 
It also provides an easy [integration with query language](#/grid/sample/general-query-language)