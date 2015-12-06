(function () {
    'use strict';

    angular
        .module('fgConfig', [])

        .constant('fgFlickrGalleryUrl',
            'https://api.flickr.com/services/feeds/photos_public.gne?format=json');
})();
