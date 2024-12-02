import { Router } from "express";
import { loginUser, registerUser,listUsers } from "./authController.js";
import { validateData } from "../../middleware/validationMiddleWare.js";
import { createUserSchema, loginUserSchema } from "../../db/usersSchema.js";

const router = Router();

router.get("/list",listUsers);

router.post("/register", validateData(createUserSchema), registerUser);

router.post("/login", validateData(loginUserSchema),loginUser);

export default router;
