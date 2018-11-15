var gulp = require('gulp');
var nunjucks = require('gulp-nunjucks');
var sass = require('gulp-sass');
var sourcemap = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var scssLint = require('gulp-scss-lint');
var browserify = require('browserify');
var sourceStream = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var browserSync = require('browser-sync').create();
var gtil = require('gulp-util');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

var init = {
  srcPath: './src',
  destPath: './public'
};

gulp.task('html', () => {
  return gulp.src([`${init.srcPath}/html/**/*.html`, `!${init.srcPath}/html/shared/*`, `!${init.srcPath}/html/layout/*`])
             .pipe(nunjucks.compile().on('error', () => {
               gtil.log(`[${err.plugin}] There is an error from ${err.fileName}`)
             }))
             .pipe(gulp.dest(`${init.destPath}/`))
});

gulp.task('image', () => {
  return gulp.src(`${init.srcPath}/img/**/*.{gif,jpg,png,svg,ico}`)
             .pipe(gulp.dest(`${init.destPath}/img`))
});

gulp.task('css', () => {
  return gulp.src(`${init.srcPath}/scss/**/*.scss`)
             .pipe(scssLint({ 'config': '.scss-lint.yml' }))
             .pipe(sourcemap.init())
             .pipe(sass())
             .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
             .pipe(sourcemap.write())
             .pipe(gulp.dest(`${init.destPath}/css`))
             .pipe(browserSync.stream())
});

// gulp.task('js', () => {
//   return browserify({
//     entries: `${init.srcPath}/js/bundle.js`,
//     debug: false
//   })
//         .transform(babelify, { 'presets': ['@babel/preset-env'] })
//         .bundle()
//         .pipe(sourceStream('bundle.min.js'))
//         .pipe(buffer())
//         .pipe(sourcemap.init())
//         .pipe(uglify())
//         .pipe(sourcemap.write())
//         .pipe(gulp.dest(`${init.destPath}/js`))
// });

gulp.task('browserSync', () => {
  return browserSync.init({
    server: {
      baseDir: `${init.destPath}`
    }
  })
});

gulp.task('watch', ['browserSync', 'css'], () => {
  gulp.watch(`${init.srcPath}/scss/**/*.scss`, ['css']);
  gulp.watch(`${init.srcPath}/js/**/*.js`, ['js']).on('change', () => browserSync.reload());
  gulp.watch(`${init.srcPath}/html/**/*.html`, ['html']).on('change', () => browserSync.reload());
});

gulp.task('clean', () => {
  return gulp.src(`${init.destPath}/*`)
             .pipe(clean())
});

gulp.task('default', ['html', 'image', 'css']);
gulp.task('deploy', () => {
  runSequence('clean', 'html', 'image', 'css')
});
