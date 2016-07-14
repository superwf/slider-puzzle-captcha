import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import autoprefixer from 'autoprefixer'
import cleanCss from 'gulp-clean-css'
// import pump from 'pump'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
// import fs from 'fs'
// import uglifyjs from 'uglify-js'
const $ = gulpLoadPlugins()

const distPath = './dist'

gulp.task('dist', () => {
  gulp.src('src/less/index.less')
  .pipe($.less())
  .pipe($.postcss([autoprefixer({browsers: ['last 2 versions']})]))
  .pipe(cleanCss())
  .pipe(gulp.dest(distPath))

  browserify('src/client/dist.js')
  .transform('babelify', {presets: ['es2015']})
  .bundle()
  .pipe(source('index.js'))
  .pipe($.buffer())
  .pipe($.uglify())
  .pipe(gulp.dest(distPath))

})
