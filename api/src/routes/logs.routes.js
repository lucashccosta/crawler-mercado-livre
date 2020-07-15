const express = require('express');
const LogService = require('../services/LogService');
const ProductService = require('../services/ProductService');

const logsRouter = express.Router();

logsRouter.get('/', async (request, response) => {
    const logs = await LogService.all();

    return response.json(logs);
});

logsRouter.get('/:id', async (request, response) => {
    const { id } = request.params;

    const log = await LogService.show(id);

    return response.json(log);
});

logsRouter.get('/:id/products', async (request, response) => {
    const { id } = request.params;
    
    const products = await ProductService.allByLogId(id);

    return response.json(products);
});

module.exports = logsRouter;