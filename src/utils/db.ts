import knex from 'knex';
import { DBPhoto, PhotoSample } from '../sampler/types';

if (!process.env.SQLITE_FILE) {
    throw new Error('Cannot connect to database: SQLITE_FILE not found in environment.');
}

export const pool = knex({
    client: 'sqlite3',
    connection: {
        filename: process.env.SQLITE_FILE,
    },
});

export async function getPhotos(): Promise<DBPhoto[]> {
    return pool.select().from('photos');
}

export async function getPhotoById(id: string): Promise<DBPhoto> {
    return pool.first().from('photos').where({ id });
}

export async function getPhotoSamples(): Promise<PhotoSample[]> {
    return pool.select().from('photo_samples');
}

export async function getPhotoSampleById(id: string): Promise<PhotoSample> {
    return pool.first().from('photo_samples').where({ id });
}

export async function getMostRecentPhotoSampleById(id: string): Promise<Pick<PhotoSample, 'sampled'> | undefined> {
    return pool.first('sampled').from('photo_samples').where({ photo_id: id }).orderBy('sampled', 'desc');
}

export async function insertPhoto(photo: DBPhoto): Promise<number[]> {
    return pool.insert(photo).into('photos').onConflict('id').merge();
}

export async function insertPhotoSample(photoSample: PhotoSample): Promise<number[]> {
    return pool.insert(photoSample).into('photo_samples');
}
