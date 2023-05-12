import { RequestParamHandler } from "express";
import { User } from "../models";
import { NotFoundError } from "../errors/not-found-error";

const getUser: RequestParamHandler = async (req, _, next, id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  req.q_user = user;
  next();
};

export default {
  getUser,
};
