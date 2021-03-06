var fs = require('fs');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    env: {
      build: {
        NODE_ENV: 'production'
      }
    },

    browserify: {
      dev: {
        options: {
          debug: true,
          transform: [require('grunt-react').browserify]
        },
        files: {
          'build/rep_bundle.js': 'js/rep/*.js',
          'build/user_bundle.js' : 'js/user/*.js'
        }
      },
      build: {
        options: {
          debug: false,
          transform: [require('grunt-react').browserify]
        },
        files: {
          'build/rep_bundle.js': 'js/rep/*.js',
          'build/user_bundle.js' : 'js/user/*.js'
        }
      }
    },

    watch: {
      browserify: {
        files: ['js/**/*.js'],
        tasks: ['browserify:dev']
      },
      options: {
        nospawn: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['env:build', 'browserify:build']);
};
