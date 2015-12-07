describe('Module: fgPhotosData', function () {
    'use strict';

    beforeEach(module('fgPhotosData'));
    beforeEach(module('test/unit/mock-data/flickr-api.json'));

    let $httpBackend, $rootScope;
    beforeEach(inject(function (_$httpBackend_, _$rootScope_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));

    describe('Service: fgPhotosData', function () {
        let fgPhotosData, testUnitMockDataFlickrApi;
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
                let results;
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
                    let counter = 0;
                    for (let entry of results) {
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
