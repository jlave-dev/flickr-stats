import { getPhotos } from '../../src/utils/flickr';

describe('The Flickr module', () => {
    it('should export a function named getPhotos', () => {
        expect(getPhotos).toEqual(jasmine.any(Function));
    });

    describe('The getPhotos method', () => {
        it('should return a promise', () => {
            expect(getPhotos().then).toBeDefined();
        });
    });
});
