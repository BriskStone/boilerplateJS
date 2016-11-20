/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import del from 'del';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';

//Old commonJS ways
//const gulp = require('gulp');
//const babel = require('gulp-babel');
//const del = require('del');
//const exec = require('child_process').exec;

const paths = {
  allSrcJs: 'src/**/*.js?(x)',
  serverSrcJs: 'src/server/**/*.js?(x)',
  sharedSrcJs: 'src/shared/**/*.js?(x)',
  clientEntryPoint: 'src/client/app.js',
  gulpFile: 'gulpfile.babel.js',
  webpackFile: 'webpack.config.babel.js',
  libDir: 'lib',
  distDir: 'dist',
  clientBundle: 'dist/client-bundle.js?(.map)'
};

//Deletes files in lib directory before babel is run.

gulp.task('lint', () =>
  gulp.src([
    paths.allSrcJs,
    paths.gulpFile,
    paths.webpackFile,
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('clean', () => del([
  paths.libDir,
  paths.clientBundle,
]));

//Babel is called here
gulp.task('build', ['lint','clean'], () => {
  return gulp.src(paths.allSrcJs)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir));
});

//Runs Node . BUT with the specified dir "lib"
gulp.task('main', ['lint', 'clean'], () =>
  gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir))
);

//Runs the 'main' task when filesystem changes.
gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['main']);
});


//Special task for CLI gulp command. Runs Watch and main.
gulp.task('default', ['watch', 'main']);