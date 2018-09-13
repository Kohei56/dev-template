var gulp = require("gulp");
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var browserSync = require("browser-sync");

//setting : paths
var paths = {
  'sass': './src/sass/',
  'css': './dist/css/',
  'pug': './src/pug/',
  'html': './dist/',
  'js': './dist/js/'
}

//setting : Sass Options
var sassOptions = {
//  outputStyle: 'compressed'
}

//setting : Pug Options
var pugOptions = {
  pretty: true
}

//Sass
gulp.task('sass', function () {
  gulp.src([paths.sass + '**/*.scss', paths.sass + '**/*.sass'])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(sass(sassOptions))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css))
});

//Pug
gulp.task('pug', () => {
  return gulp.src([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(pug(pugOptions))
    .pipe(gulp.dest(paths.html));
});

//Browser Sync
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: paths.html
    }
  });
  gulp.watch(paths.html + "**/*.html", ['reload']);
  gulp.watch(paths.css + "**/*.css", ['reload']);
  gulp.watch(paths.js + "**/*.js", ['reload']);
});
gulp.task('reload', () => {
  browserSync.reload();
});

//watch
gulp.task('watch', function () {
//  gulp.watch([paths.pug + '**/*.pug', '!' + paths.pug + '**/_*.pug'], ['pug']);
  gulp.watch([paths.sass + '**/*.scss', paths.sass + '**/*.sass'], ['sass']);
  gulp.watch(paths.pug + '**/*.pug', ['pug']);
});

gulp.task('default', ['browser-sync', 'watch']);