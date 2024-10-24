import { Router } from "express";
import { loginUser, registerUser } from "./authController";
import { validateData } from "../../middleware/validationMiddleWare";
import { createUserSchema } from "../../db/usersSchema";

const router = Router();

router.post("/register", validateData(createUserSchema), registerUser);

router.post("/login", loginUser);

export default router;
