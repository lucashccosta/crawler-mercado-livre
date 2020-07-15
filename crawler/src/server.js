const express = require('express');
require('./database');

const { rbtmqListenFromQueue } = require('./services/rabbitMQ');

const app = express();

rbtmqListenFromQueue(() => {
    console.log('🐇 Listening RabbitMQ server!');
});

app.listen(3334, () => {
    console.log('🚀 Crawler server started on port 3334!');
});