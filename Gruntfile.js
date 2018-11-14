module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    srcPath: './src',
    destPath: './public',
    ect: {
      options: {
        root: '<%= srcPath %>'
      },
      render: {
        expand: true,
        cwd: '<%= srcPath %>/html',
        src: ['**/*.html', '!shared/*.html', '!layout/*.html'],
        ext: '.html',
        dest:'<%= srcPath %>/_temp'
      }
    },
    copy: {
      dist: {
        expand: true,
        cwd: '<%= srcPath %>/html/_temp',
        src: ['**/*.html'],
        dest: '<%= destPath %>',
        options: {
          encoding: 'utf8',
          process: function(content) {
            return content.replace(/\r\n|\n\r|\n|\r/g, '\n');
          }
        }
      }
    },
    clean: {
      ect: ['<%= srcPath %>/_temp', '<%= destPath %>/_temp'],
      all: ['<%= destPath %>']
    },
    sass: {
      dist: {
        options: {
          sourcemap: 'none',
          style: 'expanded'
        },
        files: {
          '<%= destPath %>/css/main.css': '<%= srcPath %>/scss/main.scss'
        }
      }
    },
    scsslint: {
      allFiles: ['<%= srcPath %>/scss/**/*.scss'],
      options: {
        config: '.scss-lint.yml',
        colorizeOutput: true,
        failOnWarning: false
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie >= 10']
      },
      main_css: {
        files: {
          '<%= destPath %>/css/main.css' : '<%= destPath %>/css/main.css'
        }
      }
    },
    concat: {
      dist: {
        files: [
          {
            src: [
              '<%= srcPath %>/js/main1.js',
              '<%= srcPath %>/js/main2.js'
            ],
            dest: '<%= destPath %>/js/main.js'
          },
          {
            src: [
              '<%= srcPath %>/js/vendor1.js',
              '<%= srcPath %>/js/vendor2.js'
            ],
            dest: '<%= destPath %>/js/vendor.js'
          }
        ]
      }
    },
    uglify: {
      dist: {
        options: {
          mangle: false,
          compress: false,
          beautify: {
            indent_level: 2,
            quote_style: 1
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
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: '<%= srcPath %>/**/*.html',
        tasks: ['html']
      },
      css: {
        files: '<%= srcPath %>/scss/**/*.scss',
        tasks: ['css']
      },
      js: {
        files: '<%= srcPath %>/js/**/*.js',
        tasks: ['js']
      }
    },
    browserSync: {
      bsFiles: {
        src: [
          '<%= destPath %>/css/index.css',
          '<%= destPath %>/js/main.js',
          '<%= destPath %>/**/*.html',
        ]
      },
      options: {
        server: {
          baseDir: 'public'
        }
      }
    },
    cssmin: {
      dist: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: '<%= destPath %>/css',
          src: ['*.css'],
          ext: '.css',
          dest: '<%= destPath %>/css'
        }]
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
  grunt.registerTask('default', ['build', 'browserSync']);
  grunt.registerTask('build', ['html', 'css', 'js']);
  grunt.registerTask('js', ['concat', 'uglify']);
  grunt.registerTask('css', ['sass', 'scsslint', 'autoprefixer', 'cssmin']);
  grunt.registerTask('html', ['ect', 'copy', 'clean:ect']);

  grunt.registerTask('deploy', ['clean:all', 'html', 'css', 'js'])
};
