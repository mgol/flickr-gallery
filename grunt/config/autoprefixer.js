'use strict';

module.exports = {
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
};
