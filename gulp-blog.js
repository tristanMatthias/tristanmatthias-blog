const Stream = require('stream');
const path   = require('path');
const marked = require('marked');
const mkmeta = require('marked-metadata');
const pug    = require('pug');
const merge  = require('merge');

module.exports = function(options) {
    let stream = new Stream.Transform({objectMode: true});
    let pugTemplate = options.template;
    let pugLocals = options.locals || {};
    let fileData = options.fileData || {};

    stream._transform = (file, unused, callback) => {
        let f = fileData.find((_f) => _f.path === file.path);

        // let contents = file.contents.toString();

        // var md = new mkmeta(file.path);
        // md.defineTokens('<!--', '-->');
        // var meta = md.metadata();
        //
        // meta.title = path.basename(file.path).slice(0,-3).replace();
        //
        // let name = path.basename(file.path).toLowerCase();
        // name = name.replace(/\s+/g, '-');
        // name = name.replace('.md', '.html');
        // file.path = path.join(file.base, name);
        // meta.url = path.join('/articles', name);
        //
        let name = /.*\/articles\/(.*)/.exec(f.meta.url);
        file.path = path.join(file.base, name[1] + '.html');

        let data = merge({
            content: f.contents,
            meta: f.meta
        }, pugLocals)
        console.log("DATA IS", pugLocals);
        let html = pug.renderFile(pugTemplate, data);
        //
        file.contents = new Buffer(html);

        callback(null, file);
    };

    return stream;
}
