import * as flickr from './flickr.mjs';
import * as db from './db.mjs';

(async () => {
  // Get photos from Flickr API
  const photos = await flickr.getPhotos();

  // Update all photos in DB
  await Promise.all(photos.map(db.insertPhoto));

  // Sample all photos
  await Promise.all(photos.map(db.insertPhotoSample));

  process.exit();
})();
