(function() {

  module.exports = function (grunt) {
    grunt.config.init({
      pkg: grunt.file.readJSON('package.json'),
      srcPath: './src',
      destPath: './public',
      sass: {
        css: {
          options: {
            sourcemap: 'none',
            style: 'compressed'
          },
          files: {
            '<%= destPath %>/css/main.css': ['<%= srcPath %>/scss/main.scss']
          }
        },
      },
      autoprefixer: {
        options: {
          browsers: ['last 2 versions', 'ie >= 10']
        },
        main_css: {
          files: {
            '<%= destPath %>/css/main.css': ['<%= destPath %>/css/main.css']
          }
        }
      },
      ect: {
        options: {
          root:'<%= srcPath %>',
        },
        render: {
          expand: true,
          cwd:'<%= srcPath %>/html',
          src: ['**/*.html', '!shared/*.html', '!layout/*.html'],
          ext: '.html',
          dest:'<%= srcPath %>/_temp'
        }
      },
      copy: {
        html: {
          options: {
            encoding: 'utf8',
            process: function(content) {
              return content.replace(/\r\n|\n\r|\n|\r/g, "\n");
            }
          },
          expand: true,
          cwd: '<%= srcPath %>/_temp',
          src: ['**/*.html'],
          dest: '<%= destPath %>'
        }
      },
      clean: {
        ect: ['<%= srcPath %>/_temp', '<%= destPath %>/_temp']
      },
      scsslint: {
        allFiles: [
          '<%= srcPath %>/scss/**/*.scss'
        ],
        options: {
          config: '.scss-lint.yml',
          colorizeOutput: true,
          failOnWarning: false
        }
      },
      watch: {
        css: {
          files: [
            '<%= srcPath %>/scss/**/*.scss'
          ],
          tasks: ['css']
        },
        html: {
          files: [
            '<%= srcPath %>/html/**/*.html'
          ],
          tasks: ['html']
        }
      }
    });

    // Load Grunt Plugins
    var PACKAGE_JSON = grunt.file.readJSON('package.json');
    Object.keys(PACKAGE_JSON.devDependencies).map(function(name){
      if(name.match('grunt-')){
        grunt.loadNpmTasks(name);
      }
    });

    /* Grunt tasks */

    grunt.registerTask('default',         ['build']);
    grunt.registerTask('build',           ['css', 'html']);
    grunt.registerTask('css',             ['sass:css', 'scsslint', 'autoprefixer']);
    grunt.registerTask('html',            ['ect', 'copy:html', 'clean:ect']);

  };

})();
