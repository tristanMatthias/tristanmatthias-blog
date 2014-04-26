var mailer = require('nodemailer');
mailer.SMTP = {
    host: 'smtp.gmail.com', 
    port:587,
    use_authentication: true, 
    user: 'hello@tristanmatthias.com', 
    pass: 'Cactus28!'
};

exports.mailer = mailer;