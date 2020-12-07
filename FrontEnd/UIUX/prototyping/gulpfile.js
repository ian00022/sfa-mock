// 'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var fileinclude = require('gulp-file-include');
var babel = require('gulp-babel');
var connect = require('gulp-connect');

// paths
var cssPath = ['./css/**/*.css', '!./css/**/*.min.css'],
  sassWatchPath = [
    './scss/**/*.{scss,sass}'
  ],
  fileWatchPath = [
    './template/**/*.html', '!./template/_*.html'
  ],
  css = {
    path: {
      output: './css'
    }
  }


gulp.task('fileinclude', function () {
  gulp.src(fileWatchPath)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
      //   hasfullCalendarCss: false,
      //   hasfullCalendarJs: false,
      //   hasGoogleMapClusterJs: false,
      //   hasGoogleMapJs: false
        hash: new Date().getTime().toString(),
        navbarType: '',
        sbCharacter: '',
        sbCharAssign: '',
        // 每頁都有sidebar 先加在全域後，在if statement就不用在判斷typeof
        sidebar: 'default',
        // 第一層展開
        sidebarCollapseFirst: 'default',
        shPage: ''
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('reloadAfterFileUpdate', ["fileinclude"], () => {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src(sassWatchPath)
    // // Initializes sourcemaps
    .pipe(sourcemaps.init())
    // // Converts Sass into CSS with Gulp Sass
    // // Writes sourcemaps into the CSS file
    // .pipe(sourcemaps.write('.', {
    //   includeContent: false,
    //   sourceRoot: sourcemapsRoot
    // }))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./', {includeContent: false, sourceRoot: '../scss'}))
    // Outputs CSS files in the css folder
    .pipe(gulp.dest(css.path.output));
});

gulp.task('jsbabel', () =>
  gulp.src('src/demo.js')
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(gulp.dest('js'))
);

// Watch scss folder for changes
gulp.task('watch', function () {
  var watcherSCSS = gulp.watch(sassWatchPath, ['sass']);
  var watcherHTML = gulp.watch(fileWatchPath, ['fileinclude', /*'reloadAfterFileUpdate'*/]);
  var watcherJSBabel = gulp.watch('./src/**/*.js', ['jsbabel']);
  var clgmsg = function (taskname, path, type) {
    return taskname + ' Task: File ' + path + ' was ' + type + ', running tasks...';
  }
  watcherSCSS.on('change', function (event) {
    console.log(clgmsg('SASS', event.path, event.type));
  });
  watcherHTML.on('change', function (event) {
    console.log(clgmsg('HTML', event.path, event.type));
  });
  watcherJSBabel.on('change', function (event) {
    console.log(clgmsg('JS', event.path, event.type));
  });
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    port: 5500,
    livereload: {
        port: 5499,
    }
  });
});


// Creating a default task
gulp.task('default', ['sass', 'fileinclude', 'jsbabel', 'watch', 'connect']);