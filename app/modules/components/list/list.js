(function () {
    'use strict';

    angular
        .module('fgList', [
            'fgComponentize',
            'fgGetPhotosData',
            'fgPhoto',
        ])

        .directive('fgList', function (fgComponentize, fgGetPhotosData) {
            return fgComponentize({
                name: 'fgList',
                templateUrl: '/modules/components/list/list.html',
                bindings: {},
                controller: function () {
                    const ctrl = this;

                    fgGetPhotosData()
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
