var path = require('path');
var gulp = require('gulp');
var compass = require('gulp-compass');
var jade = require('gulp-jade');
var connect = require('gulp-connect');

var dist = 'dist';

var paths = {
    jade: ['assets/views/pages/**/*.jade'],
    js: 'assets/js/**/*.js',
    sass: 'assets/sass/**/*.scss',
    images: 'assets/images/**/*',
}

var constants = {
    API_HOST: (process.env.NODE_ENV == "production") ? "http://lifebalance-api.herokuapp.com/" : "http://localhost:8001/",
    API_URL: (process.env.NODE_ENV == "production") ? "http://lifebalance-api.herokuapp.com/api/v1/" : "http://localhost:8001/api/v1/"
}


gulp.task('webserver-dev', function() {
    connect.server({
        root: "dist",
        livereload: true,
        port: 9997
    });
});


gulp.task('js', function() {
    var stream = gulp.src(paths.js)
    .pipe(connect.reload())
    .pipe(gulp.dest(dist+"/js"));
    return stream;
});

gulp.task('compass', function() {
    gulp.src(paths.sass)
    .pipe(compass({
        project: path.join(__dirname, 'assets'),
        css: path.resolve(__dirname,dist, 'css'),
        image: "/images/",
        sass: 'sass'
    }))
    .pipe(connect.reload())
    .pipe(gulp.dest(dist+'/css'));
});

gulp.task('jade', function() {
    gulp.src(paths.jade)
        .pipe(jade({locals:{
            cssPath: "/css/",
            jsPath: "/js/",
            imgPath: "/images/",
            wwwRoot: (process.env.NODE_ENV == "production") ? "http://tristanmatthias.com" : "http://dev:9998",
        }}))
        .pipe(connect.reload())
        .pipe(gulp.dest(dist));
})

gulp.task('images', function() {
    var stream = gulp.src(paths.images)
        .pipe(connect.reload())
        .pipe(gulp.dest(dist+'/images'));
});


gulp.task('watch', function () {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.sass, ['compass']);
    gulp.watch("assets/**/*.jade", ['jade']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('build', ['jade', 'js', 'compass', 'images']);
gulp.task('default', ['build', 'watch', 'webserver-dev']);

