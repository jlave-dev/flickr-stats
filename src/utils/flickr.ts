import Flickr from 'flickr-sdk';
import { FlickrAPIPhoto, User, UserSample } from '../types';

export const client = new Flickr(process.env.FLICKR_CONSUMER_KEY);

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

    const res = await client.people.getPhotos({
        api_key: process.env.FLICKR_CONSUMER_KEY,
        user_id: process.env.FLICKR_USER_ID,
        per_page: 500,
        extras,
    });

    return res.body.photos.photo;
}

export async function getUserData(): Promise<User> {
    const flickrRes = await client.profile.getProfile({
        user_id: process.env.FLICKR_USER_ID,
        per_page: 500,
        extras: 'with_stats',
    });

    const { profile } = flickrRes.body;

    return {
        id: profile.id,
        joined: new Date(profile.join_date * 1000).toISOString(),
        occupation: profile.occupation,
        hometown: profile.hometown,
        first_name: profile.first_name,
        last_name: profile.last_name,
        facebook: profile.facebook,
        twitter: profile.twitter,
        tumblr: profile.tumblr,
        instagram: profile.instagram,
        pinterest: profile.pinterest,
    };
}

export async function getUserStats(): Promise<Omit<UserSample, 'id' | 'sampled'>> {
    // First make an API request to get follow and photo counts
    let flickrRes = await client.people.getInfo({
        user_id: process.env.FLICKR_USER_ID,
        extras: ['contacts', 'rev_contacts'].join(','),
    });

    const { person } = flickrRes.body;

    // Then make an API request to get other stats
    flickrRes = await client.profile.getProfile({
        user_id: process.env.FLICKR_USER_ID,
        per_page: 500,
        extras: 'with_stats',
    });

    const { stats } = flickrRes.body;

    return {
        user_id: process.env.FLICKR_USER_ID as string,
        followers: parseInt(person.rev_contacts._content, 10),
        following: parseInt(person.contacts, 10),
        photos: parseInt(person.photos.count._content, 10),
        views: stats.photo_views,
        tags: stats.tags,
        geotags: stats.geotagged,
        faves: stats.faves,
        groups: stats.groups,
    };
}
