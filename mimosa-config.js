exports.config = {
  "modules": [
    "copy",
    "server",
    "jshint",
    "csslint",
    "require",
    "minify-js",
    "minify-css",
    "live-reload",
    "bower",
    "sass",
    "html-templates"
  ],
  "server": {
    "views": {
      "compileWith": "html",
      "extension": "html"
    }
  }
}