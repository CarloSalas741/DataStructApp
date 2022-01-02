import gulp from 'gulp';
import babel from 'gulp-babel';
import pug from 'gulp-pug';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
const sass =require('gulp-sass')(require('sass'));

const postcssPlugins = [
    cssnano({
        autoprefixer: {
            add: true
        }
    })
]

gulp.task('es6',()=>
    gulp.src('./src/dev/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./src/public/js'))
);

gulp.task('pug',()=>
    gulp.src('./src/dev/pug/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('./src/public/'))
);

gulp.task('sass',()=>
    gulp.src('./src/dev/sass/styles.scss')
    .pipe(sass())
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest('./src/public/css'))
);

gulp.task('default', ()=>
{
    gulp.watch('./src/dev/pug/**/*.pug',gulp.series('pug'))
    gulp.watch('./src/dev/sass/**/*.scss',gulp.series('sass'))
    gulp.watch('./src/dev/js/*.js',gulp.series('es6'))
});