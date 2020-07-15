const amqp = require('amqplib');
const settings = require('../config/settings');
const botML = require('./botML');
const Log = require('../models/Log');
const Product = require('../models/Product');

/**
 * Envia mensagem de resposta para rabbitmq
 * @param {object} payload 
 */
const rbtmqSendToQueue = async (payload) => {
    const queue = 'crawler_responses'; //nome da fila
    const connection = await amqp.connect(settings.RABBITMQ_URL);
    const channel = await connection.createConfirmChannel();

    //informa qual fila conectar
    await channel.assertQueue(queue, { durable: true });

    //envia payload para a fila
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload), 'utf-8'));
}

/**
 * Escuta fila de requisições enviadas pela API
 * @param {function} _callback 
 */
const rbtmqListenFromQueue = async (_callback) => {
    const queue = 'crawler_requests';
    const connection = await amqp.connect(settings.RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });
    await channel.prefetch(1); //recebe uma mensagem por vez

    await channel.consume(queue, async (msg) => {
        const { logId, search, limit } = JSON.parse(msg.content.toString());
        
        try {
            if(!logId || !search) {
                throw new Error('Request is invalid');
            }
            
            const { total, products } = await botML(search, limit);
            
            const productsMapped = products.map(product => {
                return {
                    ...product,
                    log_id: logId
                };
            });

            await Product.bulkCreate(productsMapped);

            await rbtmqSendToQueue({ 
                logId, 
                total_results: total, 
                total_searched: limit, 
                status: 'finished' 
            });
        }
        catch(err) {
            console.error(err);
            await rbtmqSendToQueue({ 
                logId, 
                total_results: 0, 
                total_searched: 0, 
                status: 'error' 
            });
        }

        await channel.ack(msg);
    });

    _callback();
};

module.exports = { rbtmqSendToQueue, rbtmqListenFromQueue };