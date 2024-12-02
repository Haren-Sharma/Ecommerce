import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { hash, compare } from "bcrypt";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/usersSchema.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const myId = uuidv4();
  const data = req.cleanBody;
  data.id = myId;
  try {
    data.password = await hash(data.password, 10);
    const [user] = await db.insert(usersTable).values(data).returning();
    const {password,...userWithoutPass}=user;
    res.status(201).json(userWithoutPass);
  } catch (err) {
    res.status(400).send(err);
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.cleanBody;
    console.log(email, password);
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    console.log("🚀 ~ loginUser ~ user:", user);
    if (!user) {
      res.status(401).send("User Not Found");
    } else {
      console.log("Haren");
      const match = await compare(password, user.password);
      console.log(match);
      if (match) {
        const token = jwt.sign({userId:user.id,role:user.role}, process.env.JWT_KEY!, { expiresIn: "1h" });
        res.status(200).json({ msg: "User signed in successfully", token });
      } else {
        res.status(400).send("Password incoorect");
      }
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const data = await db.select().from(usersTable);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(err);
  }
};
