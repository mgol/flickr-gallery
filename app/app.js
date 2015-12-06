(function () {
    'use strict';

    angular
        .module('flickrGallery', [
            'fgConfig',
        ])

        .run(function (fgFlickrGalleryUrl) {
            console.log('App running! API URL: ' + fgFlickrGalleryUrl);
        });
})();
