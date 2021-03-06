module.exports = function(grunt) {
	grunt.initConfig({
		path: require('path'),
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				} // close .globals
			}, // close .options
			gruntfile: {
				src: ['gruntfile.js'],
			},
			sourceFiles: {
				src: ['src<%= path.sep %>js<%= path.sep %>*.js'],
			}
		}, // close jshint
		uglify: {
			options: {
				banner: '/* \n** <%= pkg.name %> - v<%= pkg.version %> \n' +
					'** Author: Christopher Vachon (code@christophervachon.com) \n' +
					'** Build Date <%= grunt.template.today("yyyy-mm-dd") %> \n' +
					'** Repository: <%= pkg.homepage %>\n*/\n'
			},
			sourceFiles: {
				files: {
					'jquery.syntaxhighlighter.min.js': ['jquery.syntaxhighlighter.js']
				}
			}
		}, // close uglify
		less: {
			build: {
				files: {
					"jquery.syntaxhighlighter.css": "jquery.syntaxhighlighter.less"
				}
			}
		}, // close less
		watch: {
			gruntfile: {
				files: ['gruntfile.js'],
				tasks: ['jshint:gruntfile'],
				options: {
					spawn: false
				}
			}, // close gruntfile
			jsfiles: {
				files: ['*.js','!gruntfile.js'],
				tasks: ['jshint:sourceFiles','uglify:sourceFiles'],
				options: {
					spawn: false
				}
			}, // close jsfiles
			lessFile: {
				files: ['jquery.syntaxhighlighter.less'],
				tasks: ['less:build'],
				options: {
					spawn: false
				}
			} // close lessFile
		} // close watch
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
}; // close module.exports
