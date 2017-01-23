const path = require('path');
const koa = require('koa');
const serve = require('koa-static');


const app = koa();

// 404
app.use(function*(next) {
    yield next;
    if (this.status == "404") this.redirect('/404');
});



// Serve pages without .html extension
app.use(function*(next) {
    if (this.path.slice(-1) == '/') this.path += "index";
    if (this.path.indexOf('.') == -1) this.path += ".html";
    yield next;
});

app.use(serve('./dist'));

app.listen(process.env.PORT || 3000)
