import gulp from 'gulp';
import gulpESlint from 'gulp-eslint';
import gulpMocha from 'gulp-mocha';
import runSequence from 'run-sequence';

const IGNOREDDIRS = ['!**/node_modules/**'];

const SRCDIR = 'src';
const EXAMPLESDIR = 'examples';
const SPECDIR = 'spec';

gulp.task('lint', () => gulp
     .src([
       `${SRCDIR}/**/*.js`,
       `${SPECDIR}/**/*.js`,
       `${EXAMPLESDIR}/**/*.js`,
       'gulpfile.js',
       ...IGNOREDDIRS,
     ])
    .pipe(gulpESlint())
    .pipe(gulpESlint.format())
    .pipe(gulpESlint.failAfterError())
);

gulp.task('spec', () =>
  gulp.src([
    `${SPECDIR}/**/*.spec.js`,
  ])
  .pipe(gulpMocha({
    reporter: 'spec',
    ui: 'bdd',
  })));

gulp.task('copy', () =>
  gulp.src([
    `${SRCDIR}/**/*.js`,
  ])
  .pipe(gulp.dest(
    `examples/Simple/node_modules/react-native-foldview/${SRCDIR}`
  ))
);

gulp.task('default', done => {
  runSequence(
    'spec',
    'lint',
    done
   );
});

gulp.task('watch', () => {
  gulp.watch([
    `${SRCDIR}/**/*`,
    `${SPECDIR}/**/*`,
    'gulpfile.js',
  ], ['copy', 'default']);
});
