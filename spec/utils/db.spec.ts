import * as db from '../../src/utils/db';
import fakePhotos from '../data/photos';
import fakePhotoSamples from '../data/photo-samples';
import fakeUserSamples from '../data/user-samples';

describe('The DB module', () => {
    beforeAll(async () => {
        for (const fakePhoto of fakePhotos.slice(0, 2)) {
            await db.pool.insert(fakePhoto).into('photos');
        }
        for (const fakePhotoSample of fakePhotoSamples.slice(0, 4)) {
            await db.pool.insert(fakePhotoSample).into('photo_samples');
        }
        for (const fakeUserSample of fakeUserSamples.slice(0, 4)) {
            await db.pool.insert(fakeUserSample).into('user_samples');
        }
    });

    afterAll(async () => {
        await db.pool.delete().from('photos');
        await db.pool.delete().from('photo_samples');
        await db.pool.delete().from('user_samples');
    });

    describe('The getPhotos method', () => {
        let photos;

        beforeAll(async () => {
            photos = await db.getPhotos();
        });

        it('should exist', () => {
            expect(db.getPhotos).toEqual(jasmine.any(Function));
        });

        it('should return an array with 2 photos', () => {
            expect(Array.isArray(photos)).toBeTrue();
            expect(photos.length).toBe(2);
        });
    });

    describe('The getPhotoById method', () => {
        let photo;

        describe(`When the ID doesn't exist`, () => {
            beforeAll(async () => {
                photo = await db.getPhotoById('1');
            });

            it('should return undefined', () => {
                expect(photo).toBeUndefined();
            });
        });

        describe('When the ID does exist', () => {
            beforeAll(async () => {
                photo = await db.getPhotoById('51124616241');
            });

            it('should return the photo', () => {
                expect(photo).toEqual(jasmine.any(Object));
                expect(photo.id).toBe('51124616241');
            });
        });
    });

    describe('The getPhotoSamples method', () => {
        let photoSamples;

        beforeAll(async () => {
            photoSamples = await db.getPhotoSamples();
        });

        it('should exist', () => {
            expect(db.getPhotoSamples).toEqual(jasmine.any(Function));
        });

        it('should return an array with 4 photo samples', () => {
            expect(Array.isArray(photoSamples)).toBeTrue();
            expect(photoSamples.length).toBe(4);
        });
    });

    describe('The getUserSamples method', () => {
        let userSamples;
        let userId;

        it('should exist', () => {
            expect(db.getOrderedUserSamples).toEqual(jasmine.any(Function));
        });

        describe('When a user ID is passed', () => {
            beforeAll(async () => {
                userId = '187126842@N07';
                userSamples = await db.getOrderedUserSamples(userId);
            });

            it('should return an array with 3 user samples', () => {
                expect(Array.isArray(userSamples)).toBeTrue();
                expect(userSamples.length).toBe(3);
            });

            it('the first sample should be the most recent', () => {
                expect(userSamples[0].sampled).toContain('2021-05-10');
            });
        });
    });

    describe('The getPhotoSamplesByPhotoId method', () => {
        let photoSamples;

        it('should exist', () => {
            expect(db.getPhotoSamplesByPhotoId).toEqual(jasmine.any(Function));
        });

        describe(`When the photo ID doesn't exist`, () => {
            beforeAll(async () => {
                photoSamples = await db.getPhotoSamplesByPhotoId('1');
            });

            it('should return an empty array', () => {
                expect(photoSamples).toEqual(jasmine.any(Array));
                expect(photoSamples.length).toEqual(0);
            });
        });

        describe('When the photo ID does exist', () => {
            beforeAll(async () => {
                photoSamples = await db.getPhotoSamplesByPhotoId('51124616241');
            });

            it('should return an array of 2 photo samples', () => {
                expect(photoSamples).toEqual(jasmine.any(Array));
                expect(photoSamples.length).toEqual(2);
            });
        });
    });

    describe('The getMostRecentPhotoSampleByPhotoId method', () => {
        let photoSample;

        it('should exist', () => {
            expect(db.getMostRecentPhotoSampleByPhotoId).toEqual(jasmine.any(Function));
        });

        describe(`When the photo ID doesn't exist`, () => {
            beforeAll(async () => {
                photoSample = await db.getMostRecentPhotoSampleByPhotoId('1');
            });

            it('should return undefined', () => {
                expect(photoSample).toBeUndefined();
            });
        });

        describe('When the photo ID does exist', () => {
            beforeAll(async () => {
                photoSample = await db.getMostRecentPhotoSampleByPhotoId('51124616241');
            });

            it('should return an object with the most recent sampled date', () => {
                expect(photoSample).toEqual(jasmine.any(Object));
                expect(photoSample.sampled).toEqual('2021-04-24T16:41:33.084Z');
            });
        });
    });

    describe('The insertPhoto method', () => {
        it('should exist', () => {
            expect(db.insertPhoto).toEqual(jasmine.any(Function));
        });

        describe('When the photo already exists', () => {
            let fakePhoto;

            beforeAll(async () => {
                fakePhoto = { ...fakePhotos[2] };
                await db.pool.insert(fakePhoto).into('photos');
            });

            afterAll(async () => {
                await db.pool.delete().from('photos').where({ id: fakePhoto.id });
            });

            it('should update the existing row', async () => {
                fakePhoto.title = `I Don't Paint Flowers`;
                await db.insertPhoto(fakePhoto);
                const updatedPhoto = await db.getPhotoById(fakePhoto.id);
                expect(updatedPhoto.title).toEqual(fakePhoto.title);
            });
        });

        describe('When the photo does not exist', () => {
            let fakePhoto;

            beforeAll(async () => {
                fakePhoto = { ...fakePhotos[2] };
            });

            afterAll(async () => {
                await db.pool.delete().from('photos').where({ id: fakePhoto.id });
            });

            it('should create a new row', async () => {
                await db.insertPhoto(fakePhoto);
                const newPhoto = await db.getPhotoById(fakePhoto.id);
                expect(newPhoto.title).toEqual(fakePhoto.title);
            });
        });
    });

    describe('The insertPhotoSample method', () => {
        it('should exist', () => {
            expect(db.insertPhotoSample).toEqual(jasmine.any(Function));
        });

        describe('When the photo sample already exists', () => {
            let fakePhotoSample;

            beforeAll(async () => {
                fakePhotoSample = { ...fakePhotoSamples[4] };
                await db.pool.insert(fakePhotoSample).into('photo_samples');
            });

            afterAll(async () => {
                await db.pool.delete().from('photo_samples').where({ id: fakePhotoSample.id });
            });

            it('should throw an error', async () => {
                await expectAsync(db.insertPhotoSample(fakePhotoSample)).toBeRejected();
            });
        });

        describe('When the photo does not exist', () => {
            let fakePhotoSample;

            beforeAll(async () => {
                fakePhotoSample = { ...fakePhotoSamples[4] };
            });

            afterAll(async () => {
                await db.pool.delete().from('photo_samples').where({ id: fakePhotoSample.id });
            });

            it('should create a new row', async () => {
                await db.insertPhotoSample(fakePhotoSample);
                const newPhotoSample = await db.pool.first().from('photo_samples').where({ id: fakePhotoSample.id });
                expect(newPhotoSample.id).toEqual(fakePhotoSample.id);
            });
        });
    });
});
