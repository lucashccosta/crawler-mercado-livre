const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const Log = require('../models/Log');
const Product = require('../models/Product');

const connection = new Sequelize(databaseConfig);

Log.init(connection);
Product.init(connection);

Log.associate(connection.models);
Product.associate(connection.models);

module.exports = connection;
