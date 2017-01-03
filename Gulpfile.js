// General requirements
var path     = require('path');
var merge    = require('merge2');
// Gulp requirements
var gulp     = require('gulp');
var watch    = require('gulp-watch');
var connect  = require('gulp-connect');
var pug      = require('gulp-pug');
var sass     = require('gulp-sass');
var data     = require('gulp-data');
var markdown = require('gulp-markdown');
var blog     = require('./gulp-blog');
var sitemap  = require('gulp-sitemap');


//--------------------------------------------------------------- Main Variables
var dist = './dist';

var paths = {
    views: 'assets/views/pages/**/*.pug',
    sass: 'assets/sass/**/*.scss',
    articles: {
        template: 'assets/views/templates/article.pug',
        files: 'assets/articles/Articles/**/*.md',
    },

    copy: {
        'assets/js/**/*.js': path.resolve(dist, 'js'),
        'assets/images/**/*': path.resolve(dist, 'images')
    }
}


//------------------------------------------------------------------- Main tasks
gulp.task('default', [
    'build',
    'watch',
    'serve'
]);

gulp.task('build', [
    'views',
    'sass',
    'copy',
    'articles',
    'sitemap'
]);

//------------------------------------------------------------------------ Watch
gulp.task('watch', function () {
    gulp.watch('assets/**/*.pug', ['views', 'articles']);
    gulp.watch([paths.sass], ['sass']);

    for (var src in paths.copy) {
        gulp.watch(src, ['copy']);
    }
    for (var src in paths.articles) {
        gulp.watch(paths.articles[src], ['articles']);
    }
});


//------------------------------------------------------------------- Dev server
gulp.task('serve', function() {
    var s = connect.server({
        root: 'dist',
        livereload: true,
        port: 3000
    });
    for (task in paths) {
        if (typeof paths[task] == "string") {
            watch(paths[task]).pipe(connect.reload());
        } else {
            for (__path in paths[task]) {
                watch(__path).pipe(connect.reload());
            }
        }
    }
});


//------------------------------------------------------------------------- Copy
gulp.task('copy', function (cb) {
    var stream = merge();

    for(var src in paths.copy) {
        stream.add(
            gulp.src(src)
                .pipe(gulp.dest(paths.copy[src]))
        );
    }
    return stream;
});


var pugLocals = {
    imgPath: '/images/'
};
//------------------------------------------------------------------------ Views
gulp.task('views', function(cb) {
    return gulp.src(paths.views)
    .pipe(pug({
        locals: pugLocals
    }))
    .pipe(gulp.dest(path.resolve(dist)));
});


//--------------------------------------------------------------------- Articles
gulp.task('articles', function(cb) {
    return gulp.src(paths.articles.files)
    .pipe(blog({
        template: paths.articles.template,
        locals: pugLocals
    }))
    .pipe(gulp.dest(path.resolve(dist, 'articles')));
});


//------------------------------------------------------------------------- Sass
gulp.task('sass', function (cb) {
    return gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest(path.resolve(dist,'css')));
});

//---------------------------------------------------------------------- Sitemap
gulp.task('sitemap', ['views', 'articles'], function () {
    gulp.src(dist + '/**/*.html', {
            read: false
        })
        .pipe(sitemap({
            siteUrl: 'http://www.tristanmatthias.com'
        }))
        .pipe(gulp.dest(dist));
});
