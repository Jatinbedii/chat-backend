import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./route/auth.js";
import connectDatabase from "./utils/db.js";
import UsersRouter from "./route/users.js";
import ChatRouter from "./route/chat.js";
import { createServer } from "http";
import { Server } from "socket.io";
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
  });
  socket.on("personalmessage", ({ message, to, from, type }) => {
    socket.to(to).emit("personalmessage", { message, from, type, to });
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
