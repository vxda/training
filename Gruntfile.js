module.exports = function (grunt) {
  grunt.initConfig({
    min: {
      dist: {
        src: 'training/js/*.js',
        dest: 'main.min.js'
      }
    }
  });
};