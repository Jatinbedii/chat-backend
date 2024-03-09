import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./route/auth.js";
import connectDatabase from "./utils/db.js";
import UsersRouter from "./route/users.js";
import ChatRouter from "./route/chat.js";
const app = express();
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
app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});
