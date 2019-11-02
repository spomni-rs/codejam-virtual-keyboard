const gulp = require('gulp');
const lint = require('gulp-htmlhint');
const log = require('node-pretty-log');

gulp.task('lint-html', function lintHtml(done){

  gulp
    .src('src/**/*.html')
    .pipe(lint('.htmlhintrc'))
    .pipe(lint.failAfterError())
    .on('error', function(err){
      log('error', err.message);
    })
    .on('finish', function(){
      done()
    })
  ;
})