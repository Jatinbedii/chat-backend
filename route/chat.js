import { Router } from "express";

import { verifyjwt } from "../middleware/verifyJwt.js";
import { GetChat, SendMessage } from "../controller/chat.js";

const ChatRouter = Router();

ChatRouter.post("/sendmessage", verifyjwt, SendMessage);
ChatRouter.get("/chat/:userid", verifyjwt, GetChat);
export default ChatRouter;
