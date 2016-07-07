import config from '../src/config'
import gulp from 'gulp'
import Babelify from 'babelify'
import gulpLoadPlugins from 'gulp-load-plugins'
import exorcist from 'exorcist'
import browserify from 'browserify'
import fs from 'fs'
const $ = gulpLoadPlugins()

const port = config.port

const babelify = Babelify.configure({
  presets: ['es2015', 'react']
})

const srcPath = {
  less: 'src/less/*.less',
  view: 'src/view/index.jade',
  client: 'src/client/**/*.js',
  lib: 'src/lib/**/*.js',
  server: 'src/server/**/*.js'
}
const destPath = {
  js: './public/*.js',
  root: './public'
}

gulp.task('view', () => {
  return gulp.src(srcPath.view)
  .pipe($.pug())
  .pipe(gulp.dest(destPath.root))
})

gulp.task('less', () => {
  return gulp.src(srcPath.less)
  .pipe($.less())
  .pipe(gulp.dest(destPath.root))
})

// 有时上一个进程没有正确关闭，运行gulp kill清理
gulp.task('kill', () => {
  const spawn = require('child_process').spawn
  const result = spawn('lsof', ['-i', 'tcp:' + port])
  result.stdout.on('data', data => {
    let line = data.toString().split('\n')[1]
    line = line.replace(/\s+/, ' ')
    line = line.split(/\s/)
    let port = line[1]
    if (port) {
      spawn('kill', [port])
    }
  })
})

gulp.task('lint', () => {
  gulp.src([srcPath.server, srcPath.lib]).pipe($.eslint()).pipe($.eslint.format())
})

const browserifyTask = () => {

  browserify('src/client/index.js', {debug: true})
  .transform('babelify', {presets: ['es2015']})
  .bundle()
  .pipe(fs.createWriteStream(destPath.root + '/index.js'))
}

gulp.task('browserify', browserifyTask)

gulp.task('default', ['browserify', 'view', 'less', 'kill'], () => {
  const cp = require('child_process')
  let fork = cp.fork('src/server/index.js')

  const browserSync = require('browser-sync').create()
  gulp.watch(srcPath.less).on('change', () => {
    gulp.src(srcPath.less)
    .pipe($.less())
    .pipe(gulp.dest(destPath.root))
    .pipe(browserSync.reload({stream: true}))
  })

  gulp.watch(srcPath.view).on('change', () => {
    gulp.src(srcPath.view)
    .pipe($.pug())
    .pipe(gulp.dest(destPath.root))
    .pipe(browserSync.reload({stream: true}))
  })

  gulp.watch(destPath.js).on('change', e => {
    gulp.src(e.path)
    .pipe(browserSync.reload({stream: true}))
  })
  gulp.watch(srcPath.client).on('change', e => {
    gulp.src(e.path).pipe($.eslint()).pipe($.eslint.format())
    browserifyTask()
  })

  gulp.watch([srcPath.server, srcPath.lib]).on('change', e => {
    gulp.src(e.path).pipe($.eslint()).pipe($.eslint.format())
    fork.kill()
    fork = cp.fork('src/server/index.js')
    fork.send({connected: true})
    fork.on('message', browserSync.reload)
  })

  // Input file.
  browserSync.init({
    open: false,
    proxy: 'localhost:' + port
  })
})
