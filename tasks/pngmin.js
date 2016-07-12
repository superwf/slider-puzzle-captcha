import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const $ = gulpLoadPlugins()
gulp.task('pngmin', () => {
  gulp.src('public/*.png')
  .pipe($.pngmin())
  .pipe(gulp.dest('src/img'))
})
