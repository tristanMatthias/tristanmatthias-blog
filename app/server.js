const path = require('path');
const koa = require('koa');
const serve = require('koa-static');
const body = require('koa-body');
const Boom = require('boom');

const signup = require('./routes/signup');

const app = koa();

app.use(body());

// 404
app.use(function*(next) {
    try {
        yield next;
    } catch(e) {
        if (e.isBoom) {
            if (this.is('json')) {
                this.status = e.output.statusCode;
                this.body = e.output.payload;
            } else {
                if (this.status == "404") this.redirect('/404');
            }
        } else {
            console.log(e);
            e.status = 500;
            e.body = {
                status: 500,
                message: "Internal error"
            }
        }
        return;
    }
    if (this.is('json')) {
        if (this.status == "404") {
            let e = new Boom.notFound();
            this.body = e.output.payload;
        }
    } else {
        if (this.status == "404") this.redirect('/404');
        if (this.status == "405") this.redirect('/404');
    }
});


signup(app);



// Serve pages without .html extension
app.use(function*(next) {
    if (this.path.slice(-1) == '/') this.path += "index";
    if (this.path.indexOf('.') == -1) this.path += ".html";
    yield next;
});


app.use(serve('./dist'));

app.listen(process.env.PORT || 3000)
