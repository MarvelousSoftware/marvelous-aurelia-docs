For some systems it is crucial to have customization saving implemented, so that user may save changes and restore it at some
time in the future.

This demo shows how to persist state in the memory, but it could be persisted in the database if needed. `MarvelousAureliaGrid` exposes
`saveState` method which returns a serialized state of the grid so that it could be loaded with `loadState` when needed. 

Note: Be aware that it is preferable to use `explicit-id` on the column definition when state persistence is in use. It makes sure that
any further version of an application won't change the column id. If `explicit-id` is not provided it is computed automatically from
`field`, `heading` and `column template`. These 3 values may change while the application is evolving and therefore it could break 
backward compatibility.