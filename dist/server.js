"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const Product_model_1 = __importDefault(require("./models/Product.model"));
const colors_1 = __importDefault(require("colors"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importStar(require("./config/swagger"));
async function connectDB() {
    try {
        //await db.authenticate();
        await Product_model_1.default.sync({ force: false }).then(result => {
            //console.log(result);
            console.log(colors_1.default.blue('Conectado Postgre DB!'));
        });
    }
    catch (error) {
        console.log(error);
        console.log(colors_1.default.red('Hubo un error al conectar'));
    }
}
connectDB();
const server = (0, express_1.default)();
server.use(express_1.default.json());
const corsOptions = {
    origin: function (origin, callback) {
        if (origin === 'http://localhost:5173') {
            console.log('Permitir...');
            callback(null, true);
        }
        else {
            console.log('Denegar...');
            callback(new Error('CORS error'), false);
        }
    }
};
server.use((0, cors_1.default)(corsOptions));
server.use((0, morgan_1.default)('dev'));
server.use('/api', router_1.default);
router_1.default.stack.forEach(function (r) {
    if (r.route && r.route.path) {
        console.log(colors_1.default.magenta(r.route.stack[0].method), '/api' + r.route.path);
    }
});
server.get('/api', (req, res) => {
    res.json({ msg: 'Desde API' });
});
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default, swagger_1.swaggerUIOptions));
exports.default = server;
//# sourceMappingURL=server.js.map