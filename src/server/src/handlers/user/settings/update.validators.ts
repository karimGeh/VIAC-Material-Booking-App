import { ValidationChain, body } from "express-validator";

export const updateUserInfoValidators: ValidationChain[] = [
  body("fullName")
    .isLength({ min: 6, max: 50 })
    .withMessage("Full name must be between 6 and 50 characters"),
  body("code")
    .isLength({ min: 7, max: 10 })
    .withMessage("id must be between 7 and 10 characters"),
  body("phoneNum")
    .optional()
    .isLength({ min: 10, max: 10 })
    .isNumeric()
    .withMessage("Phone number must be 10 numbers"),
];

export const updatePasswordValidators: ValidationChain[] = [
  body("oldPassword").notEmpty().withMessage("Old password is required"),
  body("newPassword")
    .isLength({ min: 6, max: 50 })
    .withMessage("New password is required"),
];
