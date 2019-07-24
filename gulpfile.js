const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');

// Compile SCSS into CSS
function style() {
    // 1. Where is the SCSS file?
    return gulp.src('./src/scss/**/*.scss')
    // 2. Pass that file through the SASS compiler
        .pipe(sass().on('error', sass.logError))
    // 3. Where is the compiled CSS saved?
        .pipe(gulp.dest('./css'))

    // 4. Stream changes to all browsers
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./src/scss/**/*.scss', style)
    // For multiple, nested HTML files - set up: gulp.watch('./**/*.html/') etc...
    gulp.watch('./*html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);

}

exports.style = style;
exports.watch = watch;