"use strict";

var gulp        = require('gulp'),
     concat      = require('gulp-concat'),
    // sitemap = require('gulp-sitemap'),
    // save = require('gulp-save'),
    // request = require('request'),
    //sourcemaps  = require('gulp-sourcemaps'),
    // uglify      = require('gulp-uglify'),
    // traceur     = require('gulp-traceur'),
    // babel       = require('gulp-babel'),
    // tsd         = require('gulp-tsd'),
  	// lint        = require('gulp-eslint'),
    // rename      = require('gulp-rename'),
    config      = require('./config.json'),
    inject      = require('gulp-inject'),
    webserver   = require('gulp-webserver'),
    livereload  = require('gulp-livereload')
    // clean       = require('gulp-clean'),
	  // minifyCss   = require('gulp-minify-css'),
    // cmq         = require('gulp-combine-media-queries'),
    // csscomb = require('gulp-csscomb'),
    // csso = require('gulp-csso'),
    // uncss = require('gulp-uncss'),
    // imagemin = require('gulp-imagemin'),
    // pngquant = require('imagemin-pngquant'),
    // jpegtran = require('imagemin-jpegtran'),
    // gifsicle = require('imagemin-gifsicle'),
    // optipng = require('imagemin-optipng'),
    // imageResize = require('gulp-image-resize')
    ;
    

gulp.task('webserver', ['index'], function() {
  gulp.src('dist')
    .pipe(webserver({
      open: true,
     // directoryListing: true,
      port:9002,
      livereload: {
        enable:true
      }
  
    }));
});

gulp.task('watch',['index'], function () {
   gulp.watch('app/src/index.html', ['index']);
   gulp.watch('app/src/views/**/*.html', ['views']);
   gulp.watch('app/src/css/**/*.css', ['css']);
   gulp.watch('app/src/js/**/*.js', ['bundle']);
});


gulp.task('bundle', function() {
  return gulp.src(config.app.js.src)
    //.pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
  //  .pipe(uglify({mangle: false}))
   // .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.app.js.dist))

});

gulp.task('vendors', function() {
  return gulp.src(config.vendors)
    .pipe(concat('vendors.js'))
   // .pipe(uglify())
    .pipe(gulp.dest(config.app.js.dist))
});

gulp.task('css', function() {
  gulp.src(config.app.css.src)
	  .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.app.css.dist))
});
gulp.task('views', function() {
    gulp.src(config.app.views.src)
    .pipe(gulp.dest(config.app.views.dist));
});
gulp.task('icons', function() {
    gulp.src(config.app.icons.src)
    .pipe(gulp.dest(config.app.icons.dist));
});

gulp.task('index',['vendors','bundle','css'], function () {
  var target = gulp.src('app/src/index.html');
  var sources = gulp.src(['dist/js/vendors.js', 'dist/js/bundle.js','dist/css/bundle.css'], {read: false});
  return target.pipe(inject(sources, {ignorePath: 'dist'}))
    .pipe(gulp.dest('dist'))
});



gulp.task('default', ['css','vendors','views','icons', 'bundle','index', 'webserver', 'watch']);



