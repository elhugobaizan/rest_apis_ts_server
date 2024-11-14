import { Sequelize, Options, DataTypes } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

//const db = new Sequelize(process.env.DB_URL!);
const db = new Sequelize(process.env.DB_URL || 'postgresql://postgres:postgres@localhost:5432/rest_api_node_ts',
    {
        models: ['/../models/**/*'],
        logging: false
    } as Options
);

export default  db;
