'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    clean: {
      build: {
        src: ['build/']
      }
    },

    copy: {
      build: {
        expand: true,
        cwd: 'app/',
        src: '**/*.html',
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },

      options: {
        transform: ['reactify','debowerify']
      }
    },
  });
  grunt.registerTask('build', ['clean','browserify', 'copy']);
  grunt.registerTask('build:test', ['browserify:test']);
  grunt.registerTask('test:client', ['browserify:karmatest', 'karma:unit']);
};
