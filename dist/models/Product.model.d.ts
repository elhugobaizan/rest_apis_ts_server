import Sequelize, { Model } from "sequelize";
interface ProductModel extends Model {
    name: string;
    price: number;
    availability: boolean;
}
declare const Product: Sequelize.ModelCtor<ProductModel>;
export default Product;
