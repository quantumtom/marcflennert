(function () {

    'use strict';

    module.exports = function (grunt) {

        var watchedFiles = [
            'sass/**/*',
            'fonts/**/*',
            'img/**/*',
            'js/**/*',
            '*.html',
            '*.json',
            '*.js',
            '!dist'
        ];

        var baseUrl = 'http://localhost:8000/';
        var testPath = baseUrl + 'test.html';
        var routesArr = ['about', 'contact', 'work'];

        function getTestFiles() {
            return routesArr.map(function(route) {
                return 'dist/test/html/' + route + '.html';
            });
        }

        function makeCommands() {
            return routesArr.map(function(route) {
                return 'phantomjs load_ajax.js http://localhost:5000/index.html#' + route + ' dist/test/html/' + route + '.html';
            });
        }

        /**
         * Grunt Tasks and Configurations
         */
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            copy: {
                build: {
                    expand: true,
                    src: [
                        'img/**',
                        'fonts/**',
                        'js/**/*',
                        'css/**/*',
                        'video/**/*'
                    ],
                    dest: 'dist'
                },
                all: {
                    expand: true,
                    src: [
                        '*.html',
                        'img/**',
                        'demo/**',
                        'fonts/**',
                        'js/**'
                    ],
                    dest: 'dist'
                },
                test: {
                    expand: true,
                    src: [
                        'test/*',
                        'js/rjsTest.js',
                        'js/rjsConfig.js',
                        'test.html'
                    ],
                    dest: 'dist'
                },
                /**
                 * Copies original source from src/js to build/js/src/js for source map debugging.
                 */
                src: {
                    files: [
                        {
                            expand: true,
                            src: '*.js',
                            dest: 'dist/js/src/js'
                        }
                    ]
                },
                other: {
                    files: [
                        {
                            expand: true,
                            src: [
                                'img/**',
                                'cache.manifest',
                                'favicon.ico'
                            ],
                            dest: 'dist/'
                        }
                    ]
                },
                js: {
                    files: [
                        {
                            expand: true,
                            src: '**',
                            dest: 'dist/js'
                        }
                    ]
                }
            },
            sass: {
                build: {
                    options: {
                        style: 'expanded'
                    },
                    files: {
                        'css/main.css': 'sass/main.scss'
                    }
                }
            },
            htmlmin: {
                build: {
                    options: {
                        removeComments: true,
                        collapseWhitespace: true
                    },
                    files: {
                        'dist/index.html': 'index.html'
                    }
                }
            },
            bootlint: {
                options: {
                    showallerrors: true,
                    stoponerror: false,
                    stoponwarning: false,
                    relaxerror: []
                },
                files: getTestFiles()
            },
            shell: {
                snapshots: {
                    command: makeCommands().join('&&')
                }
            },
            bump: {
                options: {
                    updateConfigs: ['pkg'],
                    commit: true,
                    commitMessage: 'Release v%VERSION%',
                    tagName: 'v%VERSION%',
                    tagMessage: 'Version %VERSION%',
                    push: true,
                    pushTo: 'origin',
                    gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                    globalReplace: false,
                    prereleaseName: false,
                    metadata: '',
                    regExp: false
                }
            },
            clean: {
                dist: {
                    src: [
                        'dist/**'
                    ]
                }
            },
            watch: {
                options: {
                    atBegin: true
                },
                build: {
                    files: watchedFiles,
                    tasks: [
                        'default'
                    ]
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-shell');
        grunt.loadNpmTasks('grunt-bootlint');
        grunt.loadNpmTasks('grunt-bump');

        /**
         * Alias tasks
         */

        grunt.registerTask('default', ['build']);

        grunt.registerTask('build', [
            'clean',
            'sass:build',
            'copy:build',
            'htmlmin:build'
        ]);

        grunt.registerTask('markup', ['shell:snapshots','bootlint']);

    };

}());
