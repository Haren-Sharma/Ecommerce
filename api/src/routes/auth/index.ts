import { Router } from "express";
import { loginUser, registerUser,listUsers } from "./authController";
import { validateData } from "../../middleware/validationMiddleWare";
import { createUserSchema, loginUserSchema } from "../../db/usersSchema";

const router = Router();

router.get("/list",listUsers);

router.post("/register", validateData(createUserSchema), registerUser);

router.post("/login", validateData(loginUserSchema),loginUser);

export default router;
