import * as flickr from '../utils/flickr';
import logger from '../utils/logger';
import samplePhotos from './sample-photos';
import updatePhotos from './update-photos';

export default async function updateAndSample(): Promise<void> {
    logger.info('Beginning sampling task');

    // Get photos from Flickr API
    const photos = await flickr.getPhotos();

    // Update all photos in DB
    await updatePhotos(photos);

    // // Sample all photos
    await samplePhotos(photos);

    logger.success('Sampling complete!');

    process.exit();
}
