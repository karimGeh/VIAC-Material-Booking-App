import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { UserDoc } from "../models";

export const requireToBeAuthor = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  if (
    req.q_authUser._id.toString() !==
    (req.q_reservation.author as UserDoc)._id.toString()
  ) {
    throw new NotAuthorizedError();
  }

  next();
};
