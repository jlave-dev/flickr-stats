import { DataTypes } from 'sequelize';
import { IPhotoModel } from '../../types';
import sequelize from '../sequelize';

const Photo = sequelize.define<IPhotoModel>(
    'photo',
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING(20),
        },
        title: DataTypes.STRING,
        description: DataTypes.JSON,
        uploaded: DataTypes.DATE,
        updated: DataTypes.DATE,
        taken: DataTypes.DATE,
        tags: DataTypes.TEXT,
        camera: DataTypes.STRING,
        url_sq: DataTypes.STRING,
        url_t: DataTypes.STRING,
        url_s: DataTypes.STRING,
        url_l: DataTypes.STRING,
        url_o: DataTypes.STRING,
        height_o: DataTypes.INTEGER,
        width_o: DataTypes.INTEGER,
    },
    {
        timestamps: false,
    },
);

export default Photo;
