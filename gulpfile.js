/**
 * Copyright (c) 2015, CodiLime Inc.
 *
 * Owner: Piotr Zarówny
 */
'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var browserifyShim = require('browserify-shim');
var browserifyAnnotate = require('browserify-ngannotate');
var buffer = require('vinyl-buffer');
var babelifygul = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var size = require('gulp-size');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var exit = require('gulp-exit');
var shell = require('gulp-shell');

require('jshint-stylish');

var config = require('./config.json');
var client = config.files.client;
var server = config.files.server;
var build = config.files.build;
var libs = config.files.libs;
var devMode = !!gutil.env.dev;
var CIMode = !!gutil.env.ci;

client.path = __dirname + '/' + client.path;

var BROWSER_SYNC_RELOAD_DELAY = 2000;

gulp.task('clean', function() {
  return gulp.src([build.path], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('server', function (callback) {
  var called = false,
      config = {
        execMap: {
          'js': 'node --harmony'
        },
        script: server.path + server.app,
        verbose: true,
        watch: [ server.path ]
      };

  return nodemon(config).
    on('start', function () {
      if (!called) {
        callback();
      }
      called = true;
    }).
    on('restart', function () {
      setTimeout(function () {
        browserSync.reload();
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', function () {
  return browserSync({
    open: !devMode,
    proxy: config.env.frontend.host + ':' + config.env.frontend.port
  });
});

gulp.task('html', function () {
  return gulp.src([client.path + client.html])
    .pipe(gulp.dest(build.path));
});

gulp.task('images', function () {
  return gulp.src([client.path + client.images])
    .pipe(gulp.dest(build.path + build.images));
});

gulp.task('fonts', function () {
  return gulp.src([client.path + client.fonts])
    .pipe(gulp.dest(build.path + build.fonts));
});

gulp.task('less', function () {
  return gulp.src(client.path + client.less)
    .pipe(less())
    .pipe(!devMode ? minifyCSS() : gutil.noop())
    .pipe(size({
      title: 'less',
      showFiles: true
    }))
    .pipe(gulp.dest(build.path + build.css))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('libs:css', function () {
  return gulp.src(libs[devMode ? 'dev': 'prod'].css)
    .pipe(concat(build.bundle.css))
    .pipe(size({
      title: 'libs:css',
      showFiles: true
    }))
    .pipe(gulp.dest(build.path + build.css));
});

gulp.task('libs:js', function () {
  return gulp.src(libs[devMode ? 'dev': 'prod'].js)
    .pipe(concat(build.bundle.js))
    .pipe(size({
      title: 'libs:js',
      showFiles: true
    }))
    .pipe(gulp.dest(build.path + build.js));
});

gulp.task('jshint', function () {
  return gulp.src([
      server.path + server.js,
      './gulpfile.js',
      client.path + client.js
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(CIMode ? jshint.reporter('fail') : gutil.noop())
    .pipe(CIMode ? exit() : gutil.noop());
});

gulp.task('browserify', function () {
  return browserify({
      entries: [client.path + client.app],
      debug: devMode
    })
    .transform(babelifygul)
    .transform(browserifyAnnotate, {
        add: true,
        // jshint -W106
        single_quotes: true
    })
    .transform(browserifyShim)
    .bundle()
    .pipe(source(build.js + build.bundle.app))
    .pipe(buffer())
    .pipe(!devMode ? uglify() : gutil.noop())
    .pipe(size({
      title: 'browserify',
      showFiles: true
    }))
    .pipe(gulp.dest(build.path));
});

gulp.task('kill-all-node-instances',
  shell.task(['killall -9 node'], {
    ignoreErrors: true
  })
);

gulp.task('build', function (callback) {
  runSequence(
    'kill-all-node-instances',
    'clean',
    ['fonts', 'images', 'html', 'less', 'libs:css', 'libs:js', 'jshint', 'browserify'],
    'server',
    callback
  );
});

gulp.task('start', function (callback) {
  runSequence('build', 'browser-sync', callback);
  if (devMode) {
    gulp.watch(client.path + client.html, ['html', browserSync.reload]);
    gulp.watch(client.path + client.images, ['images', browserSync.reload]);
    gulp.watch(client.path + client.lessSources, ['less']);
    gulp.watch(
      [client.path + client.js, '|', '!' + __dirname + '/' + config.files.tests.client],
      ['jshint', 'browserify', browserSync.reload]
    );
  }
});

gulp.task('watch', function (callback) {
  devMode = true;
  runSequence('browser-sync', callback);
  gulp.watch(client.path + client.html, ['html', browserSync.reload]);
  gulp.watch(client.path + client.lessSources, ['less']);
  gulp.watch(
    [client.path + client.js, '|', '!' + __dirname + '/' + config.files.tests.client],
    ['jshint', 'browserify', browserSync.reload]
  );
});

gulp.task('default', function () {
  gutil.log(gutil.colors.red('Please select task to run.'));
  gutil.log('');
  gutil.log(gutil.colors.blue('start'), gutil.colors.gray('        builds and starts application'));
  gutil.log(gutil.colors.blue('start --dev'), gutil.colors.gray('  builds and watches for source changes'));
  gutil.log('');
});
