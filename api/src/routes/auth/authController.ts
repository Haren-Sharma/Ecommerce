import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { hash, compare } from "bcrypt";
import { db } from "../../db";
import { usersTable } from "../../db/usersSchema";
import { eq } from "drizzle-orm";

export const registerUser = async (req: Request, res: Response) => {
  const myId = uuidv4();
  const data = req.cleanBody;
  data.id = myId;
  try {
    data.password = await hash(data.password, 10);
    console.log("🚀 ~ registerUser ~ data:", data);
    const [user] = await db.insert(usersTable).values(data).returning();
    delete user.password; //ts ignore

    /*
    The delete user.password; line in your registerUser function removes the password 
    property from the user object before sending it back in the response.
    */
    res.status(201).json(user);
  } catch (err) {
    res.status(400).send(err);
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.cleanBody;
    console.log(email,password);
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
        res.status(200).send("User succesfully logged in");
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
