const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const postscss = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const stylelint = require('stylelint');
const rename = require('gulp-rename');
const reporter = require('postcss-reporter');
// const terser = require('gulp-terser');
// const concat = require('gulp-concat');
// const imagemin = require('gulp-imagemin');
// const browserSync = require('browser-sync').create();

function stylelintSCSS() {
  return src('src/assets/scss/**/*.scss')
    .pipe(postcss([stylelint, reporter], { syntax: postscss }));
}

function compileSCSS() {
  return src('src/assets/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('public/assets/css'));
}

function watchTasks() {
  watch('src/assets/scss/**/*.scss', stylelintSCSS);
  watch('src/assets/scss/**/*.scss', compileSCSS);
}

exports.default = series(stylelintSCSS, compileSCSS, watchTasks);
exports.build = series(compileSCSS);