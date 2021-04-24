import { DBPhoto, FlickrAPIPhoto } from './types';

export default function createDBPhotoData(photo: FlickrAPIPhoto): DBPhoto {
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
