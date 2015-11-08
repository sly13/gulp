"use strict"

var gulp = require('gulp');

/* wiredep */
var wiredep = require('wiredep').stream;

/* css/less variables */
//var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var renameCss = require('gulp-rename');
var less = require('gulp-less');

/* notification */
var notify = require('gulp-notify');

/* livereload */
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');

/* for wiredep */
gulp.task('bower', function () {
    gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: "app/bower_components"
        }))
        .pipe(gulp.dest('./app'));
});


/*livereload for index.html*/
gulp.task('html', function () {
    gulp.src('app/index.html')
        .pipe(connect.reload());
});

/* connect to server */
gulp.task('connect', function () {
    connect.server({
        root: 'app',
        livereload: true
    });
});

/* less task */
gulp.task('less', function () {
    gulp.src('app/styles/less/*.less')
        .pipe(less())
        //.pipe(concatCss("css/bundle.css"))
        .pipe(minifyCss())
        .pipe(renameCss('main.min.css'))
        .pipe(gulp.dest('app/styles/css/'))
        .pipe(connect.reload())
        //.pipe(notify('Done!'))
});

/* watcher for css*/
gulp.task('watch', function () {
    gulp.watch('app/styles/less/*.less', ['less']);
    gulp.watch('bower.json', ['bower'])
    gulp.watch('app/index.html', ['html']);
});

gulp.task('default', ['connect', 'html', 'less', 'watch']);

