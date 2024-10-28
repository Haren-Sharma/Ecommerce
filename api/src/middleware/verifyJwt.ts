import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.token as string; // Cast token to string

  if (!token) {
    res.status(401).json({ error: "Token not provided" });
  } else {
    jwt.verify(token, process.env.JWT_KEY!, (err, decoded) => {
      if (err) {
        res.status(403).json({ error: "Invalid token" });
      }

      // Optionally attach decoded info to the request object for use in the route
      req.user = decoded;
      next();
    });
  }
};
