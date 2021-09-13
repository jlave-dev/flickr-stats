import { Model } from 'sequelize';

export interface IPhoto {
    id: string;
    title: string;
    description: string;
    uploaded: Date;
    updated: Date;
    taken: Date;
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

export interface IPhotoModel extends Model, IPhoto {}

export interface IPhotoSample {
    id: string;
    photo_id: string;
    sampled: Date;
    views: number;
    faves: number;
    comments: number;
}

export interface IPhotoSampleModel extends Model, IPhotoSample {}

export interface IUser {
    id: string;
    joined: Date;
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

export interface IUserModel extends Model, IUser {}

export interface IUserSample {
    id: string;
    user_id: string;
    sampled: Date;
    followers: number;
    following: number;
    photos: number;
    views: number;
    tags: number;
    geotags: number;
    faves: number;
    groups: number;
}

export interface IUserSampleModel extends Model, IUserSample {}

export interface IFlickrPhoto {
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
