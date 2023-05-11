import { RequestHandler } from "express";
import { UserTypes } from "../../enums/UserTypes";
import { User } from "../../models";

export const acceptUser: RequestHandler = async (req, res) => {
  const user = req.q_user;
  user.type = UserTypes.normal;
  await user.save();
  res.send({
    success: true,
    user,
  });
};

export const blockUser: RequestHandler = async (req, res) => {
  const user = req.q_user;
  user.type = UserTypes.blocked;
  await user.save();
  res.send({
    success: true,
    user,
  });
};

export const unblockUser: RequestHandler = async (req, res) => {
  const user = req.q_user;
  user.type = UserTypes.normal;
  await user.save();
  res.send({
    success: true,
    user,
  });
};

export const deleteUser: RequestHandler = async (req, res) => {
  const user = req.q_user;
  await User.deleteOne({ _id: user._id });
  res.send({
    success: true,
    user,
  });
};

export const getNormalUsers: RequestHandler = async (req, res) => {
  const users = await User.find({ type: UserTypes.normal });
  res.send({
    success: true,
    users,
  });
};

export const getBlockedUsers: RequestHandler = async (req, res) => {
  const users = await User.find({ type: UserTypes.blocked });
  res.send({
    success: true,
    users,
  });
};

export const getPendingUsers: RequestHandler = async (req, res) => {
  const users = await User.find({ type: UserTypes.pending });
  res.send({
    success: true,
    users,
  });
};

export const getAdmins: RequestHandler = async (req, res) => {
  const users = await User.find({ type: UserTypes.admin });
  res.send({
    success: true,
    users,
  });
};

export const getSuperAdmins: RequestHandler = async (req, res) => {
  const users = await User.find({ type: UserTypes.superAdmin });
  res.send({
    success: true,
    users,
  });
};

export const getUser: RequestHandler = async (req, res) => {
  const user = req.q_user;
  res.send({
    success: true,
    user,
  });
};

export const updateUser: RequestHandler = async (req, res) => {
  const user = req.q_user;
  const { fullName, code, phoneNum, email } = req.body;
  user.fullName = fullName;
  user.code = code;
  user.phoneNum = phoneNum;
  user.email = email;
  await user.save();
  res.send({
    success: true,
    user,
  });
};

export const updatePassword: RequestHandler = async (req, res) => {
  const user = req.q_user;
  const { password } = req.body;
  user.password = password;
  await user.save();
  res.send({
    success: true,
    user,
  });
};
