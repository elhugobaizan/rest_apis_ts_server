"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateAvailability = exports.updateProduct = exports.createProduct = exports.getProducts = exports.getProductById = void 0;
const Product_model_1 = __importDefault(require("../models/Product.model"));
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product_model_1.default.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        if (products) {
            res.json({ data: products });
        }
        else {
            res.status(400).json({ error: "Producto no encontrado" });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProductById = getProductById;
const getProducts = async (req, res) => {
    try {
        const products = await Product_model_1.default.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        res.json({ data: products });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getProducts = getProducts;
const createProduct = async (req, res) => {
    try {
        const product = await Product_model_1.default.create(req.body);
        res.status(201).json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_model_1.default.findByPk(id);
        if (product) {
            await product.update(req.body);
            await product.save();
            res.json({ data: product });
        }
        else {
            res.status(404).json({ error: 'El Id no es valido' });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateProduct = updateProduct;
const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_model_1.default.findByPk(id);
        if (!product) {
            res.status(404).json({ error: 'El Id no es valido' });
        }
        product.availability = !product.dataValues.availability;
        await product.save();
        res.json({ data: product });
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateAvailability = updateAvailability;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_model_1.default.findByPk(id);
        if (product) {
            await product.destroy();
            res.status(200).json({ data: 'Product deleted' });
        }
        else {
            res.status(404).json({ error: 'El Id no es valido' });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteProduct = deleteProduct;
/*     //Validate
    await check('name').notEmpty().withMessage('El nombre de producto no puede ir vacio').run(req);
    await check('price').isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value> 0).withMessage('Precio no valido')
        .run(req);
        
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
            return;
        }
        */
//const product = Product.build(req.body);
//const result = await product.save();
//# sourceMappingURL=product.js.map