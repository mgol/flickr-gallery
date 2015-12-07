'use strict';

module.exports = {
    all: {
        src: [
            '*.js',

            'app/**/*.js',
            '!app/vendor/**/*.js',

            'grunt/**/*.js',

            'test/unit/**/*.js',
            '!test/unit/vendor/**/*.js',
        ],
    },
};
