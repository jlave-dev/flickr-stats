import dotenv from 'dotenv';
import knex from 'knex';
import { nanoid } from 'nanoid';

dotenv.config();

export const kx = knex({
  client: 'pg',
  connection: {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.postgres,
  },
});

const photoColumns = [
  'id',
  'title',
  'description',
  'uploaded',
  'updated',
  'taken',
  'tags',
  'camera',
  'url_sq',
  'url_t',
  'url_s',
  'url_l',
  'url_o',
  'height_o',
  'width_o',
];

function createDbPhotoFromFlickrPhoto(photo) {
  const newPhoto = {};

  photoColumns.forEach((columnName) => {
    if (columnName === 'uploaded') {
      newPhoto.uploaded = new Date(parseInt(photo.dateupload, 10) * 1000);
    } else if (columnName === 'updated') {
      newPhoto.updated = new Date(parseInt(photo.lastupdate, 10) * 1000);
    } else if (columnName === 'taken') {
      newPhoto.taken = new Date(photo.datetaken);
    } else {
      newPhoto[columnName] = photo[columnName];
    }
  });

  return newPhoto;
}

function createDbPhotoSampleFromFlickrPhoto(photo) {
  return {
    id: nanoid(20),
    photo_id: photo.id,
    sampled: new Date(),
    views: parseInt(photo.views, 10),
    faves: parseInt(photo.count_faves, 10),
    comments: parseInt(photo.count_comments, 10),
  };
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
  console.log(`Trying to insert photo ${photo.id}`);
  return kx('photos')
    .insert(dbPhoto)
    .onConflict('id')
    .merge();
}

export async function insertPhotoSample(photo) {
  const dbPhotoSample = createDbPhotoSampleFromFlickrPhoto(photo);
  console.log(
    `Trying to insert photo sample ${dbPhotoSample.id} for photo ${photo.id}`,
  );
  return kx('photo_samples').insert(dbPhotoSample);
}