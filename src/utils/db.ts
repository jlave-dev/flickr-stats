import { Photo, PhotoSample, User, UserSample } from '../sequelize';
import {
    IPhoto,
    IPhotoModel,
    IPhotoSample,
    IPhotoSampleModel,
    IUser,
    IUserModel,
    IUserSample,
    IUserSampleModel,
} from '../types';

export async function getPhotos(): Promise<IPhotoModel[]> {
    return Photo.findAll();
}

export async function getPhotoById(id: string): Promise<IPhotoModel | null> {
    return Photo.findByPk(id);
}

export async function getPhotoSamples(): Promise<IPhotoSampleModel[]> {
    return PhotoSample.findAll();
}

export async function getOrderedUserSamples(userId: string): Promise<IUserSampleModel[]> {
    return UserSample.findAll({ where: { user_id: userId }, order: [['sampled', 'desc']] });
}

export async function getPhotoSamplesByPhotoId(photoId: string): Promise<IPhotoSampleModel[]> {
    return PhotoSample.findAll({ where: { photo_id: photoId } });
}

export async function getMostRecentPhotoSampleByPhotoId(
    photoId: string,
): Promise<Pick<IPhotoSampleModel, 'sampled'> | null> {
    return PhotoSample.findOne({ attributes: ['sampled'], where: { photo_id: photoId }, order: [['sampled', 'desc']] });
}

export async function insertPhoto(photo: IPhoto): Promise<[IPhotoModel, boolean | null]> {
    return Photo.upsert(photo);
}

export async function insertPhotoSample(photoSample: IPhotoSample): Promise<IPhotoSampleModel> {
    return PhotoSample.create(photoSample);
}

export async function insertUser(user: IUser): Promise<[IUserModel, boolean | null]> {
    return User.upsert(user);
}

export async function insertUserSample(userSample: IUserSample): Promise<IUserSampleModel> {
    return UserSample.create(userSample);
}
