const http = require('http');
const app = require('./app');
require('./database');

const { rbtmqListenFromQueue } = require('./services/rabbitMQ');
const { scktIOListen } = require('./services/socketIO');

const server = http.createServer(app);

rbtmqListenFromQueue(() => {
    console.log('🐇 Listening RabbitMQ server!');
});

scktIOListen(server, () => {
    console.log('💬 Listening SocketIO server!');
});

server.listen(3333, () => {
    console.log('🚀 API server started on port 3333!');
});