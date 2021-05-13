import createDBPhotoData from './create-db-photo-data';
import logger from '../utils/logger';
import { insertPhoto } from '../utils/db';
import { FlickrAPIPhoto } from '../types';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

async function updatePhoto(photo: FlickrAPIPhoto) {
    const dbPhoto = createDBPhotoData(photo);
    logger.info(`Trying to insert photo ${photo.id} or update it if it exists`);
    try {
        if (argv['dry-run']) {
            return logger.debug('Skipping database operation because argument --dry-run was passed');
        }
        await insertPhoto(dbPhoto);
    } catch (error) {
        logger.error(`Could not insert photo ${photo.id}: ${error}`);
        throw error;
    }
}

export default async function updatePhotos(photos: FlickrAPIPhoto[]): Promise<void> {
    for (const photo of photos) {
        await updatePhoto(photo);
    }
}
