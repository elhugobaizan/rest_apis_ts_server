import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const products = await Product.findByPk(id, {
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        });
        if(products) {
            res.json({ data: products });
        } else {
            res.status(400).json({error: "Producto no encontrado"});
        }
    } catch (error) {
        console.log(error);
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        });
        res.json({ data: products });
    } catch (error) {
        console.log(error);
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {        
        const product = await Product.create(req.body);
        res.status(201).json({data: product});
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if(product) {
            await product.update(req.body);
            await product.save();
            res.json({data: product});
        } else {
            res.status(404).json({error: 'El Id no es valido'});
        }
    } catch (error) {
        console.log(error);        
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if(!product) {
            res.status(404).json({error: 'El Id no es valido'});
        }
        product.availability = !product.dataValues.availability;
        await product.save();
        res.json({data: product});
    } catch (error) {
        console.log(error);        
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if(product) {
            await product.destroy();
            res.status(200).json({data: 'Product deleted'});
        } else {
            res.status(404).json({error: 'El Id no es valido'});
        }
    } catch (error) {
        console.log(error);        
    }
}










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
