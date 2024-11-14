"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const db_1 = __importDefault(require("../config/db"));
const Product = db_1.default.define('products', {
    name: {
        type: sequelize_typescript_1.DataType.STRING(100)
    },
    price: {
        type: sequelize_typescript_1.DataType.DECIMAL
    },
    availability: {
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: true
    }
});
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
exports.default = Product;
//# sourceMappingURL=Product.model.js.map