import { Router } from "express";
import { Users, SingleUser } from "../controller/users.js";

const UsersRouter = Router();

UsersRouter.get("/users", Users);
UsersRouter.get("/singleuser/:id", SingleUser);
export default UsersRouter;
