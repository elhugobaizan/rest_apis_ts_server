"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUIOptions = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / express / TS',
            version: '1.0.0',
            description: 'API Docs for producs'
        }
    },
    apis: ['./src/router.ts']
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerUIOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('https://lh3.googleusercontent.com/FTlJe1oivRMs5xJTWq4DUKEwak6JIW9HASnE-SXORy0_OD9-q-BreP1EaRY1VpdQc9mH');
            height: 120px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: red    
        }
    `,
    customSiteTitle: 'Documentacion REST API Express, TS'
};
exports.swaggerUIOptions = swaggerUIOptions;
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map