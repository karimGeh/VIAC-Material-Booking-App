import { RequestHandler } from "express";
import { Pin, User } from "../../../models";
import { UserTypes } from "../../../enums/UserTypes";
import { NotFoundError } from "../../../errors/not-found-error";
import { PinTypes } from "../../../enums/PinTypes";

export const register: RequestHandler = async (req, res) => {
  const { fullName, code, phoneNum, email, password } = req.body;

  const newUser = User.build({
    fullName,
    code,
    phoneNum,
    email,
    password,
    type: UserTypes.pending,
  });

  await newUser.save();

  return res.status(201).send({
    success: true,
    user: newUser,
  });
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new NotFoundError("Wrong password");
  }

  const auth_token = user.generateAuthToken();

  return res.status(200).send({
    success: true,
    user,
    auth_token,
  });
};

export const logout: RequestHandler = async (req, res) => {
  return res.status(200).send({
    success: true,
    message: "Logout successfully",
  });
};

export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const code = await Pin.generateNewCode(6);

  const newPin = Pin.build({
    code,
    access: [user],
    type: PinTypes.resetPassword,
    expiresAt: new Date(Date.now() + 30 * 60 * 1000), // expires after 30 minutes
  });

  await newPin.save();

  // TODO: Send email to user

  return res.status(200).send({
    success: true,
  });
};

export const verifyResetPasswordCode: RequestHandler = async (req, res) => {
  const { code } = req.body;

  const pin = await Pin.findOne({ code, type: PinTypes.resetPassword });
  if (!pin) {
    throw new NotFoundError("Invalid code");
  }

  const pinToken = pin.generatePinToken();

  return res.status(200).send({
    success: true,
    pinToken,
  });
};

export const resetPassword: RequestHandler = async (req, res) => {
  const { pinToken, password } = req.body;

  const pin = await Pin.verifyPinToken(pinToken);
  if (!pin) {
    throw new NotFoundError("Invalid pin token");
  }

  const user = await User.findById(pin.access[0]);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  user.password = password;
  await user.save();

  return res.status(200).send({
    success: true,
    user,
  });
};

export const currentUser: RequestHandler = async (req, res) => {
  return res.status(200).send({
    success: true,
    user: req.q_authUser,
  });
};
