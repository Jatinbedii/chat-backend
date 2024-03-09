import { Router } from "express";
import { Users } from "../controller/users.js";

const UsersRouter = Router();

UsersRouter.get("/users", Users);
export default UsersRouter;
