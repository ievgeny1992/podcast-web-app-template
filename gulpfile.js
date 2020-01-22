const gulp = require('gulp');

const browserSync = require('browser-sync');

const ejs = require('gulp-ejs');
const less = require('gulp-less');
const webpack = require('webpack-stream');

const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

//BROWSER SYNC
browserSync.create();

browserSync.init({
    server: "dist",
    port: 3001,
    files: [
        'dist/**/*.*'
    ]
});

// HTML
gulp.task('html', () => {
    return gulp.src('src/index.ejs')
        .pipe(ejs())
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./dist'));
});

// CSS
gulp.task('styles', () => {
    return gulp.src('src/less/main.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/css'));
});

// SCRIPTS
gulp.task('js', function() {
    return gulp.src('src/js/main.js')
        .pipe(webpack({
            output: {
                filename: 'js/main.js',
            },
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/'));
});

// IMAGES
gulp.task('img', () => {
    return gulp.src('src/img/**/*.*')
        .pipe(gulp.dest('./dist/img'));
});

// FONTS
gulp.task('font', () => {
    return gulp.src('src/font/**/*.*')
        .pipe(gulp.dest('./dist/font'));
});

// WATCH
gulp.task('watch', function() {
    gulp.watch('src/**/*.ejs', gulp.parallel('html'));
    gulp.watch('src/less/**/*.less', gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('html', 'styles', 'font', 'img', 'watch'));
gulp.task('build', gulp.parallel('html', 'styles', 'font', 'img', 'watch'));
gulp.task('build-js', gulp.parallel('html', 'js'));