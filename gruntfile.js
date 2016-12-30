module.exports = function(grunt) {

    // 1. All configuration goes here 
     grunt.initConfig({
       pkg: grunt.file.readJSON('package.json'), 
         
        sass: {
            options: { 
                style: 'expanded',  //Default: nested Values: nested, expanded, compact, compressed
                sourcemap: 'none',
            },
            dist: {
                files: [
                  {
                    expand: true,     // Enable dynamic expansion.
                    cwd: 'assets/css/sass/',      // Src matches are relative to this path.
                    src: ['**/*.scss'], // Actual pattern(s) to match.
                    dest: 'assets/processed/css/',   // Destination path prefix.
                    ext: '.css'//,   // Dest filepaths will have this extension.
                    //extDot: 'first'   // Extensions in filenames begin after the first dot
                  },
                ],
            }
        },  
        // cssmin: {
        //   target: {
        //     files: [{
        //       expand: true,
        //       cwd: 'assets/processed/css',
        //       src: ['*.css', '!*.min.css'],
        //       dest: 'assets/build/css',
        //       ext: '.min.css'
        //     }]
        //   }
        // },
        postcss: {
          options: {
            //map: true, // inline sourcemaps
            // or
            map: {
                inline: false, // save all sourcemaps as separate files...
                annotation: 'assets/processed/css/maps/' // ...to the specified directory
            },

            processors: [
              require('pixrem')(), // add fallbacks for rem units
              //require('autoprefixer')({browsers: ['> 1%', 'IE > 7']}), // last 2 versions  add vendor prefixes
              require('autoprefixer')({browsers: [
                                                  '> 5%', 
                                                  'last 2 versions', 
                                                  'firefox > 45', 
                                                  'IE > 7',
                                                  'Safari >=8'
                                                ]}),  
              require('cssnano')() // minify the result
            ]
          }, 
          target: {
            files: [{
              expand: true,
              cwd: 'assets/processed/css',
              src: ['*.css', '!*.min.css'],
              dest: 'assets/build/css',
              ext: '.min.css'
            }]
          }
        },


        concat: {   
            dist: {
                files:[
                 //  { src: [ 'assets/js/dev/*.js' // All JS in the  folder     bn-cartridges
                 //   ], dest: 'assets/processed/js/dev.js' },
                    {src: [ 'assets/js/bn-cartridges/*.js' ], dest: 'assets/processed/js/bn-cartridges-js.js'},
                ],
            }, 
        },
        jshint: {
            options: { //jshint.com/docs/options/ 
              "curly": true,
              "eqnull": true,
              "eqeqeq": true,
              "undef": false,
              "sub": true,  // supress warnings about: person['name'] vs. person.name
              "globals": {
                "jQuery": true
              }
            },
            // See: http://www.jshint.com/docs/   // See: http://jshint.com/docs/options/
             // globalstrict: false,
            beforeconcat: [ 
                    'assets/js/bn-cartridges/*.js'/*, // All JS in the libs folder
                    'assets/js/cms/*.js', // This specific file */
                    ],
            afterconcat: ['assets/processed/js/*.js']
        },
        uglify: {
          build: {
            files:[
                { src: 'assets/processed/js/bn-cartridges-js.js', dest: 'assets/build/js/bn-cartridges-js.min.js'},
                {  
                  expand: true,
                  cwd: 'assets/js/dev',
                  src: ['*.js', '!*.min.js'],
                  dest: 'assets/build/js',
                  ext: '.min.js'
                },
            ],
          } 
        },
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['assets/js/app/*.js','assets/js/**/*.js'],
                tasks: ['concat','jshint', 'uglify'],
                options: {
                    spawn: false,
                    livereload: true
                },
            },
            css: {
                files: ['assets/css/sass/**/*.scss'],
                tasks: ['sass','postcss'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }   
        },
        browserSync: {
            devfault_options: {
                bsFiles: {
                    src : [
                        'assets/processed/css/*.css',
                        "*.html"
                    ]
                },
                options: {
                    watchTask: true, 
                    server: {
                        baseDir: "./",
                        directory: true
                    }
                }
            }
        } 

 

    });

  // 3. Where we tell Grunt we plan to use this plug-in. 
    // grunt.loadNpmTasks('grunt-postcss'); 
    // grunt.loadNpmTasks('grunt-contrib-csslint');
    //npm install grunt-postcss --save-dev
    //npm install grunt-postcss autoprefixer-core csswring

   // grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
   // grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-browser-sync');

// grunt.loadNpmTasks('grunt-git');


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal. 
    grunt.registerTask('default', [//'compass',
      'sass',
      'postcss',
      'concat',
      'jshint',
      'uglify'
      ]);  

    // this would be run by typing "grunt local" on the command line
     grunt.registerTask('local', ['browserSync','watch']);
    // this would be run by typing "grunt test" on the command line
     grunt.registerTask('test', ['browserSync','watch']);




};


// Reference links:
//http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions-

//http://24ways.org/2013/grunt-is-not-weird-and-hard/

//http://gruntjs.com/installing-grunt

// http://jshint.com/docs/options/

//http://blakehaswell.com/post/42407766402/happy-coding-using-grunt



