import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
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
}
const swaggerSpec = swaggerJSDoc(options);
const swaggerUIOptions: SwaggerUiOptions = {
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

export default swaggerSpec;
export {
    swaggerUIOptions
}