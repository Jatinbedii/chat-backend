import { Router } from "express";
import {
  LoginController,
  RegisterController,
  SendUser,
} from "../controller/auth.js";
import { verifyjwt } from "../middleware/verifyJwt.js";
const authRouter = Router();
authRouter.post("/login", LoginController);
authRouter.post("/register", RegisterController);
authRouter.get("/user", verifyjwt, SendUser);
export default authRouter;
