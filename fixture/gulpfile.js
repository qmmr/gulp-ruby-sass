'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('../');

gulp.task('sass', function() {
	return sass('sourcez', { verbose: true })
	.on('error', function (err) {
	 console.error('Error!', err.message);
  })
	// .pipe(sourcemaps.write())
	.pipe(gulp.dest('result'));
});

gulp.task('sass-be', function() {
	return sass('sourcez', { bundleExec: true, verbose: true })
	.on('error', function (err) {
	 console.error('Error!', err.message);
  })
	.pipe(gulp.dest('result'));
});

// Files VV

gulp.task('sassf', function() {
	return sass('source/fixture-a.css', { verbose: true })
	.on('error', function (err) {
	 console.error('Error!', err.message);
  })
	// .pipe(sourcemaps.write())
	.pipe(gulp.dest('result'));
});

gulp.task('sassf-be', function() {
	return sass('source/fixture-a.css', { bundleExec: true, verbose: true })
	.on('error', function (err) {
	 console.error('Error!', err.message);
  })
	.pipe(gulp.dest('result'));
});

// file sourcemaps
// gulp.task('sass-file', function() {
//	return sass('source', { sourcemap: true })
// 	.on('error', function (err) {
// 	  console.error('Error!', err.message);
//    })
//
// 	.pipe(sourcemaps.write('../maps', {
// 		includeContent: false,
// 		sourceRoot: '/fixture/source'
// 	}))
//
// 	.pipe(gulp.dest('result'));
// });
