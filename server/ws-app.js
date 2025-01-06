/*
 * This is example for barebones ws server, it is very low-level
 * socket.io adds additional features to it 
*/

//ws- package for working with websockets on the server
//websockets are event driven and used for bi directional communication
const ws = require("ws");
const http = require("http");

const httpServer = http.createServer();
httpServer.listen(3001);

const wsServer = new ws.WebSocketServer({
  //   port: 3001 if both servers are working on differentn ports
  server: httpServer, //if bother servers are working on same port
});

//socket is line a pipe or channel established between client and server when client loads up
//all socket connections have different IDs that enables server to differentiate between them

//ws server or http server alone
//ws server and http server on different ports
//ws server and http server on same port (it is possible as they operate on different protocols)

wsServer.on("connection", (socket) => {
  console.log("connection established");
  socket.on("message", (data) => {
    //data is send in form of buffer or stream
    const b = Buffer.from(data).toString();
    console.log(b);
    socket.send(`this msg is from server: ${data}`);
  });
});
