(function () {
    'use strict';

    angular
        .module('fgSelectedPhotos', [])

        // The key used to store local data
        .constant('fgSelectedPhotosLocaleStorageKey', 'fg:selectedPhotos')

        .service('fgSelectedPhotosStorage',
            function ($window, fgSelectedPhotosLocaleStorageKey) {
                this.get = function () {
                    // Ensure the null prototype when getting.
                    return Object.assign(
                        Object.create(null),
                        JSON.parse($window.localStorage.getItem(fgSelectedPhotosLocaleStorageKey))
                    );
                };
                this.set = function (data) {
                    $window.localStorage.setItem(
                        fgSelectedPhotosLocaleStorageKey,
                        JSON.stringify(data)
                    );
                };
            }
        )

        .service('fgSelectedPhotos', function (fgSelectedPhotosStorage) {
            const photos = fgSelectedPhotosStorage.get();

            this.add = function (photo) {
                photos[photo.id] = photo;
                fgSelectedPhotosStorage.set(photos);
            };

            this.delete = function (photo) {
                delete photos[photo.id];
                fgSelectedPhotosStorage.set(photos);
            };

            this.has = function (photo) {
                return !!photos[photo.id];
            };

            this.getAll = function () {
                const photosArray = [];
                var id;

                for (id in photos) {
                    photosArray.push(photos[id]);
                }
                return photosArray;
            };

            this.getAllIds = function () {
                return Object.keys(photos);
            };
        });
})();
