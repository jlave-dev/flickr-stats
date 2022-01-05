import { DataTypes } from 'sequelize';
import { IUserModel } from '../../types';
import sequelize from '../sequelize';

const User = sequelize.define<IUserModel>(
    'user',
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(20),
        },
        joined: DataTypes.DATE,
        occupation: DataTypes.STRING,
        hometown: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        facebook: DataTypes.STRING,
        twitter: DataTypes.STRING,
        tumblr: DataTypes.STRING,
        instagram: DataTypes.STRING,
        pinterest: DataTypes.STRING,
    },
    {
        timestamps: false,
    },
);

export default User;
