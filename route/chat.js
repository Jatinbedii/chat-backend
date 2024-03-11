import { Router } from "express";

import { verifyjwt } from "../middleware/verifyJwt.js";
import { GetChat, SendMessage, SendImage } from "../controller/chat.js";

const ChatRouter = Router();

ChatRouter.post("/sendmessage", verifyjwt, SendMessage);
ChatRouter.post("/sendimage", verifyjwt, SendImage);
ChatRouter.get("/chat/:userid", verifyjwt, GetChat);
export default ChatRouter;
