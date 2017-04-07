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
    browserSync = require('browser-sync');

var htmlSrc = ['app/**/*.html', '!app/lib/**/*.html', '!app/lib/*.html'];
var jsSrc = ['app/**/*.js', '!app/lib/**/*.js', '!app/assets/**/*.js'];
var cssSrc = ['app/assets/**/*.css', '!app/lib/**/*.css'];

var imgSrc = ['app/assets/img/*', 'app/assets/img/**/*'];

var jsonSrc = ['app/translate/*.json', 'app/translate/**/*.json'];

var libSrc = ['app/lib/**/*'];

var indexSrc = 'app/index.html';

var buildPath = 'dist';

gulp.task('createIndex', function() {
    gulp.src('app/app.module.js')
    .pipe(rename('app/app.module.min.js'))
    .pipe(gulp.dest(buildPath));
    gulp.src('app/app.config.js')
    .pipe(rename('app/app.config.min.js'))
    .pipe(gulp.dest(buildPath));
    gulp.src('app/app.route.oclazy.js')
    .pipe(rename('app/app.route.oclazy.min.js'))
    .pipe(gulp.dest(buildPath));
    return gulp.src(indexSrc)
    .pipe(replace(/\.js/g, '.min.js'))
    .pipe(gulp.dest(buildPath));
});

gulp.task('compressHTML', function() {
    return gulp.src(htmlSrc)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(buildPath));
});

gulp.task('compressJS', function() {
    return gulp.src(jsSrc)
    .on('error', function(err) {//语法检查，打印错误
        console.log('Error: ', err.message);
    })
    .pipe(uglify())//压缩
    .pipe(gulp.dest(buildPath));
});

gulp.task('compressCSS', function() {
    return gulp.src(cssSrc)
    //.pipe(concat('index.min.css')) 为了使用oclazyload不整合
    .pipe(minifycss())
    .pipe(gulp.dest(buildPath + '/assets'));
});

gulp.task('compressJSON', function () {
    return gulp.src(jsonSrc)
        .pipe(jsonminify())
        .pipe(gulp.dest(buildPath + 'translate'));
});

gulp.task('copyImg', function() {
    return gulp.src(imgSrc)
    .pipe(gulp.dest(buildPath + '/assets/img'));
});

gulp.task('copyLib', function() {
    return gulp.src(libSrc)
    .pipe(gulp.dest(buildPath + 'lib'));
});

gulp.task('clean', function() {
    return gulp.src(buildPath)
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    runSequence('createIndex', 
    ['compressHTML', 'compressJS', 'compressCSS', 'compressJSON'],
    ['copyLib', 'copyImg']);
});

gulp.task('watch', function() {
    gulp.watch();
});