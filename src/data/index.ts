import { exit } from 'node:process';
import db from '../config/db';
import colors from 'colors';
import Product from '../models/Product.model';

const clearDB = async () => {
    try {
        await db.sync({force: true});
        await Product.sync({force: true});
        console.log(colors.yellow('Database cleaned'));
        exit();
    } catch (error) {
        console.log(error);
        exit(1);
    }
}
if(process.argv[2] ==='--clear') {
    clearDB();
}