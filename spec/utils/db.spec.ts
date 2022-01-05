import * as db from '../../src/utils/db';
import { fakePhotos, fakePhotoSamples, fakeUsers, fakeUserSamples } from '../data/index';
import { Photo, PhotoSample, User, UserSample } from '../../src/sequelize';
import { IPhotoModel, IPhotoSample } from '../../src/types';

async function clearPhotos() {
    await Photo.destroy({ where: {} });
}

async function clearUsers() {
    await User.destroy({ where: {} });
}

async function clearPhotoSamples() {
    await PhotoSample.destroy({ where: {} });
}

async function clearUserSamples() {
    await UserSample.destroy({ where: {} });
}

describe('The DB module', () => {
    describe('The getPhotos method', () => {
        let photos;

        beforeAll(async () => {
            // Insert photos
            await Promise.all(fakePhotos.slice(0, 2).map(db.insertPhoto));
            photos = await db.getPhotos();
        });

        afterAll(async () => {
            await Promise.all([clearPhotos()]);
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

        beforeAll(async () => {
            await db.insertPhoto(fakePhotos[0]);
        });

        afterAll(async () => {
            await Promise.all([clearPhotos()]);
        });

        describe(`When the ID doesn't exist`, () => {
            beforeAll(async () => {
                photo = await db.getPhotoById('1');
            });

            it('should return null', () => {
                expect(photo).toBeNull();
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
            // Insert photo
            await db.insertPhoto(fakePhotos[0]);
            // Insert photo samples
            await Promise.all(fakePhotoSamples.slice(0, 2).map(db.insertPhotoSample));

            photoSamples = await db.getPhotoSamples();
        });

        afterAll(async () => {
            await Promise.all([clearPhotos(), clearPhotoSamples()]);
        });

        it('should exist', () => {
            expect(db.getPhotoSamples).toEqual(jasmine.any(Function));
        });

        it('should return an array with 2 photo samples', () => {
            expect(Array.isArray(photoSamples)).toBeTrue();
            expect(photoSamples.length).toBe(2);
        });
    });

    describe('The getUserSamples method', () => {
        let userSamples;
        let userId;

        beforeAll(async () => {
            // Insert user
            await db.insertUser(fakeUsers[0]);
            // Insert user samples
            await Promise.all(fakeUserSamples.map(db.insertUserSample));
        });

        afterAll(async () => {
            await Promise.all([clearUsers(), clearUserSamples()]);
        });

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
                expect(userSamples[0].sampled.toDateString()).toContain('Mon May 10 2021');
            });
        });
    });

    describe('The getPhotoSamplesByPhotoId method', () => {
        let photoSamples;

        beforeAll(async () => {
            // Insert photo
            await db.insertPhoto(fakePhotos[0]);
            // Insert photo samples
            await Promise.all(fakePhotoSamples.map(db.insertPhotoSample));
        });

        afterAll(async () => {
            await Promise.all([clearPhotos(), clearPhotoSamples()]);
        });

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

        beforeAll(async () => {
            // Insert photo
            await db.insertPhoto(fakePhotos[0]);
            // Insert photo samples
            await Promise.all(fakePhotoSamples.map(db.insertPhotoSample));
        });

        afterAll(async () => {
            await Promise.all([clearPhotos(), clearPhotoSamples()]);
        });

        it('should exist', () => {
            expect(db.getMostRecentPhotoSampleByPhotoId).toEqual(jasmine.any(Function));
        });

        describe(`When the photo ID doesn't exist`, () => {
            beforeAll(async () => {
                photoSample = await db.getMostRecentPhotoSampleByPhotoId('1');
            });

            it('should return null', () => {
                expect(photoSample).toBeNull();
            });
        });

        describe('When the photo ID does exist', () => {
            beforeAll(async () => {
                photoSample = await db.getMostRecentPhotoSampleByPhotoId('51124616241');
            });

            it('should return an object with the most recent sampled date', () => {
                expect(photoSample).toEqual(jasmine.any(Object));
                expect(photoSample.sampled).toEqual(new Date('2021-04-24T16:41:33.084Z'));
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
                await db.insertPhoto(fakePhoto);
            });

            afterAll(async () => {
                await Photo.destroy({ where: { id: fakePhoto.id } });
            });

            it('should update the existing row', async () => {
                fakePhoto.title = `I Don't Paint Flowers`;
                await db.insertPhoto(fakePhoto);
                const updatedPhoto = await db.getPhotoById(fakePhoto.id);
                expect(updatedPhoto).not.toBeNull();
                expect((<IPhotoModel>updatedPhoto).title).toEqual(fakePhoto.title);
            });
        });

        describe('When the photo does not exist', () => {
            let fakePhoto;

            beforeAll(async () => {
                fakePhoto = { ...fakePhotos[2] };
            });

            afterAll(async () => {
                await Photo.destroy({ where: { id: fakePhoto.id } });
            });

            it('should create a new row', async () => {
                await db.insertPhoto(fakePhoto);
                const newPhoto = await db.getPhotoById(fakePhoto.id);
                expect(newPhoto).not.toBeNull();
                expect((<IPhotoModel>newPhoto).title).toEqual(fakePhoto.title);
            });
        });
    });

    describe('The insertPhotoSample method', () => {
        it('should exist', () => {
            expect(db.insertPhotoSample).toEqual(jasmine.any(Function));
        });

        describe('When the photo sample already exists', () => {
            const fakePhotoSample = fakePhotoSamples[0];

            beforeAll(async () => {
                // Insert photo
                await db.insertPhoto(fakePhotos[0]);
                // Insert photo sample
                await db.insertPhotoSample(fakePhotoSample);
            });

            afterAll(async () => {
                await Promise.all([clearPhotos(), clearPhotoSamples()]);
            });

            it('should throw an error', async () => {
                await expectAsync(db.insertPhotoSample(fakePhotoSample)).toBeRejected();
            });
        });

        describe('When the photo sample does not exist', () => {
            const fakePhotoSample = fakePhotoSamples[0];

            beforeAll(async () => {
                // Insert photo
                await db.insertPhoto(fakePhotos[0]);
            });

            afterAll(async () => {
                await Promise.all([clearPhotos(), clearPhotoSamples()]);
            });

            it('should create a new row', async () => {
                await db.insertPhotoSample(fakePhotoSample);
                const newPhotoSample = await PhotoSample.findOne({ where: { id: fakePhotoSample.id } });
                expect(newPhotoSample).not.toBeNull();
                expect((<IPhotoSample>newPhotoSample).id).toEqual(fakePhotoSample.id);
            });
        });
    });
});
