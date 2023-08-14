import { ValidationChain, body } from "express-validator";

export const adminLoginValidators: ValidationChain[] = [
  body("email")
    .exists()
    .isLength({ min: 6, max: 50 })
    .withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 6, max: 50 })
    .withMessage("Password not valid"),
];
