'use strict';

module.exports = {
    options: {
        sourceMap: true,
        style: 'nested',
    },
    all: {
        files: {
            'app/styles-unprefixed.css': 'app/styles.scss',
        },
    },
};
