import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./route/auth.js";
import connectDatabase from "./utils/db.js";
import UsersRouter from "./route/users.js";
import ChatRouter from "./route/chat.js";
import { createServer } from "http";
import { Server } from "socket.io";
let map = new Map();
let peermap = new Map();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND,
  },
});
io.on("connection", (socket) => {
  socket.on("registerid", ({ id }) => {
    socket.join(id);
    map.set(id, socket.id);
  });
  socket.on("personalmessage", ({ message, to, from, type }) => {
    socket.to(to).emit("personalmessage", { message, from, type, to });
  });
  socket.on("callcut", ({ to }) => {
    socket.to(map.get(to)).emit("callcut");
  });
  socket.on("call", ({ to, from, peerid }) => {
    if (!map.has(to)) {
      socket.emit("offline");
      return;
    }
    peermap.set(peerid, socket.id);
    socket.to(map.get(to)).emit("callcoming", { peerid, from });
  });
  socket.on("callcutclient", ({ peer }) => {
    socket.to(peermap.get(peer)).emit("callcutfromclient");
  });
  socket.on("disconnect", () => {
    let temp = socket.id;
    for (let [id, socketid] of map.entries()) {
      if (temp == socketid) {
        map.delete(id);
      }
    }
  });
});
connectDatabase();
app.use(
  cors({
    origin: process.env.FRONTEND,
  })
);
app.use(express.json());
app.use("/api", authRouter);
app.use("/api", UsersRouter);
app.use("/api", ChatRouter);
httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});
