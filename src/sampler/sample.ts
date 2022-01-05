import { sequelize } from '../sequelize';
import * as flickr from '../utils/flickr';
import logger from '../utils/logger';
import samplePhotos from './sample-photos';
import sampleUserStats from './sample-user-stats';
import updatePhotos from './update-photos';
import updateUser from './update-user';

const sample = async (): Promise<void> => {
    logger.info('Beginning sampling task');

    // Get user data from Flickr API and update user
    const user = await flickr.getUserData();
    await updateUser(user);

    // Scrape user data from Flickr page and sample user stats
    const userStats = await flickr.getUserStats();
    await sampleUserStats(userStats);

    // Get photos from Flickr API
    const photos = await flickr.getPhotos();

    // Update all photos in DB
    await updatePhotos(photos);

    // Sample all photos
    await samplePhotos(photos);

    logger.success('Sampling complete!');

    sequelize.close();
};

export default sample;
