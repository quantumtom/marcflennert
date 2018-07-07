(function () {

    'use strict';

    module.exports = function (grunt) {

        var watchedFiles = [
            'css/**/*',
            'fonts/**/*',
            'img/**/*',
            'js/**/*',
            '*.html',
            '*.json',
            '*.js',
            '!dist'
        ];

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
                 * Copies original source from public/js to build/js/public/js for source map debugging.
                 */
                src: {
                    files: [
                        {
                            expand: true,
                            src: '*.js',
                            dest: 'dist/js/public/js'
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
            cssmin: {
                options: {
                    shorthandCompacting: false,
                    roundingPrecision: -1
                },
                build: {
                    files: {
                        'dist/css/main.css': ['css/*.css']
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
                files: 'index.html'
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
        grunt.loadNpmTasks('grunt-shell');
        grunt.loadNpmTasks('grunt-bootlint');
        grunt.loadNpmTasks('grunt-bump');

        /**
         * Alias tasks
         */

        grunt.registerTask('default', ['build']);

        grunt.registerTask('build', [
            'clean',
            'copy:build',
            'cssmin:build',
            'htmlmin:build'
        ]);

    };

}());
