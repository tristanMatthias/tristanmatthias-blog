const Router = require('koa-router');
const Boom = require('boom');
const request = require('co-request');


const url = 'https://us15.api.mailchimp.com/3.0/lists/82f40deb39/';
const apiKey = 'aa5ef81bedb3aed3036666bece5ab846';


module.exports = function(app) {
    let router = new Router();

    router.post('/api/v1/signup/', function *(next) {
        if (!this.request.body) throw new Boom.badRequest('No data supplied')
        if (!this.request.body.email) throw new Boom.badRequest('No email supplied')
        let emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (! emailCheck.test(this.request.body.email)) throw new Boom.badRequest('Email is invalid');

        let result = yield request.post(url, {
            auth: {
                user: 'tristan',
                pass: apiKey
            },
            json: true,
            body: {
                members: [{
            		email_address: this.request.body.email,
            		status: "subscribed"
            	}]
            }
        });

        let data = result.body;
        if (!data.new_members.length) {
            let e = data.errors[0].error;
            if (e.includes('is already a list member')) {
                throw new Boom.badRequest('Email is already in use');
            } else {
                console.log(e);
                throw new Boom.badRequest('Error subscribing email');
            }
        } else {
            this.status = 201;
            this.body = {
                message: "Email subscribed"
            }
        }
    });
    app
      .use(router.routes())
      .use(router.allowedMethods());
}
