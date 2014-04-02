exports.config = {
  "modules": ["copy", "server", "require", "minify", "live-reload", "bower", "sass", 'web-package', "handlebars"],
  "server": {
    "path": "server.js",
    "views": {
      "compileWith": "html",
      "extension": "html"
    }
  }
}