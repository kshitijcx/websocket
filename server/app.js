//ws- package for working with websockets on the server
//websockets are event driven and used for bi directional communication
const ws = require("ws");
const wsServer = new ws.WebSocketServer({
  port: 3001,
});

//socket is line a pipe or channel established between client and server when client loads up
//all socket connections have different IDs that enables server to differentiate between them

wsServer.on("connection",(socket)=>{ 
    socket.on("message",(data)=>{
        console.log(data)
    })
})