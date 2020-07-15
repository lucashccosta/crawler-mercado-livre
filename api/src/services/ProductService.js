const axios = require('axios');
const settings = require('../config/settings');
const Log = require('../models/Log');
const Product = require('../models/Product');
const Crawler = require('../utils/Crawler');

class ProductService {

    /**
     * Realiza a pesquisa e extrai os dados de produtos do MercadoLivre
     * @param product (string) Nome do produto a ser pesquisado
     * @param limit (number) Quantidade de dados a ser pesquisado
     */
    /*static async search(product, limit) {
        if(!product) {
            throw new Error('Product name is required.');
        }

        const mlURL = settings.ML_BASE_URL + `/${product}#D[A:${product}]`;

        const { data } = await axios.get(mlURL);
        const crawler = new Crawler(data, limit);
        const total = crawler.totalResults;
        const products = crawler.products;

        return await Log.create({
            search: product,
            total_results: total,
            total_searched: products.length,
            products
        }, {
            include: [{
                association: 'products',
            }]
        });
    }*/

    /**
     * Busca todos os produtos de uma determinada pesquisa
     * @param logId (string) UUID da pesquisa
     */
    static async allByLogId(logId) {
        return await Product.findAll({
            where: {
                log_id: logId
            }
        });
    }
}

module.exports = ProductService;