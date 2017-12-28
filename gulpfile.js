var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var pug = require('gulp-pug');

const dirs = {
  src: 'src',
  dest: 'dist'
};

const stylesConfig = {
  src: dirs.src+'/styles/*.scss',
  dest: dirs.dest+'/css'
};

const scriptsConfig = {
  src: dirs.src+'/scripts/*.js',
  dest: dirs.dest+'/js'
};

const imagesConfig = {
  src: dirs.src+'/images/*',
  dest: dirs.dest+'/images'
};

const htmlConfig = {
  src: dirs.src+'/templates/*.pug',
  dest: dirs.dest
};

const fontConfig = {
  src: dirs.src+'/fonts/*',
  dest: dirs.dest+'/fonts'
};

gulp.task('styles', () => {
  gulp.src(stylesConfig.src)
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest(stylesConfig.dest))
    .pipe(connect.reload());
});

gulp.task('scripts', function(){
    gulp.src(scriptsConfig.src)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(scriptsConfig.dest))
    .pipe(connect.reload());
});

gulp.task('images', function() {
  gulp.src(imagesConfig.src)
    .pipe(imagemin())
    .pipe(gulp.dest(imagesConfig.dest))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src(htmlConfig.src)
  .pipe(pug({
    pretty:'\t'
  }))
  .pipe(gulp.dest(htmlConfig.dest))
  .pipe(connect.reload());
});

gulp.task('fonts', function() {
  gulp.src(fontConfig.src)
  .pipe(gulp.dest(fontConfig.dest))
  .pipe(connect.reload());
});

gulp.task('server', function () {
  connect.server({
    root: ['./dist'],
    livereload: true,
    port: 4200,
  });
});

gulp.task('watch', function () {
  gulp.watch(stylesConfig.src, ['styles']);
  gulp.watch(scriptsConfig.src, ['scripts']);
  gulp.watch(imagesConfig.src, ['images']);
  gulp.watch(htmlConfig.src, ['html']);
  gulp.watch(fontConfig.src, ['fonts']);
});

gulp.task('default', ['scripts', 'styles', 'images', 'html', 'fonts', 'server', 'watch']);
gulp.task('build', ['scripts', 'styles', 'images', 'html', 'fonts']);