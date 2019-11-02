const gulp = require('gulp')
const {series, parallel} = gulp;
const requireDir = require('require-dir');
const log = require('node-pretty-log');

const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

requireDir('./tasks')

gulp.task('lint', series(
  'lint-html',
  'lint-styles',
  'lint-js'
))

gulp.task('lint--fix', series(
  'lint-html',
  'lint-styles--fix',
  'lint-js--fix'
))
