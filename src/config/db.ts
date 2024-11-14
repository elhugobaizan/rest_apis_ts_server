import { Sequelize, Options, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(process.env.DB_URL,
    {
        models: ['/../models/**/*'],
        logging: false
    } as Options
);

export default  db;
