MarvelousAureliaGrid provides a basic ajax reader, but currently it has some limitation. For instance it sends only GET requests.
For more advanced reads a third party library is needed. This demo shows how to use `HttpClient`, but it could be any other
library. The only prerequisite is that `read` method needs to return a promise with data from server-side.