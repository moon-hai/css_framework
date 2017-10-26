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
            style: 'expanded'
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
      concat: {
        js: {
          files: [
            {
              src: [
                '<%= srcPath %>/js/vendor/jquery.min.js'
              ],
              dest: '<%= destPath %>/js/vendor.js'
            },
            {
              src: [
                '<%= srcPath %>/js/main.js'
              ],
              dest: '<%= destPath %>/js/main.js'
            }
          ]
        }
      },
      uglify: {
        vendor_js: {
          options: {
            mangle: {
              reserved: ['jQuery']
            },
            compress: true,
            beautify: false
          },
          files: [{
            expand: true,
            cwd: '<%= destPath %>/js',
            src: ['vendor.js'],
            dest: '<%= destPath %>/js',
            ext: '.js',
            extDot: 'last'
          }]
        },
        main_js: {
          options: {
            mangle: false,
            compress: false,
            beautify: {
              indent_level: 2,
              quote_style: 1,
              width: 140
            }
          },
          files: [{
            expand: true,
            cwd: '<%= destPath %>/js',
            src: ['main.js'],
            dest: '<%= destPath %>/js',
            ext: '.js',
            extDot: 'last'
          }]
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
        js: {
          files: [
            '<%= srcPath %>/js/**/*.js'
          ],
          tasks: ['js_dev']
        },
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
    grunt.registerTask('build',           ['css', 'js', 'html']);
    grunt.registerTask('css',             ['sass:css', 'scsslint', 'autoprefixer']);
    grunt.registerTask('js',              ['concat', 'uglify']);
    grunt.registerTask('js_dev',          ['concat', 'uglify:main_js']);
    grunt.registerTask('html',            ['ect', 'copy:html', 'clean:ect']);

  };

})();
