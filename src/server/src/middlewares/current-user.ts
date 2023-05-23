import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export interface UserPayload {
  _id: string;
  type: string;
  code: string;
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
      process.env.JWT__AUTH_SECRET_KEY!
    ) as UserPayload;

    req.q_authUser = await User.findById(payload._id);
  } catch (err) {
    req.q_authUser = null;
  }

  next();
};
