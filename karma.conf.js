'use strict';

module.exports = function (config) {
    const preprocessors = config.preprocessors;
    // put JSON data into a mock
    preprocessors['**/*.json'] = 'ng-json2js';

    config.set({
        frameworks: ['jasmine'],

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // list of files / patterns to load in the browser
        files: [
            'app/vendor/npm/angular.js',
            'test/unit/vendor/npm/angular-mocks.js',

            'test/unit/mock-data/**/*.json',
            'app/lib/**/*.js',
            'app/modules/**/*.js',
            'test/unit/spec/**/*.js',
        ],

        // list of files to exclude
        exclude: [],

        preprocessors,

        // test results reporter to use
        // possible values: dots || progress || growl
        reporters: ['progress'],

        // web server port
        port: 9876,

        // cli runner port
        runnerPort: 9100,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - FirefoxDeveloperEdition
        // - FirefoxNightly
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // all browsers from customLaunchers keys (see below).
        browsers: ['Chrome', 'Firefox'],

        // Launchers for BrowserStack browsers.
        customLaunchers: require('./launchers.json'),

        browserStack: {
            project: require('./package.json').name,
            timeout: 600,

            // This could potentially be different for each build
            build: require('./package.json').name,
        },

        browserDisconnectTimeout: 10000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 20000,

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,
    });
};
