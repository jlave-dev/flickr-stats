import { DataTypes } from 'sequelize';
import { IPhotoSampleModel } from '../../types';
import sequelize from '../sequelize';

const PhotoSample = sequelize.define<IPhotoSampleModel>(
    'photo_sample',
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(20),
        },
        photo_id: {
            allowNull: false,
            type: DataTypes.STRING(20),
        },
        sampled: DataTypes.DATE,
        views: DataTypes.INTEGER,
        faves: DataTypes.INTEGER,
        comments: DataTypes.INTEGER,
    },
    {
        timestamps: false,
    },
);

export default PhotoSample;
