'use strict';

const path = require('path');
const serveStatic = require('serve-static');

module.exports = {
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
};
