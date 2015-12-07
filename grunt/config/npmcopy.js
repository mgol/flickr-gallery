'use strict';

module.exports = {
    options: {
        destPrefix: 'app/vendor/npm',
    },
    'angular-mocks': {
        options: {
            destPrefix: 'test/unit/vendor/npm',
        },
        files: {
            'angular-mocks.js': ['angular-mocks/angular-mocks.js'],
        },
    },
    angular: {
        files: {
            'angular.js': ['angular/angular.js'],
        },
    },
};
