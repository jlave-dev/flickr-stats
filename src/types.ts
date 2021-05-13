export interface DBPhoto {
    id: string;
    title: string;
    description: string;
    uploaded: string;
    updated: string;
    taken: string;
    tags: string;
    camera: string;
    url_sq: string;
    url_t: string;
    url_s: string;
    url_l: string;
    url_o: string;
    height_o: number;
    width_o: number;
}

export interface PhotoSample {
    id: string;
    photo_id: string;
    sampled: string;
    views: number;
    faves: number;
    comments: number;
}

export interface User {
    id: string;
    joined: string;
    occupation: string;
    hometown: string;
    first_name: string;
    last_name: string;
    facebook: string;
    twitter: string;
    tumblr: string;
    instagram: string;
    pinterest: string;
}

export interface UserSample {
    id: string;
    user_id: string;
    sampled: string;
    followers: number;
    following: number;
    photos: number;
    views: number;
    tags: number;
    geotags: number;
    faves: number;
    groups: number;
}

export interface FlickrAPIPhoto {
    id: string;
    title: string;
    description: { _content: string };
    camera: string;
    dateupload: string;
    lastupdate: string;
    datetaken: string;
    views: string;
    count_faves: string;
    count_comments: string;
    tags: string;
    url_sq: string;
    height_sq: number;
    width_sq: number;
    url_t: string;
    height_t: number;
    width_t: number;
    url_s: string;
    height_s: number;
    width_s: number;
    url_l: string;
    height_l: number;
    width_l: number;
    url_o: string;
    height_o: number;
    width_o: number;
}
