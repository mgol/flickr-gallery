'use strict';

module.exports = {
    all: {
        src: [
            '*.json',

            'app/**/*.json',
            '!app/vendor/**/*.json',

            'test/**/*.json',
            '!test/unit/vendor/**/*.json',
        ],
    },
};
