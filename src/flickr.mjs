import dotenv from 'dotenv';
import Flickr from 'flickr-sdk';

dotenv.config();

// eslint-disable-next-line import/prefer-default-export
export async function getPhotos() {
  const extras = [
    'views',
    'description',
    'date_upload',
    'date_taken',
    'last_update',
    'geo',
    'tags',
    'o_dims',
    'url_sq',
    'url_t',
    'url_s',
    'url_l',
    'url_o',
    'count_faves',
    'count_comments',
    'camera',
  ].join(',');

  const flickr = new Flickr(Flickr.OAuth.createPlugin(
    process.env.FLICKR_CONSUMER_KEY,
    process.env.FLICKR_CONSUMER_SECRET,
    process.env.FLICKR_OAUTH_TOKEN,
    process.env.FLICKR_OAUTH_TOKEN_SECRET,
  ));

  const res = await flickr.people.getPhotos({
    api_key: process.env.FLICKR_CONSUMER_KEY,
    user_id: '187126842@N07',
    per_page: 500,
    extras,
  });

  return res.body.photos.photo;
}
