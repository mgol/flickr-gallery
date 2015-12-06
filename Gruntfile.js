'use strict';

const path = require('path');
const serveStatic = require('serve-static');

module.exports = grunt => {
    require('time-grunt')(grunt);

    // Lazily load all grunt tasks matching the `grunt-*` pattern.
    // Object syntax:
    //     taskName: 'grunt-task-name-package-name'
    require('jit-grunt')(grunt, {});

    grunt.initConfig({
        autoprefixer: {
            app: {
                options: {
                    browsers: [
                        'last 2 Chrome versions',
                        'last 2 Firefox versions',
                        'last 2 Edge versions',
                        'Safari >= 9',
                        'IE 11',

                        'iOS >= 7',
                        'last 2 ChromeAndroid versions',
                        'last 2 FirefoxAndroid versions',
                    ],
                    cascade: false,
                    map: true,

                    // Don't remove outdated prefixes from the source CSS; we're not putting them
                    // there anyway unless we know they're needed. Setting it to `false` speeds up
                    // the task a little.
                    remove: false,
                },
                files: {
                    'app/styles.css': ['app/styles-unprefixed.css'],
                },
            },
        },

        clean: {
            all: {
                src: [
                    'app/styles.scss',
                    'app/styles.css{,.map}',
                    'app/vendor/npm',
                    'app/index.html',

                    'test/unit/vendor/npm',
                ],
            },
        },

        connect: {
            options: {
                // Change this to 'localhost' to disable access to the server from outside.
                hostname: '0.0.0.0',
                port: 8500,
            },

            app: {
                options: {
                    middleware() {
                        return [
                            serveStatic(path.resolve('app')),
                        ];
                    },
                },
            },
        },

        eslint: {
            all: {
                src: [
                    '*.js',
                    'app/**/*.js',
                    '!app/vendor/**/*.js',
                    'test/unit/**/*.js',
                    '!test/unit/vendor/**/*.js',
                ],
            },
        },

        includeSource: {
            options: {
                basePath: 'app',
                baseUrl: '.',
                templates: {
                    html: {
                        js: '<script src="{filePath}"></script>',
                        css: '<link rel="stylesheet" href="{filePath}">',
                    },
                },
            },
            app: {
                files: {
                    'app/index.html': ['app/index-source.html'],
                },
            },
        },

        npmcopy: {
            options: {
                destPrefix: 'app/vendor/npm',
            },
            'angular-mocks': {
                options: {
                    destPrefix: 'test/unit/vendor/npm',
                },
                files: {
                    'angular-mocks.js': ['angular-mocks/angular-mocks.js'],
                },
            },
            angular: {
                files: {
                    'angular.js': ['angular/angular.js'],
                },
            },
        },

        sass: {
            options: {
                sourceMap: true,
                style: 'nested',
            },
            all: {
                files: {
                    'app/styles-unprefixed.css': 'app/styles.scss',
                },
            },
        },

        sassGenerateImports: {
            options: {
                baseDir: '../', // main project directory
            },

            app: {
                files: {
                    'app/styles.scss': [
                        'app/_core-imports.scss',
                        'app/modules/**/_*.scss',
                    ],
                },
            },
        },

        watch: {
            eslint: {
                files: '<%= eslint.all.src %>',
                tasks: ['newer:eslint:all'],
            },
            includeSource: {
                files: ['app/index-source.html'],
                tasks: ['includeSource'],
            },
            styles: {
                files: ['app/**/*.scss'],
                tasks: ['styles'],
            },
            livereload: {
                options: {
                    livereload: true,
                },
                files: [
                    '*',
                    'app/**/*',
                ],
                tasks: [], // without this parameter it doesn't work
            },
        },
    });

//    grunt.registerTask('fixSourceMap', () => {
//        const filepath = './dist/styles.css.map';
//        const map = grunt.file.readJSON(filepath);
//        map.sources = map.sources.map(source =>
//                source.replace(/\.\.\/\.\.\/src\/app\/styles\//, '')
//        );
//        grunt.file.write(filepath, JSON.stringify(map, null, 4));
//    });

    grunt.registerMultiTask('sassGenerateImports',
        'Generates an SCSS file importing all files matching patterns',
        function () {
            const baseDir = this.options().baseDir;
            let filesCount = 0;

            this.files.forEach(mapping => {
                let importString = '';

                grunt.file.expand(mapping.src).forEach(path => {
                    importString += `@import "${ baseDir + path }";\n`;
                });

                grunt.file.write(mapping.dest, importString);
                filesCount++;

                grunt.verbose.writeln(`Saved file ${ mapping.dest }.`);
            });

            grunt.log.ok(`Saved ${ filesCount } ${ filesCount === 1 ? 'file' : 'files' }.`);
        }
    );

    grunt.registerTask('lint', [
        'eslint',
    ]);

    grunt.registerTask('test', [
        'lint',
        'build',
        'karma',
    ]);

    grunt.registerTask('styles', [
        'sassGenerateImports',
        'sass',
        'autoprefixer',
//        'fixSourceMap',
    ]);

    grunt.registerTask('build', [
        'clean',
        'npmcopy',
        'styles',
        'includeSource',
    ]);

    grunt.registerTask('serve', [
        'clean',
        'lint',
        'build',
        'connect',
        'watch',
    ]);

    grunt.registerTask('default', [
        'lint',
        'build',
    ]);
};
