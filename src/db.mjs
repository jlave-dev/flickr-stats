import dotenv from 'dotenv';
import knex from 'knex';
import { nanoid } from 'nanoid';
import log from './log.mjs';

dotenv.config();

export const kx = knex({
  client: 'sqlite3',
  connection: {
    filename: process.env.SQLITE_FILE,
  },
});

function createDbPhotoFromFlickrPhoto(photo) {
  return {
    id: photo.id,
    title: photo.title,
    description: JSON.stringify(photo.description),
    uploaded: new Date(parseInt(photo.dateupload, 10) * 1000).toISOString(),
    updated: new Date(parseInt(photo.lastupdate, 10) * 1000).toISOString(),
    taken: new Date(photo.datetaken).toISOString(),
    tags: photo.tags,
    camera: photo.camera,
    url_sq: photo.url_sq,
    url_t: photo.url_t,
    url_s: photo.url_s,
    url_l: photo.url_l,
    url_o: photo.url_o,
    height_o: photo.height_o,
    width_o: photo.width_o,
  };
}

function createDbPhotoSampleFromFlickrPhoto(photo) {
  return {
    id: nanoid(20),
    photo_id: photo.id,
    sampled: new Date().toISOString(),
    views: parseInt(photo.views, 10),
    faves: parseInt(photo.count_faves, 10),
    comments: parseInt(photo.count_comments, 10),
  };
}

async function shouldSamplePhoto(photo) {
  const allSamples = await kx('photo_samples')
    .select('sampled')
    .where({ photo_id: photo.id })
    .orderBy('sampled', 'desc');

  return allSamples.length === 0
    || new Date().getDate() !== new Date(allSamples[0].sampled).getDate();
}

export async function getAllPhotos() {
  return kx('photos').select();
}

export async function getPhoto(id) {
  return kx('photos').select({ id });
}

export async function countPhotos() {
  return kx('photos').count();
}

export async function insertPhoto(photo) {
  const dbPhoto = createDbPhotoFromFlickrPhoto(photo);
  log.info(`Trying to insert photo ${photo.id}`);
  return kx('photos')
    .insert(dbPhoto)
    .onConflict('id')
    .merge();
}

export async function insertPhotoSample(photo) {
  const dbPhotoSample = createDbPhotoSampleFromFlickrPhoto(photo);
  log.info(
    `Trying to insert photo sample ${dbPhotoSample.id} for photo ${photo.id}`,
  );
  if (!await shouldSamplePhoto(photo)) {
    return log.warn(`Photo ${photo.id} has already been sampled today. Skipping...`);
  }
  return kx('photo_samples').insert(dbPhotoSample);
}
