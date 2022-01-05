import { DataTypes } from 'sequelize';
import { IUserSampleModel } from '../../types';
import sequelize from '../sequelize';

const UserSample = sequelize.define<IUserSampleModel>(
    'user_sample',
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(20),
        },
        user_id: {
            allowNull: false,
            type: DataTypes.STRING(20),
        },
        sampled: DataTypes.DATE,
        followers: DataTypes.INTEGER,
        following: DataTypes.INTEGER,
        photos: DataTypes.INTEGER,
        views: DataTypes.INTEGER,
        tags: DataTypes.INTEGER,
        geotags: DataTypes.INTEGER,
        faves: DataTypes.INTEGER,
        groups: DataTypes.INTEGER,
    },
    {
        timestamps: false,
    },
);

export default UserSample;
