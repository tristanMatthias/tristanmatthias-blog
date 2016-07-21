var fs = require('fs');
var express = require('express');
var publicdir = 'dist';
var app = express();

app.use(function(req, res, next) {
  if (req.path.indexOf('.') === -1) {
    var file = publicdir + req.path + '.html';
    fs.exists(file, function(exists) {
      if (exists)
        req.url += '.html';
      next();
    });
  }
  else
    next();
});
app.use(express.static(publicdir));

// Listen
app.listen(process.env.PORT || 9997);