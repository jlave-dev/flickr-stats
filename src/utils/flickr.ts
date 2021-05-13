import axios from 'axios';
import Flickr from 'flickr-sdk';
import { FlickrAPIPhoto, User, UserSample } from '../types';

export const client = new Flickr(process.env.FLICKR_CONSUMER_KEY);

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
    // First scrape profile page to get follow and photo counts
    const axiosRes = await axios.get(`https://www.flickr.com/people/${process.env.FLICKR_USER_ID}/`);

    if (axiosRes.status !== 200) {
        throw new Error(`Request to user page failed: ${axiosRes.statusText}`);
    }

    const html: string = axiosRes.data;

    // TODO: Replace the follows regexes to account for 999 -> 1K
    const followersMatch = html.match(/(\d+) Followers/);
    const followingMatch = html.match(/(\d+) Following/);
    const photosMatch = html.match(/(\d+|\d{1,3}(,\d{3})*)(\.\d+)? Photos/);

    // Then make an API request to get other stats
    const flickrRes = await client.profile.getProfile({
        user_id: process.env.FLICKR_USER_ID,
        per_page: 500,
        extras: 'with_stats',
    });

    const { stats } = flickrRes.body;

    return {
        user_id: process.env.FLICKR_USER_ID as string,
        followers: parseInt((followersMatch && followersMatch[1]) as string, 10),
        following: parseInt((followingMatch && followingMatch[1]) as string, 10),
        photos: parseInt(((photosMatch && photosMatch[1]) as string).replace(/,/g, ''), 10),
        views: stats.photo_views,
        tags: stats.tags,
        geotags: stats.geotagged,
        faves: stats.faves,
        groups: stats.groups,
    };
}

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
