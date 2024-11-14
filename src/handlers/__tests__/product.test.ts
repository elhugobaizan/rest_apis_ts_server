import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {
    it('Should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({});

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);
    });

    it('Should validate price', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Test',
            price: 0
        });

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0]).toHaveProperty('path');
        expect(response.body.errors[0].path).toBe('price');
    });

    it('Should create a new produt', async () => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse Testing",
            price: 50
        });

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toEqual(404);
        expect(response.body).not.toHaveProperty('errors');

    });
});

describe('GET /api/products', () => {
    
    it('should check if api/products exists', async () => {
        const response = await request(server).get('/api/products');

        expect(response.status).not.toEqual(404);
    });

    it('Get a JSON response with products', async () => {
        const response = await request(server).get('/api/products');

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveLength(1);

        expect(response.status).not.toEqual(404);
        expect(response.body).not.toHaveProperty('errors');
    });
});

describe('GET /api/products/:id', () => {
    it('Should returns 404 response for a nonexistent product', async () => {
        const productId = 2000;
        const response = await request(server).get(`/api/products/${productId}`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');
    });

    it('should check a valid ID in the url', async () => {
        const response = await request(server).get('/api/products/not-valid');

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
    });

    it('get a JSON response for a sigle product', async () => {
        const response = await request(server).get('/api/products/1');

        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('id');
    });
});

describe('PUT /api/products/:id', () => {
    it('Should display validation error', async () => {
        const response = await request(server).put(`/api/products/1`).send({});

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toBeTruthy();
        expect(response.body.errors).toHaveLength(5);

        expect(response.body).not.toHaveProperty('data');
    });

    it('Should validate price', async () => {
        const response = await request(server).put('/api/products/1').send({
            name: 'Test',
            availability: true,
            price: 0
        });

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0]).toHaveProperty('path');
        expect(response.body.errors[0].path).toBe('price');
    });

    it('Should validate non-existent product', async () => {
        const productId = 2000;
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: 'Test',
            availability: true,
            price: 300
        });

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('El Id no es valido');
    });

    it('Should update a product', async () => {
        const response = await request(server).put(`/api/products/1`).send({
            name: 'Test',
            availability: true,
            price: 300
        });

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('data');
    });

});

describe('PATCH /api/products/:id', () => {
    it('Should check valid id', async () => {
        const response = await request(server).patch(`/api/products/not_valid`).send({availability: false});

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('El Id no es valido');

        expect(response.body).not.toHaveProperty('data');
    });

    it('Should check non exisent product', async () => {
        const productId = 2000;
        const response = await request(server).patch(`/api/products/${productId}`).send({availability: false});

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('El Id no es valido');

        expect(response.body).not.toHaveProperty('data');
    });

    it('Should update availability', async () => {
        const response = await request(server).patch(`/api/products/1`).send({availability: false});

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.availability).toBe(false);

        expect(response.body).not.toHaveProperty('error');
    });

});

describe('DELETE /api/products/:id', () => {
    it('Should check valid id', async () => {
        const response = await request(server).delete(`/api/products/not_valid`);

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('El Id no es valido');

        expect(response.body).not.toHaveProperty('data');
    });

    it('Should check non exisent product', async () => {
        const productId = 2000;
        const response = await request(server).delete(`/api/products/${productId}`);

        expect(response.status).toEqual(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('El Id no es valido');

        expect(response.body).not.toHaveProperty('data');
    });

    it('Should delete a product', async () => {
        const response = await request(server).delete(`/api/products/1`);

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBe('Product deleted');

        expect(response.body).not.toHaveProperty('error');
    });

});