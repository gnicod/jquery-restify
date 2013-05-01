module.exports = function(grunt) {

	// Configuration goes here
	grunt.initConfig({
		uglify: {
			my_target: {
				files: {
					'src/jquery-restify.min.js': ['src/jquery-restify.js']
				}
			}
		},
		jshint: {
			options: {
				browser: false,
				smarttabs:false
			},
			all: ['src/jquery-restify.js'],
			globals: {
				jQuery: true
			}
		}
	});

	// Load plugins here
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// Define your tasks here
	grunt.registerTask('default', ['uglify','zombie']);

	grunt.registerTask('zombie', 'Test with zombie', function() {
		var done = this.async();
		grunt.util.spawn({
			cmd: 'node',
			args: ['test/zombie.js']
		},function(error,result,code){
			grunt.log.writeln(result);
			grunt.log.writeln(error);
			grunt.log.writeln(code);
			done();
		});
	});

};
