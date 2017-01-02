const Stream = require('stream');
const path   = require('path');
const marked = require('marked');
const pug    = require('pug');
const merge  = require('merge');

module.exports = function(options) {
    let stream = new Stream.Transform({objectMode: true});
    let pugTemplate = options.template;
    let pugLocals = options.locals || {};

    stream._transform = (file, unused, callback) => {

        let name = path.basename(file.path).toLowerCase();
        name = name.replace(/\s+/g, '-');
        name = name.replace('.md', '.html');
        file.path = path.join(file.base, name);


        let contents = file.contents.toString();
        contents = marked(contents);
        let html = pug.renderFile(pugTemplate, merge({
            content: contents
        }, pugLocals));

        file.contents = new Buffer(html);


        callback(null, file);
    };

    return stream;
}