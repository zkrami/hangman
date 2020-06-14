const server = require('http').createServer();
const io = require('socket.io')(server, { path: "/server-path" });

// 0 1 2 3 4 5 
// odd: 1 3 5 
// even: 0 2 4 
let clientNumber = 0;
io.on('connection', client => {

    console.log("connected client");
    if (clientNumber % 2 == 0) {
        client.join("even");
    } else {
        client.join("odd");
    }

    client.on('message', data => {
        for (let room of Object.keys(client.rooms)) {
            client.to(room).emit("server-message" , {message : `private room(${room}): ${data.message}`}); 
        }
    });


    client.on('disconnect', () => {
        console.log('client disconnected');
    });

    clientNumber++;


});



server.listen(3000, () => {
    console.log("server listening to 3000");
});
