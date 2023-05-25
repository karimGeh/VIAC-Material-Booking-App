import { ValidationChain, body } from "express-validator";
import { User } from "../../../models";

export const registerValidators: ValidationChain[] = [
  body("fullName")
    .isLength({ min: 6, max: 50 })
    .withMessage("Full name must be between 6 and 50 characters"),
  body("code")
    .isLength({ min: 7, max: 10 })
    .withMessage("id must be between 7 and 10 characters")
    .custom((value) => {
      if (typeof value !== "string") {
        throw new Error("code must be string");
      }

      const code = value.toUpperCase();

      const existingUser = User.findOne({ code });

      if (existingUser) {
        throw new Error("code already exists");
      }

      return true;
    }),
  body("phoneNum")
    .optional()
    .isLength({ min: 10, max: 10 })
    .isNumeric()
    .withMessage("Phone number must be 10 numbers"),
  body("email")
    .isEmail()
    .withMessage("Email must be valid")
    .custom((value) => {
      if (typeof value !== "string") {
        throw new Error("email must be string");
      }

      const existingUser = User.findOne({ email: value.toLocaleLowerCase() });

      if (existingUser) {
        throw new Error("email already exists");
      }

      return true;
    }),
  body("password")
    .isLength({ min: 6, max: 50 })
    .withMessage("Password must be between 6 and 50 characters"),
];

export const loginValidators: ValidationChain[] = [
  body("email")
    .exists()
    .isLength({ min: 6, max: 50 })
    .withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6, max: 50 })
    .withMessage("Password not valid"),
];

export const forgotPasswordValidators: ValidationChain[] = [
  body("email").isEmail().withMessage("Email must be valid"),
];

export const verifyResetPasswordCodeValidators: ValidationChain[] = [
  body("code")
    .isNumeric()
    .isLength({ min: 6, max: 6 })
    .withMessage("Code must be 6 numbers"),
];

export const resetPasswordValidators: ValidationChain[] = [
  body("pinToken").exists().withMessage("Reset password token is required"),
  body("password")
    .isLength({ min: 6, max: 50 })
    .withMessage("Password must be between 6 and 50 characters"),
];
