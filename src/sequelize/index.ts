import sequelize from './sequelize';
import Photo from './models/photo';
import User from './models/user';
import PhotoSample from './models/photo-sample';
import UserSample from './models/user-sample';

Photo.hasMany(PhotoSample, { foreignKey: 'photo_id' });
User.hasMany(UserSample, { foreignKey: 'user_id' });

sequelize.sync();

export { sequelize, Photo, User, PhotoSample, UserSample };
