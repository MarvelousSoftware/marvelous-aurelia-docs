`MarvelousAureliaGrid` provides an easy integration with [MarvelousQueryLanguage](#/query-language). The only prerequisite is to have
properly setup `ASP.NET` project with `MarvelousSoftware.Grid.DataSource` and `MarvelousSoftware.Grid.QueryLanguage` packages installed.
Once these libraries are available there should appear `FilterWithQueryLanguage` extension method in the `ToDataSourceResult` configuration. 
It allows to specify `LanguageConfig` which is then used to filter data.

In order to enable query language auto completions there should be also configured an endpoint which will parse provided query.
In this demo it is `api/cities/auto-completion`.