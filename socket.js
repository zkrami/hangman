
module.exports = function (server) {
    const io = require('socket.io')(server);
    
    let rooms = { 

    }; 
    function initRoom(room){
        if(rooms[room]) return ; // do nothing if exist 
        rooms[room] = {
            word : "" , 
            players : {} , 
            index : 0     
        }

    }
    function generateId(room){

        let playerId = rooms[room].index;  // create new player for this room 
        rooms[room].players[playerId] = {
            score:0
        };
        rooms[room].index++ ; 
        return playerId; 

    }
    io.on('connection', client => {
        console.log('client connected');


        client.on('disconnect', () => {
            console.log('client disconnected');
        });


        client.on("join-room" , ({room , id}) => {
            // @todo room exists 
            client.join(room); 
            initRoom(room); 
            if(!id){ // id == "" 
                id = generateId(room);
            }
            client.emit("id" , id); 

            io.in(room).emit("user-joined" , rooms[room].players); 
            
        }); 

        client.on("move" , (data) => { 
            // move 
            /*
                {
                    player : , 
                    move : "d" 
                    room 
                }
             */
            io.in(data.room).emit("move-recieved" , {letter : data.move}); 
        });


        


    });

    return io; 
}