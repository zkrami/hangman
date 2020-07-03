
module.exports = function (server) {
    const io = require('socket.io')(server);
    
    io.on('connection', client => {


        client.on('disconnect', () => {
            console.log('client disconnected');
        });

        client.on("join-room" , (room) => {
            // @todo room exists 
            client.join(room); 
        }); 


        


    });

    return io; 
}