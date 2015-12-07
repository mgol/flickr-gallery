(function () {
    'use strict';

    angular
        .module('fgPhoto', [
            'fgComponentize',
            'fgSelectedPhotos',
        ])

        .directive('fgPhoto', function (fgComponentize, fgSelectedPhotos) {
            return fgComponentize({
                name: 'fgPhoto',
                templateUrl: '/modules/components/photo/photo.html',
                bindings: {
                    id: '=',
                    title: '=',
                    url: '=',
                },
                controller: function () {
                    const photo = {
                        id: this.id,
                        title: this.title,
                        url: this.url,
                    };

                    this.selected = fgSelectedPhotos.has(photo);

                    this.toggleSelection = function toggleSelection() {
                        this.selected = !this.selected;
                        if (this.selected) {
                            fgSelectedPhotos.add(photo);
                        } else {
                            fgSelectedPhotos.delete(photo);
                        }
                    };
                },
            });
        });
})();
