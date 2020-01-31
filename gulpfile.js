// Core
const gulp = require('gulp');
const plumber = require('gulp-plumber');

//CSS
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');

// javascript
const uglify = require('gulp-uglify');
const babel = require("gulp-babel");
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');

// Images
const imagemin = require('gulp-imagemin');

// Utilities
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const uglifyCSS = require('gulp-uglifycss');
const livereload = require('gulp-livereload');
const del = require('del');

// Configurations and path folders
const {
  paths,
  sassConfig,
  htmlConfig,
  uglifyConfig
} = require('./config.js');

// Deletes dist folder
gulp.task('delete:dist', () => {
  console.log('Deleting dist folder');

  return del.sync(paths.dest);
});

// Copies normalize to dist folder
gulp.task('copy:normalize', () => {
  console.log('Copying normalize');

  return gulp.src('./node_modules/normalize.css/normalize.css')
    .pipe(plumber((err) => {
      console.log('Styles error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(uglifyCSS({
      "uglyComments": true
    }))
    .pipe(rename('normalize.min.css'))
    .pipe(gulp.dest(paths.styles.dest));
});

// Minify html files
gulp.task('minify:html', () => {
  console.log('Starting minify:html task');

  return gulp.src(`${paths.pages.src}/**/*.html`)
    .pipe(htmlmin(htmlConfig))
    .pipe(gulp.dest(paths.dest))
    .pipe(livereload());
});

// Compiles and minifies style.scss into style.css
gulp.task('compile:styles', () => {
  console.log('Starting styles task');

  return gulp.src(`${paths.styles.src}/style.scss`)
    .pipe(plumber((err) => {
      console.log('Styles error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 4 versions']
    }))
    .pipe(sass(sassConfig))
    .pipe(sourcemaps.write())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(livereload());
});

// Compiles all your scripts into main.min.js
gulp.task('compile:scripts', () => {
  console.log('Starting scripts task');

  const scripts = [
    `${paths.js.src}/main.js`
  ];

  return gulp.src(scripts)
    .pipe(plumber((err) => {
      console.log('Scripts error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(uglify(uglifyConfig))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(livereload());
});

// Copies javascript dependencies.
gulp.task('copy:dependencies', () => {
  console.log('Copying dependencies');

  const jsdependencies = [];

  return gulp.src(jsdependencies)
    .pipe(plumber((err) => {
      console.log('Dependencies error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(livereload());
});

// Copy images
gulp.task('copy:images', () => {
  console.log('Starting images task');

  return gulp.src(paths.images.src)
    .pipe(plumber((err) => {
      console.log('Images error');
      console.log(err);
      this.emit('end');
    }))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
});

// Watch with static server
gulp.task('watch', ['delete:dist', 'copy:normalize', 'minify:html', 'copy:images', 'compile:styles', 'compile:scripts', 'copy:dependencies'], () => {
  console.log('Starting watch task');

  require('./server.js');

  gulp.watch(`${paths.pages.src}/**/*.html`, ['minify:html']);
  gulp.watch(paths.images.src, ['copy:images']);
  gulp.watch(`${paths.styles.src}/**/*.scss`, ['compile:styles']);
  gulp.watch(`${paths.js.src}/**/*.js`, ['compile:scripts']);

  livereload.listen();
});
