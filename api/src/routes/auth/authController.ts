import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";

export const registerUser = (req: Request, res: Response) => {
  const myId = uuidv4;
  const data = req.cleanBody;
  data.id = myId;
  data.password = hash(data.password, 10);
  console.log("🚀 ~ registerUser ~ data:", data);
};
export const loginUser = (req: Request, res: Response) => {};
