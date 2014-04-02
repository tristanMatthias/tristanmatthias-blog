require("./index");
var mail = require("nodemailer");

exports.send = function(options, done) {
    var trans = mail.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "tristanmatthias94@gmail.com",
            pass: "aalss;dd'2"
        }
    });

    var defaults = {
        to: "tristanmatthias94@gmail.com",
        from: "noreply@tristanmatthias.com",
        subject: "New message from tristanmatthias.com",
        html: ""
    }

    console.log(options);

    trans.sendMail(defaults.extend(options), function(err, response){
        // shut down the connection pool
        trans.close(); 

        if (err) console.log(err);
        done(err, response);
    });
}