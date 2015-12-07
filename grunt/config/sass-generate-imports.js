'use strict';

module.exports = {
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
};
