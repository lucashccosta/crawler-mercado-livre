const socketIO = require('socket.io');

const scktIOListen = (server, _callback) => {
    global.websocket = socketIO(server);
    
    websocket.on('connection', socket => {
        console.log(`✔ Frontend connected: ${socket.id}`);
    });

    _callback();
};

module.exports = { scktIOListen };