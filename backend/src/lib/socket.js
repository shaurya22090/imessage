import e from "express";
import { Server } from "socket.io";
import http from "http";

const app = e();

const server = http.createServer();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(server, { cors: { origin: [allowedOrigin] } });

function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// online users map = { userId: socketId }
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap[userId] = socket.id;

  // sends respones to very user (ie, sends event)-- Broadcast
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // this is kind of replacement fir app.listen() ..... I mean it listen for events
  socket.on("disconnect", () => {
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io, getReceiverSocketId };
