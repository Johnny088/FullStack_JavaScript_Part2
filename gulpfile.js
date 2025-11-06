import gulp from 'gulp';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'gulp-csso';
import gcmq from 'gulp-group-css-media-queries';
import { deleteAsync } from 'del';
import htmlmin from 'gulp-htmlmin';
import svgstore from 'gulp-svgstore';
import plumber from 'gulp-plumber';
import rigger from 'gulp-rigger';
import stylelint from 'gulp-stylelint';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';

const server = browserSync.create();
const sassCompiler = gulpSass(sass);
const { src, dest, series, parallel, watch } = gulp;

// HTML
export function html() {
  return src('src/*.html')
    .pipe(rigger())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('build'));
}

// STYLES
export function styles() {
  return src('src/sass/styles.scss')
    .pipe(plumber())
    .pipe(
      stylelint({
        reporters: [{ formatter: 'string', console: true }],
      })
    )
    .pipe(sassCompiler())
    .pipe(postcss([autoprefixer()]))
    .pipe(gcmq())
    .pipe(dest('build/css'))
    .pipe(csso())
    .pipe(rename('styles.min.css'))
    .pipe(dest('build/css'))
    .pipe(server.stream());
}

// SCRIPTS
export function scripts() {
  return src('src/js/**/*.js')
    .pipe(plumber())
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(concat('scripts.js'))
    .pipe(dest('build/js'))
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(dest('build/js'));
}

// SPRITE
export function sprite() {
  return src('src/images/icons/icon-*.svg')
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(dest('build/images'));
}

// IMAGES
export function images() {
  return src(
    ['src/images/**/*.{png,jpg,jpeg,svg,gif,webp}', '!src/images/icons/**/*'],
    {
      encoding: false,
    }
  ).pipe(dest('build/images', { encoding: false }));
}

// FONTS
export function fonts() {
  return src('src/fonts/**/*').pipe(dest('build/fonts'));
}

// CLEAN
export async function clean() {
  return deleteAsync(['build']);
}

// PREPARE (optional)
export async function prepare() {
  return deleteAsync(['**/.gitkeep', 'README.md']);
}

// WATCHER
export function watcher(done) {
  watch('src/**/*.html', series(html, server.reload));
  watch('src/sass/**/*.scss', styles); // 👈 без server.reload
  watch('src/js/**/*.js', series(scripts, server.reload));
  done();
}

// SERVER
export function serve() {
  server.init({
    server: 'build',
    notify: false,
    open: false,
    cors: true,
    ui: false,
    logPrefix: 'DevServer',
    host: 'localhost',
    port: 8080,
  });
}

// MAIN TASKS
export const build = series(
  clean,
  parallel(sprite, images, fonts, html, styles, scripts)
);

export const start = series(build, parallel(watcher, serve));
