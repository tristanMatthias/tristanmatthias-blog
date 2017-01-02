const path = require('path');
const koa = require('koa');
const serve = require('koa-static');


const app = koa();

// Serve pages without .html extension
app.use(function*(next) {
    if (this.path.indexOf('.') == -1) this.path += ".html";
    yield next;
});

app.use(serve('./dist'));

app.listen(process.env.PORT || 3000)
