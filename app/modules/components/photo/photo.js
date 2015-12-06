(function () {
    'use strict';

    angular
        .module('fgPhoto', [
            'fgComponentize',
        ])

        .directive('fgPhoto', function (fgComponentize) {
            return fgComponentize({
                name: 'fgPhoto',
                templateUrl: '/modules/components/photo/photo.html',
                bindings: {
                    id: '=',
                    title: '=',
                    url: '=',
                },
                controller: function () {
                    this.toggleSelection = function toggleSelection() {
                        this.selected = !this.selected;
                    };
                },
            });
        });
})();
