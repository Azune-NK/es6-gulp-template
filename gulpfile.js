const path = require(`path`);
const gulp = require(`gulp`);
const plumber = require(`gulp-plumber`);
const sourcemap = require(`gulp-sourcemaps`);
const sass = require(`gulp-sass`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const server = require(`browser-sync`).create();
const csso = require(`gulp-csso`);
const rename = require(`gulp-rename`);
const imagemin = require(`gulp-imagemin`);
const webp = require(`gulp-webp`);
const svgstore = require(`gulp-svgstore`);
const posthtml = require(`gulp-posthtml`);
const include = require(`posthtml-include`);
const del = require(`del`);
const uglify = require(`gulp-uglify`);
const webpackStream = require(`webpack-stream`);
const webpackConfig = require(`./webpack.config.js`);

gulp.task(`script`, function () {
  return gulp.src([`source/js/main.js`])
      .pipe(webpackStream(webpackConfig))
      .pipe(uglify())
      .pipe(gulp.dest(`build/js`));
});

gulp.task(`css`, function () {
  return gulp.src(`source/sass/style.scss`)
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer({
        grid: true,
        overrideBrowserslist: ['ie >= 11, > 0.2%'],
      })]))
      .pipe(csso())
      .pipe(rename(`style.min.css`))
      .pipe(sourcemap.write(`.`))
      .pipe(gulp.dest(`build/css`))
      .pipe(server.stream());
});

gulp.task(`server`, function () {
  server.init({
    server: `build/`,
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch(`source/sass/**/*.{scss,sass}`, gulp.series(`css`));
  gulp.watch(`source/img/**/*.svg`, gulp.series(`copysvg`, `sprite`, `html`, `refresh`));
  gulp.watch(`source/img/**/*.{png,jpg}`, gulp.series(`copypngjpg`, `html`, `refresh`));
  gulp.watch(`source/html/**/*.html`, gulp.series(`html`, `refresh`));
  gulp.watch(`source/js/**/*.js`, gulp.series(`script`, `refresh`));
});

gulp.task(`refresh`, function (done) {
  server.reload();
  done();
});

gulp.task(`copysvg`, function () {
  return gulp.src(`source/img/**/*.svg`, {base: `source`})
      .pipe(gulp.dest(`build`));
});

gulp.task(`copypngjpg`, function () {
  return gulp.src(`source/img/**/*.{png,jpg}`, {base: `source`})
      .pipe(gulp.dest(`build`));
});

gulp.task(`images`, function () {
  return gulp.src(`source/img/**/*.{png,jpg,svg}`)
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.svgo({
            plugins: [
              {removeViewBox: false},
              {removeRasterImages: true},
            ]
          }),
      ]))

      .pipe(gulp.dest(`source/img`));

});

gulp.task(`webp`, function () {
  return gulp.src(`source/img/**/*.{png,jpg}`)
      .pipe(webp({quality: 90}))
      .pipe(gulp.dest(`source/img`));
});

gulp.task(`sprite`, function () {
  return gulp.src(`source/img/sprite/*.svg`)
      .pipe(svgstore({inlineSvg: true}))
      .pipe(rename(`sprite_auto.svg`))
      .pipe(gulp.dest(`build/img`));
});

gulp.task(`html`, function () {
  return gulp.src(`source/html/*.html`)
      .pipe(posthtml([
        include(),
      ]))
      .pipe(gulp.dest(`build`));
});

gulp.task(`copy`, function () {
  return gulp.src([
    `source/fonts/**/*.{woff,woff2}`,
    `source/img/**`,
    `source/favicon/*.ico`,
  ], {
    base: `source`,
  })
      .pipe(gulp.dest(`build`));
});

gulp.task(`clean`, function () {
  return del(`build`);
});

gulp.task(`build`, gulp.series(`clean`,
    `images`,
    //`webp`,
    `copy`,
    `css`,
    `sprite`,
    `script`,
    `html`
));
gulp.task(`start`, gulp.series(`build`, `server`));
