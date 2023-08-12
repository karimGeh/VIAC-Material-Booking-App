import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { UserTypes } from "../enums/UserTypes";

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

export const requireAdmin = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  if (!req.q_authUser) {
    throw new NotAuthorizedError();
  }

  if (
    ![
      UserTypes.admin,
      UserTypes.superAdmin,
    ].includes(req.q_authUser.type)
  ) {
    throw new NotAuthorizedError();
  }

  next();
}
