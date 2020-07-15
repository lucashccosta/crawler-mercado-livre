const axios = require('axios');
const cheerio = require('cheerio');
const utf8 = require('utf8');
const settings = require('../config/settings');
const Helpers = require('./Helpers');

/**
 * Crawler que manipula e extrai as informações da página de busca do Mercado Livre
 */
class Crawler {
    
    constructor(search, limit)  {
        this._totalResults = 0;
        this._products = [];
        this.mlURL = settings.ML_BASE_URL + `/${search}#D[A:${search}]`;
        this.limit = (limit <= 0 && limit > 50) ? 50 : limit; 
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

    async botPage() {
        await axios.get(this.mlURL).then(async response => {
            this.$ = cheerio.load(response.data, {
                normalizeWhitespace: false,
                xmlMode: false,
                decodeEntities: false
            });

            this.extractTotalResults();
            this.extractProducts();
            await this.extractState();
        });
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
        const products = this.$('#ml-main #results-section #searchResults').find('.results-item');

        products.slice(0, this.limit).map((index, element) => {
            const _$ = this.$(element);
            const name = _$.find('span').hasClass('main-title') ? _$.find('.item__info .main-title').html().trim() : '';
            const fraction = _$.find('span').hasClass('price__fraction') ? _$.find('.item__info .price__fraction').html().trim() : '0';
            const decimal = _$.find('span').hasClass('price__decimals') ? _$.find('.item__info .price__decimals').html().trim() : '0';
            const link = _$.find('a').hasClass('item__info-link') ? _$.find('.item__info-link').attr('href').trim() : _$.find('.item__info .item__info-title').attr('href').trim();
            const store = _$.find('span').hasClass('item__brand-title-tos') ? _$.find('.item__info .item__brand-title-tos').html().trim() : null;
            const state = _$.find('span').hasClass('item__brand-title-tos') ? _$.find('.item__info .item__brand-title-tos').attr('data-item-jsurl') : null;
            const price = fraction + (decimal ? `,${decimal}` : '');
            
            const product = {
                name,
                price: Helpers.extractPriceFromString(price),
                link,
                store: Helpers.extractStoreName(store),
                state
            };
            
            this._products.push(product);
        });
    }

    /**
     * Extrai o estado a partir da loja do produto
     * @param {string} url 
     */
    async extractState() {
        for(let i = 0; i < this._products.length; i++) {
            const element = this._products[i];
            
            if(element.state) {
                const html = await axios.get(element.state);
                const _$ = cheerio.load(html.data, {
                    normalizeWhitespace: false,
                    xmlMode: false,
                    decodeEntities: false
                });
                
                element.state = '';

                _$('#id_state').find('.filter-name').each((index, location) => {
                    element.state = _$(location).html().trim() + ' ' + element.state;
                });
            }
        }
    }
}

module.exports = Crawler;