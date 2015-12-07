'use strict';

module.exports = {
    eslint: {
        files: '<%= eslint.all.src %>',
        tasks: ['newer:eslint:all'],
    },
    includeSource: {
        files: ['app/index-source.html'],
        tasks: ['includeSource'],
    },
    jsonlint: {
        files: '<%= jsonlint.all.src %>',
        tasks: ['newer:jsonlint:all'],
    },
    karma: {
        files: [
            'app/vendor/**/*.js',
            'app/modules/**/*.js',
            'test/unit/**/*.js',
        ],
        tasks: ['karma:backgroundUnit:run'],
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
};
