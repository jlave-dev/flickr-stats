import * as flickr from './flickr.mjs';
import * as db from './db.mjs';
import logger from './logger.mjs';

(async () => {
  logger.info('Beginning sampling task');

  // Get photos from Flickr API
  const photos = await flickr.getPhotos();

  // Update all photos in DB
  await Promise.all(photos.map(db.insertPhoto));

  // Sample all photos
  await Promise.all(photos.map(db.insertPhotoSample));

  logger.success('Sampling complete!');

  process.exit();
})();
