import * as db from '../src/db.js';

const { shouldSamplePhoto } = db;

describe('The DB Module', () => {
    let knexSpy;
    let knexMock;

    describe('The shouldSamplePhoto method', () => {
        let fakePhoto;

        beforeEach(() => {
            fakePhoto = { id: '123456' };

            knexMock = {
                select: () => knexMock,
                from: () => knexMock,
                where: () => knexMock,
                orderBy: () => new Promise((resolve) => resolve()),
            };

            knexSpy = spyOn(db, 'knex').and.returnValue(knexMock);
        });

        it('should be defined', () => {
            expect(shouldSamplePhoto).toBeDefined();
        });

        describe('When no samples are returned', () => {
            beforeEach(() => {
                knexMock.orderBy = () => new Promise((resolve) => resolve([]));
            });

            it('should return true', async () => {
                expect(await shouldSamplePhoto(fakePhoto)).toBeTrue();
            });
        });

        describe('When one or more samples are returned', () => {
            describe('When the first sample has the same date as now', () => {
                beforeEach(async () => {
                    knexMock.orderBy = () =>
                        new Promise((resolve) =>
                            resolve([
                                { sampled: new Date().toISOString() },
                                { sampled: new Date().toISOString() },
                            ]),
                        );
                });

                it('should return false', async () => {
                    expect(await shouldSamplePhoto(fakePhoto)).toBeFalse();
                });
            });
        });
    });
});
