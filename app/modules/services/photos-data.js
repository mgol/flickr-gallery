(function () {
    'use strict';

    angular
        .module('fgPhotosData', [
            'fgApi',
        ])

        .service('fgPhotosData', function (fgApi) {
            this.getLatest = function () {
                return fgApi
                    .getData()
                    .then(function (data) {
                        return data.items
                            .map(function (item) {
                                return {
                                    // Post link is unique so we can treat it as
                                    // an ID of the photo object.
                                    id: item.link,

                                    // For accessibility purposes.
                                    title: item.title,

                                    url: item.media.m,
                                };
                            });
                    });
            };
        });
})();
