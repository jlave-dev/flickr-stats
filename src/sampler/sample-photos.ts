import createPhotoSampleData from './create-photo-sample-data';
import logger from '../utils/logger';
import { insertPhotoSample } from '../utils/db';
import shouldSamplePhoto from './should-sample-photo';
import { FlickrAPIPhoto } from './types';

async function samplePhoto(photo: FlickrAPIPhoto) {
    const photoSample = createPhotoSampleData(photo);
    logger.info(`Trying to insert photo sample ${photoSample.id} for photo ${photo.id}`);
    try {
        if (!(await shouldSamplePhoto(photo))) {
            return logger.warn(`Photo ${photo.id} has already been sampled today. Skipping...`);
        }
        await insertPhotoSample(photoSample);
    } catch (error) {
        logger.error(`Could not insert photo ${photo.id}: ${error}`);
        throw error;
    }
}

export default async function samplePhotos(photos: FlickrAPIPhoto[]): Promise<void> {
    for (const photo of photos) {
        await samplePhoto(photo);
    }
}
