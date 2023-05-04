import { RequestHandler } from "express";
import { NotAuthorizedError } from "../../../errors/not-authorized-error";

export const updateUserInfo: RequestHandler = async (req, res) => {
  const { fullName, phoneNum } = req.body as {
    [key: string]: string;
  };

  const values = { fullName, phoneNum };

  const user = req.q_authUser;

  for (const key of Object.keys(values) as Array<keyof typeof values>) {
    if (values[key] as string) {
      user[key] = values[key];
    }
  }

  await user.save();

  res.json({
    success: true,
    user,
  });
};

export const updatePassword: RequestHandler = async (req, res) => {
  const { oldPassword, newPassword } = req.body as {
    [key: string]: string;
  };

  const user = req.q_authUser;

  const isMatch = await user.comparePassword(oldPassword);

  if (!isMatch) {
    return new NotAuthorizedError("Wrong password");
  }

  user.password = newPassword;

  await user.save();

  res.json({
    success: true,
    user,
  });
};
