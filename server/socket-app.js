/**
 * Features of socket.io
 * Fallback to http long polling, if websocket connection cannot be established
 * Auto reconnection, if websocket connect gets closed
 * Acknowledgements, to send data and expect a response from the other side
 * Broadcast to all or to a subset of connected clients
 * Scale upto multiple instances of the server
 * Connection recovery, for short periods of disconnection
 * cors restricition
 **/

// socket.io implements a custom protocol on top of Websocket to provide additional features above
// therefore, it has to be used in both client and server side

const { Server } = require("socket.io");
const http = require("http");
const httpServer = http.createServer();

httpServer.listen(3001);

const io = new Server(httpServer, {
  cors: {
    origin: "*", // ["http://localhost:5500"]
  },
});

io.on("connection", (socket) => {
  console.log(`User: ${socket.id} connected`);
  socket.on("message",(data)=>{
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  })
  
});
