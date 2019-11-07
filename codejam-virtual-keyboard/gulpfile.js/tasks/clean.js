const gulp = require('gulp');
const del = require('del')

gulp.task('clean', (done) => {
  del.sync('dist/**/*', {force: true});
  done();
})
