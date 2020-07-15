const amqp = require('amqplib');
const settings = require('../config/settings');
const Log = require('../models/Log');

/**
 * Envia mensagem para rabbitmq
 * @param {object} payload 
 */
const rbtmqSendToQueue = async (payload) => {
    const queue = 'crawler_requests'; //nome da fila
    const connection = await amqp.connect(settings.RABBITMQ_URL);
    const channel = await connection.createConfirmChannel();

    //informa qual fila conectar
    await channel.assertQueue(queue, { durable: true });

    //envia payload para a fila
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload), 'utf-8'));
}

/**
 * Escuta fila de respostas processadas no crawler
 * @param {function} _callback 
 */
const rbtmqListenFromQueue = async (_callback) => {
    const queue = 'crawler_responses';
    const connection = await amqp.connect(settings.RABBITMQ_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });
    await channel.prefetch(1); //recebe uma mensagem por vez

    await channel.consume(queue, async (msg) => {
        const { logId, total_results, total_searched, status } = JSON.parse(msg.content.toString());

        if(logId && status && total_results && total_searched) {
            try {
                await Log.update({ 
                    status, total_results, total_searched
                }, { 
                    where: { id: logId } 
                });

                //notifica frontend para realizar atualização do status
                websocket.emit('crawlerProcessFinished', {
                    id: logId,
                    status
                });
            }
            catch(err) {
                console.error(err);
            }
        }

        await channel.ack(msg);
    });

    _callback();
};

module.exports = { rbtmqSendToQueue, rbtmqListenFromQueue };