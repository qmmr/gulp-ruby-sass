'use strict';
var gutil = require('gulp-util');

// remove temp directory and line breaks for more Sass-like logging
// function formatMsg (msg, tempDir) {
// 	msg = msg.replace(new RegExp((tempDir) + '/?', 'g'), '');
// 	msg = msg.trim();
// 	return msg;
// }

module.exports = {
	verbose: function  (command, args) {
		// RWRW Make this a gutil logger
		console.log("Running command " + command + " " + args.join(" "));
	},

	stdout: function (data, stream) {
		// Sass
		// Includes Sass dir missing (even though file missing needs to be caught in stderr)
		// RWRW Should this be /^error/? Only if trimming works
		// /error\s/

		// Bundler error: no Sass version found
		if (/bundler: command not found: sass/.test(data)) {
			stream.emit('error', new Error("bundler: command not found: sass"));
		}

		// Bundler error: Gemfile not found
		else if (/Could not locate Gemfile or .bundle\/ directory/.test(data)) {
			stream.emit('error', new Error("bundler: could not locate Gemfile or .bundle directory"));
		}

		// Not an error: Sass logging
		else {
			console.log('stdout: ', data);
		}
	},

	stderr: function (data, stream) {
		var bundlerMissing = /Could not find 'bundler' \((.*?)\)/.exec(data)
		var sassVersionMissing = /Could not find gem 'sass \((.*?)\) ruby'/.exec(data)
		var sassFileMissing = /No such file or directory @ rb_sysopen - (.*)/.exec(data)

		// Ruby error: Bundler gem not installed
		if (bundlerMissing) {
			stream.emit('error', new Error(
				"ruby: Could not find 'bundler' (" + bundlerMissing[1] + ")."
			));
		}

		// Bundler error: no matching Sass version
		else if (sassVersionMissing) {
			stream.emit('error', new Error(
				"bundler: Could not find gem 'sass (" + sassVersionMissing[1] + ")'."
			));
		}

		// Sass error: file missing
		else if (sassFileMissing) {
			stream.emit('error', new Error(
				"sass: No such file or directory @ rb_sysopen - " + sassFileMissing[1] +
				". Use --trace for backtrace"
			));
		}

		// Not an error: Sass warnings, debug statements
		else {
			console.log('stderr: ', data);
		}
	},

	error: function (err, stream) {
		// Spawn error: bundle or sass not installed
		if (err.code === 'ENOENT') {
			stream.emit('error', new Error('Gem ' + err.path + ' is not installed.'));
		}

		// Other errors
		else {
			stream.emit('error', err);
		}
	}
}
