(function () {
    'use strict';

    angular
        .module('fgList', [
            'fgComponentize',
            'fgPhoto',
            'fgPhotosData',
        ])

        .directive('fgList', function (fgComponentize, fgPhotosData) {
            return fgComponentize({
                name: 'fgList',
                templateUrl: '/modules/components/list/list.html',
                bindings: {},
                controller: function () {
                    const ctrl = this;

                    fgPhotosData.getLatest()
                        .then(function (data) {
                            ctrl.photosData = data;
                        })
                        .catch(function () {
                            ctrl.error = true;
                        });
                },
            });
        });
})();
