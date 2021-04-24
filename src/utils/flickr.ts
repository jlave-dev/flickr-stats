import Flickr from 'flickr-sdk';
import { FlickrAPIPhoto } from '../sampler/types';

export async function getPhotos(): Promise<FlickrAPIPhoto[]> {
    const extras = [
        'camera',
        'count_comments',
        'count_faves',
        'date_taken',
        'date_upload',
        'description',
        'last_update',
        'tags',
        'url_sq',
        'url_t',
        'url_s',
        'url_l',
        'url_o',
        'views',
    ].join(',');

    const flickr = new Flickr(
        Flickr.OAuth.createPlugin(
            process.env.FLICKR_CONSUMER_KEY,
            process.env.FLICKR_CONSUMER_SECRET,
            process.env.FLICKR_OAUTH_TOKEN,
            process.env.FLICKR_OAUTH_TOKEN_SECRET,
        ),
    );

    const res = await flickr.people.getPhotos({
        api_key: process.env.FLICKR_CONSUMER_KEY,
        user_id: '187126842@N07',
        per_page: 500,
        extras,
    });

    return res.body.photos.photo;
}
