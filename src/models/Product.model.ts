import { DataType } from "sequelize-typescript";
import Sequelize, { Model } from "sequelize";
import db from "../config/db";

interface ProductModel extends Model {
    name: string,
    price: number,
    availability: boolean;
}

const Product = db.define<ProductModel>('products', {
    name: {
        type: DataType.STRING(100)
    },
    price: {
        type: DataType.DECIMAL
    },
    availability: {
        type: DataType.BOOLEAN,
        defaultValue: true
    }
})

/* @Table({
    tableName: 'products'
})
class Product extends Model {
    @Column(DataType.STRING(100))
    name: string

    @Column(DataType.FLOAT(6,2))
    price: number

    @Column(DataType.BOOLEAN)
    availability: boolean
} */
export default Product