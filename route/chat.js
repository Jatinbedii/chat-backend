import { Router } from "express";

import { verifyjwt } from "../middleware/verifyJwt.js";
import { SendMessage } from "../controller/chat.js";

const ChatRouter = Router();

ChatRouter.post("/sendmessage", verifyjwt, SendMessage);
export default ChatRouter;
