describe('Module: fgSelectedPhotos', function () {
    'use strict';

    beforeEach(module('fgSelectedPhotos'));
    beforeEach(module('test/unit/mock-data/flickr-api.json'));

    describe('Service: fgSelectedPhotos', function () {
        var storage = 'null';
        beforeEach(module(function ($provide) {
            $provide.service('fgSelectedPhotosStorage', function () {
                this.get = function () {
                    return Object.assign(
                        Object.create(null),
                        JSON.parse(storage)
                    );
                };
                this.set = function (data) {
                    storage = JSON.stringify(data);
                };
            });
        }));

        var fgSelectedPhotos;
        beforeEach(inject(function (_fgSelectedPhotos_) {
            fgSelectedPhotos = _fgSelectedPhotos_;
        }));

        it('should add a photo and report it in `getAll()`', function () {
            fgSelectedPhotos.add({
                id: '42',
                title: 'Foo',
                url: 'http://example.com/foo',
            });
            fgSelectedPhotos.add({
                id: '66',
                title: 'Bar',
                url: 'http://example.com/bar',
            });
            var photos = fgSelectedPhotos.getAll();

            expect(photos.length).toBe(2);

            var photo1 = photos[0].id === '42' ? photos[0] : photos[1];
            var photo2 = photos[0].id === '42' ? photos[1] : photos[0];

            expect(photo1.title).toBe('Foo');
            expect(photo2.title).toBe('Bar');
        });

        it('should remove a photo', function () {
            fgSelectedPhotos.add({
                id: '42',
                title: 'Foo',
                url: 'http://example.com/foo',
            });
            fgSelectedPhotos.add({
                id: '66',
                title: 'Bar',
                url: 'http://example.com/bar',
            });
            fgSelectedPhotos.delete({
                id: '42',
                title: 'Foo',
                url: 'http://example.com/foo',
            });
            var photos = fgSelectedPhotos.getAll();

            expect(photos.length).toBe(1);
            expect(photos[0].title).toBe('Bar');
        });

        it('should report if a photo is saved', function () {
            fgSelectedPhotos.add({
                id: '42',
                title: 'Foo',
                url: 'http://example.com/foo',
            });
            fgSelectedPhotos.add({
                id: '66',
                title: 'Bar',
                url: 'http://example.com/bar',
            });
            fgSelectedPhotos.delete({
                id: '42',
                title: 'Foo',
                url: 'http://example.com/foo',
            });

            expect(fgSelectedPhotos.has({
                id: '42',
                title: 'Foo',
                url: 'http://example.com/foo',
            })).toBe(false);

            expect(fgSelectedPhotos.has({
                id: '66',
                title: 'Bar',
                url: 'http://example.com/bar',
            })).toBe(true);
        });

        it('should report ids of added photos', function () {
            var allIds;

            fgSelectedPhotos.add({
                id: '42',
                title: 'Foo',
                url: 'http://example.com/foo',
            });
            fgSelectedPhotos.add({
                id: '66',
                title: 'Bar',
                url: 'http://example.com/bar',
            });
            allIds = fgSelectedPhotos.getAllIds();
            expect(allIds.sort(function (a, b) {
                return Math.sign(a - b);
            })).toEqual(['42', '66']);

            fgSelectedPhotos.delete({
                id: '42',
                title: 'Foo',
                url: 'http://example.com/foo',
            });
            allIds = fgSelectedPhotos.getAllIds();
            expect(allIds).toEqual(['66']);
        });
    });
});
