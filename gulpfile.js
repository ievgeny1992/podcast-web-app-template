const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const ejs = require('gulp-ejs');
const gutil = require('gulp-util');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

browserSync.create();

browserSync.init({
    server: "dist",
    port: 3001,
    files: [
        'dist/**/*.*'
    ]
});

gulp.task('styles', () => {
    gulp.src('src/less/main.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('img', () => {
    gulp.src('src/img/**/*.*')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('font', () => {
    gulp.src('src/font/**/*.*')
        .pipe(gulp.dest('./dist/font'));
});

gulp.task('js', function () {
    return gulp.src('src/js/main.js')
    .pipe(webpackStream({
        output: {
        filename: 'js/main.js',
    },
    module: {
        rules: [{
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
        }]
    }
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('html', () => {
    gulp.src('src/index.ejs')
        .pipe(ejs().on('error', gutil.log))
        .pipe(rename('index.html'))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'));
});

gulp.watch('src/less/**/*.less', ['styles']);
gulp.watch('src/**/*.ejs', ['html']);
gulp.watch('src/img/**/*.*', ['img']);
gulp.watch('src/js/**/*.*', ['js']);

gulp.task('default', ['styles','js', 'html', 'img', 'font']);
