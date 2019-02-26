const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const ejs = require('gulp-ejs');
const gutil = require('gulp-util');
const webpack = require('webpack-stream');
const htmlmin = require('gulp-htmlmin');

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
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('img', () => {
    gulp.src('src/img/**/*.*')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('js', () => {
    gulp.src('src/js/main.js')
        .pipe(webpack({
            output: {
              filename: 'js/main.js',
            },
          }))
          .pipe(gulp.dest('dist/'));


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

gulp.task('default', ['styles', 'html', 'img', 'js']);
