import { nanoid } from 'nanoid';
import { IFlickrPhoto, IPhotoSample } from '../types';

export default function createPhotoSampleData(photo: IFlickrPhoto): IPhotoSample {
    return {
        id: nanoid(20),
        photo_id: photo.id,
        sampled: new Date(),
        views: parseInt(photo.views, 10),
        faves: parseInt(photo.count_faves, 10),
        comments: parseInt(photo.count_comments, 10),
    };
}
