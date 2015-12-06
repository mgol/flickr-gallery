(function () {
    'use strict';

    angular
        .module('fgComponentize', [])

        // A helper making it easier to migrate to Angular 1.5 in the future.
        // See https://github.com/angular/angular.js/commit/54e816552f20e198e14f849cdb2379fed8570c1a
        .constant('fgComponentize', function (options) {
            return {
                controller: options.controller || function () {},
                controllerAs: options.name,
                templateUrl: options.templateUrl,
                transclude: options.transclude === undefined ? true : options.transclude,
                scope: options.isolate === false ? true : {},
                bindToController: options.bindings || {},
                restrict: options.restrict || 'E',
            };
        });
})();
