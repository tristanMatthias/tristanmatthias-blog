var mailer = require("../lib/mailer.js").mailer,
    async =  require("async"),
    fs = require("fs");

exports.index = function(config) {
    cachebust = ''
    if (process.env.NODE_ENV !== "production") {
        cachebust = "?b=" + (new Date()).getTime()
    }

    var options = {
        reload:    config.liveReload.enabled,
        optimize:  config.isOptimize != null ? config.isOptimize : false,
        cachebust: cachebust,
        fullscreen: true
    };


    return function(req, res) {
        res.render("index", options);
    };
};


exports.contact = function() {
    return function(req, res) {

        var options = JSON.parse(JSON.stringify(
            (req.method.toLowerCase() === "get") ? req.query : req.body
        ));
        options.html = "";
        console.log(options);

        // Gets all the filenames
        var filepaths = [];
        for (fname in req.files) {
            var file = req.files[fname];
            if (typeof file != "function") {
                filepaths.push(file.path);
            }
        }

        var files = [];
        async.each(filepaths, function(filepath, cb) { 
            fs.readFile(filepath, function(err, data) {
                if (err) console.log(err);

                files.push({filename: filepath.split("/").slice(-1)[0], contents: data});
                cb();
            });
        }, sendMail);

        function sendMail() {
            for (var key in options) {
                var obj = options[key];
                if (typeof obj !== 'function') {
                    // If attatchment
                    if (key.slice(0,2) === "a_") {
                        options.attatchments.push(obj);
                    } else {
                        options.html += "<b>" + key.capFirst() + "</b> <span>" + obj + "</span><br>";
                    }
                }
            }

            if (options.subject) {
                options.subject = "ENQUIRY - " + options.subject;
            } else {
                options.subject = ["ENQUIRY", (req.body.type || null)].join(" - ");
            }
            
            mailer.send_mail(
            {       sender: 'noreply@tristanmatthias.com',
                    to:'tristanmatthias94@gmail.com',
                    subject:options.subject || "ENQUIRY",
                    html:options.html,
                    attachments : files
            },function(err, success){
                res.send((err) ? "bad": "ok");
            });

        }
    }
}


exports.template = function() {
    return function(req, res) {
        console.log("GETTING TEMPLATE");
        res.render(req.params.template, function(err, html) {
            if (err) {
                console.log(err);
                res.render("404", {fullscreen: true});
            } else {
                res.send(html);
            }
        });
    }
}