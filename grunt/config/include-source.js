'use strict';

module.exports = {
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
};
