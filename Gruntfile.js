module.exports = function(grunt) {

  // Config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: false
      },
      build: {
        files: {
          'public/dist/js/app.min.js': ['public/javascripts/*.js','public/javascripts/**/*.js']
        }
      }
    }
  });

  // Load Tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Build
  grunt.registerTask('build', ['uglify']);

};