import { Dialect, Sequelize } from 'sequelize';
import fs from 'fs';

// Connect to CockroachDB through Sequelize.
const sequelize = new Sequelize({
    dialect: (process.env.SEQUELIZE_DIALECT as Dialect) || 'postgres',
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    host: process.env.SEQUELIZE_HOST,
    port: parseInt(process.env.SEQUELIZE_PORT || '26257', 10),
    database: process.env.SEQUELIZE_DATABASE,
    dialectOptions: {
        ...(process.env.SEQUELIZE_CERT
            ? {
                  ssl: {
                      ca: fs.readFileSync(process.env.SEQUELIZE_CERT as string).toString(),
                  },
              }
            : {}),
    },
    logging: false,
});

export default sequelize;
