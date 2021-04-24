import * as db from '../../src/utils/db';
import shouldSamplePhoto from '../../src/sampler/should-sample-photo';

describe('The shouldSamplePhoto function', () => {
    let fakePhoto;
    let getMostRecentPhotoSampleByIdSpy;

    beforeEach(() => {
        fakePhoto = { id: '123' };
        getMostRecentPhotoSampleByIdSpy = spyOn(db, 'getMostRecentPhotoSampleById');
    });

    it('should be a function', () => {
        expect(shouldSamplePhoto).toEqual(jasmine.any(Function));
    });

    it('should return a promise', () => {
        expect(shouldSamplePhoto(fakePhoto).then).toBeDefined();
    });

    describe('When there is not a recent sample for a photo', () => {
        beforeEach(() => {
            getMostRecentPhotoSampleByIdSpy.and.resolveTo(undefined);
        });

        it('should return true', async () => {
            expect(await shouldSamplePhoto(fakePhoto)).toBeTrue();
        });
    });

    describe('When there is a recent sample for a photo', () => {
        describe('When the sample date matches the current date', () => {
            beforeEach(() => {
                const sampled = new Date().toISOString();
                getMostRecentPhotoSampleByIdSpy.and.resolveTo({ sampled });
            });

            it('should return false', async () => {
                expect(await shouldSamplePhoto(fakePhoto)).toBeFalse();
            });
        });

        describe('When the sample date does not match the current date', () => {
            beforeEach(() => {
                const sampled = new Date('2021-01-01').toISOString();
                getMostRecentPhotoSampleByIdSpy.and.resolveTo({ sampled });
            });

            it('should return true', async () => {
                expect(await shouldSamplePhoto(fakePhoto)).toBeTrue();
            });
        });
    });
});
