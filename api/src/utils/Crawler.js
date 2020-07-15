const cheerio = require('cheerio');
const Helpers = require('./Helpers');

/**
 * Crawler que manipula e extrai as informações da página de busca do Mercado Livre
 */
class Crawler {
    
    constructor(html, limit)  {
        this._totalResults = 0;
        this._products = [];
        this.$ = cheerio.load(html);
        this.limit = limit;

        this.extractTotalResults();
        this.extractProducts();
    }

    get totalResults() {
        return this._totalResults;
    }

    get products() {
        return this._products;
    }

    set totalResults(result) {
        this._totalResults = result;
    }

    set products(products) {
        this._products = products;
    }

    /**
     * Extrai a informação de resultados totais
     */
    extractTotalResults() {
        const totalMLProducts = this.$('#ml-main #results-section .search-results-header .quantity-results').html();
        if(!totalMLProducts) {
            throw new Error('Total products not found.');
        }

        this._totalResults = Helpers.extractNumberFromString(totalMLProducts);
    }

    /**
     * Extrai as informações da listagem de produtos 
     */
    extractProducts() {
        /**
         * TODO
         * 1) pegar loja 
         * 2) pegar estado
         * 3) manipular limit
         */
        
        const products = this.$('#ml-main #results-section #searchResults').find('.results-item');

        products.map((index, element) => {
            const _$ = this.$(element);
            const name = _$.find('.item__info .main-title').html().trim();
            const price = _$.find('.item__info .price__fraction').html().trim();
            
            let link;
            if(_$.find('a').hasClass('item__info-link')) {
                link = _$.find('.item__info-link').attr('href').trim();
            }
            else {
                link = _$.find('.item__info .item__info-title').attr('href').trim();
            }
            
            const product = {
                name,
                price: Helpers.extractPriceFromString(price),
                link
            };

            this._products.push(product);
        });
    }
}

module.exports = Crawler;