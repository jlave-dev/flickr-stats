import { nanoid } from 'nanoid';
import { FlickrAPIPhoto, PhotoSample } from './types';

export default function createPhotoSampleData(photo: FlickrAPIPhoto): PhotoSample {
    return {
        id: nanoid(20),
        photo_id: photo.id,
        sampled: new Date().toISOString(),
        views: parseInt(photo.views, 10),
        faves: parseInt(photo.count_faves, 10),
        comments: parseInt(photo.count_comments, 10),
    };
}
