const gulpConfig  = require('./gulp.config.js');

const port        = gulpConfig.port;
const cssDistDir  = gulpConfig.cssDistDir;
const jsDistDir   = gulpConfig.jsDistDir;
const scssSources = gulpConfig.scssSources;
const tsSources   = gulpConfig.tsSources;

let gulp = require('gulp');
let $ = require('gulp-load-plugins')();
let sass = require('gulp-sass')(require('sass'));
let packageImporter = require('node-sass-package-importer');
let webpack = require('webpack-stream');
let webpackConfig = require('./webpack.config.js');
let browserSync = require('browser-sync').create();
var rename = require("gulp-rename");

// Docker
gulp.task('server', function(){
    browserSync.init({
        proxy: 'localhost:' + port
    });
});

// Webpack
gulp.task('webpack', function () {
    return gulp.src( tsSources )
        .pipe(
            webpack(webpackConfig)
                .on('ERROR', function(e){
                    this.emit('end');
                })
        )
        .pipe(gulp.dest( jsDistDir ))
        .pipe(browserSync.stream());
});

// Sass
gulp.task('sass', function() {
    return gulp.src( scssSources )
        .pipe(
            sass({
                importer: packageImporter({
                    extensions: ['.scss', '.css']
                }),
                outputStyle: 'expanded',
                // outputStyle: 'compressed',
            })
            .on('error', sass.logError)
        )
        .pipe($.autoprefixer({
            grid: true,
        }))

        .pipe(gulp.dest( cssDistDir ))
        .pipe(browserSync.stream());
});

// Watch
gulp.task('watch', function() {
    gulp.watch( tsSources, gulp.task( 'webpack' ));
    gulp.watch( scssSources, gulp.task( 'sass' ));
});

// Default
gulp.task( 'default',
    gulp.series(
        gulp.parallel(
            'server',
            'webpack',
            'sass',
            'watch'
        )
    ),
    function(){}
);
