describe('Module: fgPhotosData', function () {
    'use strict';

    beforeEach(module('fgPhotosData'));
    beforeEach(module('test/unit/mock-data/flickr-api.json'));

    var $httpBackend, $rootScope;
    beforeEach(inject(function (_$httpBackend_, _$rootScope_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));

    describe('Service: fgPhotosData', function () {
        var fgPhotosData, testUnitMockDataFlickrApi;
        beforeEach(inject(function (_fgPhotosData_, _testUnitMockDataFlickrApi_,
                                    fgConfigFlickrGalleryUrl) {
            fgPhotosData = _fgPhotosData_;
            testUnitMockDataFlickrApi = _testUnitMockDataFlickrApi_;

            $httpBackend
                .whenJSONP(fgConfigFlickrGalleryUrl)
                .respond(200, testUnitMockDataFlickrApi);
        }));

        describe('getLatest', function () {
            it('should return a promise', function () {
                expect(typeof fgPhotosData.getLatest().then).toBe('function');
            });

            describe('results', function () {
                var results;
                beforeEach(function () {
                    fgPhotosData.getLatest().then(function (data) {
                        results = data;
                    });
                    $rootScope.$digest();
                    $httpBackend.flush();
                });

                it('should return an array', function () {
                    expect(Array.isArray(results)).toBe(true);
                });

                it('should attach only the fields id, title & url on every item', function () {
                    var counter = 0;
                    var entry;

                    for (entry of results) {
                        expect(entry.id).toBeDefined();
                        expect(entry.title).toBeDefined();
                        expect(entry.url).toBeDefined();
                        expect(Object.keys(entry).length).toBe(3);
                        counter++;
                    }
                    expect(counter).toBe(results.length);
                });
            });
        });
    });
});
