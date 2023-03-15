import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requireAuth = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  if (!req.q_authUser) {
    throw new NotAuthorizedError();
  }

  next();
};
