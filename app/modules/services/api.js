(function () {
    'use strict';

    angular
        .module('fgApi', [])

        .constant('fgConfigFlickrGalleryUrl',
            'https://api.flickr.com/services/feeds/photos_public.gne?' +
                'format=json&jsoncallback=JSON_CALLBACK')

        .factory('fgApi', function ($http, fgConfigFlickrGalleryUrl) {
            return {
                getData: function () {
                    return $http
                        .jsonp(fgConfigFlickrGalleryUrl)
                        .then(function (response) {
                            return response.data;
                        });
                },
            };
        });
})();
