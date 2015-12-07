'use strict';

module.exports = grunt => {
    require('time-grunt')(grunt);

    // Lazily load all grunt tasks matching the `grunt-*` pattern.
    // Object syntax:
    //     taskName: 'grunt-task-name-package-name'
    require('jit-grunt')(grunt, {});

    grunt.initConfig({
        autoprefixer: require('./grunt/config/autoprefixer'),
        clean: require('./grunt/config/clean'),
        connect: require('./grunt/config/connect'),
        eslint: require('./grunt/config/eslint'),
        includeSource: require('./grunt/config/include-source'),
        jsonlint: require('./grunt/config/jsonlint'),
        karma: require('./grunt/config/karma'),
        npmcopy: require('./grunt/config/npmcopy'),
        sass: require('./grunt/config/sass'),
        sassGenerateImports: require('./grunt/config/sass-generate-imports'),
        watch: require('./grunt/config/watch'),
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
        'jsonlint',
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
        'karma:backgroundUnit',
        'watch',
    ]);

    grunt.registerTask('default', [
        'lint',
        'build',
    ]);
};
