const path = require('path');
const fs = require('fs');
const marked = require('marked');
const mkmeta = require('marked-metadata');
const jsdom = require('jsdom');

let dir = "./assets/articles/Articles";
let files = fs.readdirSync(dir).filter((f) => f.indexOf('.md') > -1);
let fileData = [];

for(file of files) {
    let fpath = path.resolve(dir, file);
    let contents = fs.readFileSync(fpath, 'utf-8');

    // Metadata definition
    var md = new mkmeta(fpath);
    md.defineTokens('<!--', '-->');
    var meta = md.metadata();

    // Metadata title
    meta.title = file.slice(0,-3);

    // Metadata url
    let name = file.toLowerCase();
    name = name.replace(/\s+/g, '-');
    name = name.replace(/\'+/g, '');
    name = name.replace('.md', '');
    meta.url = '/articles/' + name;

    // File contents
    contents = marked(contents);

    // Get first paragraph for desc
    let window = jsdom.jsdom().defaultView;
    window.document.body.innerHTML = contents;
    let firstP = window.document.body.querySelector('h1 + p + p').innerHTML;
    let split = firstP.split('. ');
    meta.description = split.slice(0,2).join(". ") + '.';

    fileData.push({
        path: fpath,
        meta: meta,
        contents: contents
    });
}

fileData.sort((a, b) => {
    return new Date(a.meta.date) < new Date(b.meta.date);
});


module.exports = fileData;
