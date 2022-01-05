import createPhotoSampleData from './create-photo-sample-data';
import logger from '../utils/logger';
import { insertPhotoSample } from '../utils/db';
import shouldSamplePhoto from './should-sample-photo';
import { IFlickrPhoto } from '../types';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

async function samplePhoto(photo: IFlickrPhoto) {
    const photoSample = createPhotoSampleData(photo);
    logger.info(`Trying to insert photo sample ${photoSample.id} for photo ${photo.id}`);
    try {
        if (argv['dry-run'] || process.env.DRY_RUN === 'true') {
            return logger.debug('Skipping database operation because argument --dry-run was passed');
        }

        if (!(await shouldSamplePhoto(photo))) {
            return logger.warn(`Photo ${photo.id} has already been sampled today. Skipping...`);
        }

        await insertPhotoSample(photoSample);
    } catch (error) {
        logger.error(`Could not insert photo sample ${photo.id}: ${error}`);
        throw error;
    }
}

export default async function samplePhotos(photos: IFlickrPhoto[]): Promise<void> {
    for (const photo of photos) {
        await samplePhoto(photo);
    }
}
