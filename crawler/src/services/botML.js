const axios = require('axios');
const settings = require('../config/settings');
const Crawler = require('../utils/Crawler');

/**
 * Bot que executa crawler
 * @param {string} search 
 * @param {string} limit 
 */
const botML = async (search, limit) => {
    const crawler = new Crawler(search, limit);
    await crawler.botPage();
    
    const total = crawler.totalResults;
    const products = crawler.products;

    return {
        total,
        products
    };
};

module.exports = botML;