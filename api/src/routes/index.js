const express = require('express');
const productsRoutes = require('./products.routes');
const logsRoutes = require('./logs.routes');

const routes = express.Router();

routes.use('/products', productsRoutes);
routes.use('/logs', logsRoutes);

module.exports = routes;