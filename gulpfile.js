//Подключаем модуль галпа
const {src, dest, watch} = require('gulp');
// Подкдючаем модуль mini-css
const min = require('gulp-mini-css');
const css = require('gulp-mini-css');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const browserSync = require('browser-sync').create();

// Static server
 
function bs() {
    serveSass();
    browserSync.init({
        server: {
            baseDir: "src/"
        }
    });
    watch("src/*.html").on('change', browserSync.reload);
    watch("./sass/**/*.sass", serveSass);
    watch("./sass/**/*.scss", serveSass);
    watch("src/js/*.js").on('change', browserSync.reload);
};

// Compile sass into CSS & auto-inject into browsers
function serveSass() {
    return src("./sass/**/*.sass", "./sass/**/*.sass")
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest("src/css"))
        .pipe(browserSync.stream());
};

exports.serve = bs;



