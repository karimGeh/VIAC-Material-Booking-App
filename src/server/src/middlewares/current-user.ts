import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export interface UserPayload {
  id: string;
}

export const currentUser = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.headers?.authorization) {
    req.q_authUser = null;
    return next();
  }

  try {
    const payload = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.AUTH_TOKEN!
    ) as UserPayload;

    req.q_authUser = await User.findById(payload.id);
  } catch (err) {
    req.q_authUser = null;
  }

  next();
};
