import express from "express";
import router from "./router";
import Product from "./models/Product.model";
import colors from 'colors';
import morgan from 'morgan';
import cors, { CorsOptions } from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec, { swaggerUIOptions } from "./config/swagger";
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
    try {
        await Product.sync({ force: false}).then(result => {
            console.log(colors.blue('Conectado Postgre DB!'));
        });
    } catch (error) {
        console.log(error);
        console.log(colors.red('Hubo un error al conectar'));
    }
}
connectDB();

const server = express();

server.use(express.json());
console.log(process.env);
const originUrl = process.env.FRONTEND_URL;
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if(origin===originUrl) {
            console.log('Permitir...');
            callback(null,true);
        } else {
            console.log('Denegar...');
            callback(new Error('CORS error'),false)
        }
    }
}
server.use(cors(corsOptions));
server.use(morgan('dev'));

server.use('/api', router);
router.stack.forEach(function(r){
    if (r.route && r.route.path){
        console.log(colors.magenta(r.route.stack[0].method), '/api' + r.route.path)
    }
})

server.get('/api', (req, res) => {
    res.json({msg: 'Desde API'});
});

server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions));

export default server;