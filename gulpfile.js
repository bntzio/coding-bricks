const gulp = require('gulp')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const browserSync = require('browser-sync').create()

// server
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './dist/'
    }
  })
})

// html
gulp.task('html', () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'))
})

// scss
gulp.task('scss', () => {
  return gulp.src('./src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(browserSync.stream())
})

// css
gulp.task('css', () => {
  return gulp.src('./src/styles/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/styles/'))
})

// watchers
gulp.task('watch', () => {
  gulp.watch('./src/styles/**/*.scss', ['scss'])
  gulp.watch('./src/*.html', ['html'])
  gulp.watch('./src/*.html').on('change', browserSync.reload)
})

// chain tasks
gulp.task('default', ['html', 'css', 'scss', 'watch', 'serve'])
