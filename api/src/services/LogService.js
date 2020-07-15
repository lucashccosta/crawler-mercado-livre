const Log = require("../models/Log");
const { rbtmqSendToQueue } = require('../services/rabbitMQ');
const { response } = require("express");

class LogService {

    /**
     * Busca todas as peqsuisas
     */
    static async all() {
        return Log.findAll({
            order: [
                ['created_at', 'DESC']
            ]
        });
    }

    /**
     * Busca uma pesquisa específica 
     * @param {string} id UUID da pesquisa
     */
    static async show(id) {
        return await Log.findByPk(id);
    }

    /**
     * Cria um novo log de pesquisa
     * @param {object} payload 
     */
    static async store(payload) {
        const { search, limit } = payload;
        
        const log = await Log.create({
            search
        });

        await rbtmqSendToQueue({ logId: log.id, search, limit }); //envia para rabbitmq redirecionar para o crawler

        return log;
    }

}

module.exports = LogService;