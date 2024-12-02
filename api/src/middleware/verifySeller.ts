import { NextFunction, Request, Response } from "express";

export const verifySeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  const { role } = user;
  if (role === "seller") {
    next();
  } else {
    res.status(400).json({msg:"You don't have access.Seller's only.",user});
  }
};
