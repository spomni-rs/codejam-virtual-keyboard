const gulp = require('gulp');
const lint = require('gulp-eslint');
const log = require('node-pretty-log');

gulp.task('lint-js', function lintJs(done){

  gulp
    .src('src/js/**/*.js')
    .pipe(lint())
    .pipe(lint.format())
    .pipe(lint.failAfterError())
    .on("error", function(err){
      log('error', err.message);
    })
    .on('finish', done)
  ;
});

gulp.task('lint-js--fix', function lintJsFix(done){

  gulp
    .src('src/js/**/*.js')
    .pipe(lint({
      fix: true
    }))
    .pipe(lint.format())
    .pipe(lint.failAfterError())
    .on("error", function(err){
      log('error', err.message);
      this.emit('end');
    })
    .pipe(gulp.dest('src/js'))
    .on('end', done)
  ;
});