const express = require('express');
const LogService = require('../services/LogService');

const productsRouter = express.Router();

productsRouter.post('/', async (request, response) => {
    const { search, limit } = request.body;
    
    const log = await LogService.store({ search, limit });

    return response.json(log);
});

module.exports = productsRouter;