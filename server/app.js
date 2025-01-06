const { Server } = require("socket.io");
const express = require("express");

const app = express();

const httpServer = app.listen(3001, () => {
  console.log("server port: 3001");
});

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  //upon connection - only to current user
  socket.emit("message", "Welcome to chat app");

  //upon connection - to all other users except the current
  socket.broadcast.emit(
    "message",
    `user ${socket.id.substring(0, 5)} connected`
  );

  //upon disconnection - to all other users
  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "message",
      `user ${socket.id.substring(0, 5)} disconnected`
    );
  });

  //capturing the activity event
  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });

  socket.on("message", (data) => {
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
  });
});
