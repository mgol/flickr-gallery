(function () {
    'use strict';

    angular
        .module('fgList', [
            'fgComponentize',
            'fgPhoto',
            'fgPhotosData',
            'fgSelectedPhotos',
        ])

        .directive('fgList', function (fgComponentize, fgPhotosData, fgSelectedPhotos) {
            return fgComponentize({
                name: 'fgList',
                templateUrl: '/modules/components/list/list.html',
                bindings: {},
                controller: function () {
                    var ctrl = this;

                    ctrl.photosData = fgSelectedPhotos.getAll();
                    const ids = fgSelectedPhotos.getAllIds();

                    fgPhotosData.getLatest()
                        .then(function (data) {
                            ctrl.photosData =
                                ctrl.photosData
                                    .concat(
                                        // Skip photos already selected
                                        data.filter(function (photo) {
                                            return ids.indexOf(photo.id) === -1;
                                        })
                                    );
                        })
                        .catch(function () {
                            ctrl.error = true;
                        });
                },
            });
        });
})();
