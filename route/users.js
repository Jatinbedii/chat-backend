import { Router } from "express";
import { Users, SingleUser, ChangePFP } from "../controller/users.js";
import { verifyjwt } from "../middleware/verifyJwt.js";

const UsersRouter = Router();

UsersRouter.get("/users", Users);
UsersRouter.get("/singleuser/:id", SingleUser);
UsersRouter.post("/changepfp", verifyjwt, ChangePFP);
export default UsersRouter;
