import { RequestHandler } from "express";
import { UserTypes } from "../../enums/UserTypes";

export const getMe: RequestHandler = async (req, res) => {
  const user = req.q_authUser;
  res.send({
    success: true,
    user,
  });
};

export const updateMe: RequestHandler = async (req, res) => {
  const user = req.q_authUser;
  const { fullName, email, phoneNum } = req.body;
  user.fullName = fullName;
  user.email = email;
  user.phoneNum = phoneNum;
  await user.save();
  res.send({
    success: true,
    user,
  });
};

export const makeAdmin: RequestHandler = async (req, res) => {
  const user = req.q_user;
  user.type = UserTypes.admin;
  await user.save();
  res.send({
    success: true,
    user,
  });
};

export const makeSuperAdmin: RequestHandler = async (req, res) => {
  const user = req.q_user;
  user.type = UserTypes.superAdmin;
  await user.save();
  res.send({
    success: true,
    user,
  });
};
