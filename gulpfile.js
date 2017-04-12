'user strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    jsonminify = require('gulp-jsonminify'),
    htmlmin = require('gulp-htmlmin'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    replace = require('gulp-replace'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    filter = require('gulp-filter');

var htmlSrc = ['app/**/*.html', '!app/index.html', '!app/lib/**/*.html', '!app/lib/*.html'];
var jsSrc = ['app/**/*.js', '!app/lib/**/*.js', '!app/assets/**/*.js'];
var cssSrc = ['app/assets/**/*.css', '!app/lib/**/*.css'];

var imgSrc = ['app/assets/img/*', 'app/assets/img/**/*'];

var fontSrc = ['app/assets/fonts/**/*'];

var jsonSrc = ['app/translate/*.json', 'app/translate/**/*.json'];

var libSrc = ['app/lib/**/*'];

var indexSrc = 'app/index.html';
var faviconSrc = 'app/favicon.ico';

var debugPath = 'app/';
var buildPath = 'dist/';

gulp.task('moveFavicon', function() {
    return gulp.src(faviconSrc)
    .pipe(gulp.dest(buildPath));
});

gulp.task('createIndex', ['moveFavicon'], function() {
    return gulp.src(indexSrc)
    .pipe(replace(/\.js/g, '.min.js'))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(buildPath))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compressHTML', function() {
    return gulp.src(htmlSrc)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(buildPath))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compressJS', function() {
    var filterIndex = filter(['**/app.config.js', '**/app.module.js', '**/app.route.oclazy.js'], {restore: true});
    return gulp.src(jsSrc)
    .on('error', function(err) {//语法检查，打印错误
        console.log('Error: ', err.message);
    })
    .pipe(filterIndex)
    .pipe(rename({suffix: '.min'}))
    .pipe(filterIndex.restore)
    .pipe(uglify())//压缩
    .pipe(gulp.dest(buildPath))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compressCSS', function() {
    return gulp.src(cssSrc)
    //.pipe(concat('index.min.css')) 为了使用oclazyload不整合
    .pipe(minifycss())
    .pipe(gulp.dest(buildPath + 'assets'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('compressJSON', function () {
    return gulp.src(jsonSrc)
        .pipe(jsonminify())
        .pipe(gulp.dest(buildPath + 'translate'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('copyImg', function() {
    return gulp.src(imgSrc)
    .pipe(gulp.dest(buildPath + 'assets/img'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('copyLib', function() {
    return gulp.src(libSrc)
    .pipe(gulp.dest(buildPath + 'lib'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('copyFont', function() {
    return gulp.src(fontSrc)
    .pipe(gulp.dest(buildPath + 'assets/fonts'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('clean', function() {
    return gulp.src(buildPath)
    .pipe(clean());
});

gulp.task('startCreate', ['clean'], function() {
    runSequence('createIndex', 
    ['compressHTML', 'compressJS', 'compressCSS', 'compressJSON'],
    ['copyLib', 'copyImg', 'copyFont']);
});

gulp.task('browserSync', function() {
    gulp.start('startCreate');

    browserSync.init({
        server: {
            baseDir: debugPath
        }
    });

    gulp.watch(indexSrc, ['createIndex']).on("change", browserSync.reload);
    gulp.watch(htmlSrc, ['compressHTML']).on("change", browserSync.reload);
    gulp.watch(jsSrc, ['compressJS']).on("change", browserSync.reload);
    gulp.watch(cssSrc, ['compressCSS']).on("change", browserSync.reload);
    gulp.watch(jsonSrc, ['compressJSON']);
});

gulp.task('default', ['browserSync']);