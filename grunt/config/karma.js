'use strict';

const _ = require('lodash');

// Set higher timeouts, remote connections can be flaky.
const largeTimeouts = {
    browserDisconnectTimeout: 3e5,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 3e5,
    captureTimeout: 3e5,
};

// Allow to pass custom browsers via setting the `BROWSERS` environmental variable.
let remoteSettings;
if (process.env.BROWSERS) {
    remoteSettings = _.assign({}, largeTimeouts, {
        browsers: process.env.BROWSERS.split(','),
    });
}

const jenkinsSettings = {
    configFile: 'karma-prod.conf.js',
    reporters: ['dots', 'junit'],
    junitReporter: {
        outputFile: 'test-results.xml',
    },
};

module.exports = {
    jenkinsLocal: _.assign({}, jenkinsSettings, remoteSettings),

    jenkins: _.assign({}, jenkinsSettings, largeTimeouts, {
        browsers: ['BS_Chrome', 'BS_Firefox', 'BS_Safari', 'BS_IE_11', 'BS_Edge_12'],
        // We should use config.LOG_DEBUG here but we don't have access to the `config`
        // object and `config.LOG_DEBUG === 'DEBUG'` anyway...
        logLevel: 'DEBUG',
    }, remoteSettings),

    backgroundUnit: _.assign({
        background: true,
        browsers: ['Chrome'],
        configFile: 'karma.conf.js',
        runnerPort: 9999,
        singleRun: false,
    }, remoteSettings),

    unit: _.assign({
        configFile: 'karma.conf.js',
    }, remoteSettings),
};
