var mailer = require("../lib/mailer.js");

exports.index = function(config) {
    cachebust = ''
    if (process.env.NODE_ENV !== "production") {
        cachebust = "?b=" + (new Date()).getTime()
    }

    var options = {
        reload:    config.liveReload.enabled,
        optimize:  config.isOptimize != null ? config.isOptimize : false,
        cachebust: cachebust
    };


    return function(req, res) {
        res.render("index", options);
    };
};


var contact = exports.contact = function() {
    return function(req, res) {

        var options = JSON.parse(JSON.stringify(req.query));
        options.html = "";

        if (req.query.email) {
            options.html += "<b>From: </b>" + req.query.email;
        }
        if (req.query.email) {
            options.html += "<br><b>Message: </b>" + req.query.message;
        }
        if (req.query.subject) {
            options.subject = "ENQUIRY - " + options.subject;
        }

        mailer.send(options, function(err) {
            if (!err) res.send("ok");
            else res.send("error");
        });
    }
}