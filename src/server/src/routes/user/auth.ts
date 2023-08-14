import { Router } from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import {
  adminLogin,
  currentUser,
  forgotPassword,
  forgotPasswordValidators,
  login,
  loginValidators,
  logout,
  register,
  registerValidators,
  resetPassword,
  resetPasswordValidators,
  verifyResetPasswordCode,
  verifyResetPasswordCodeValidators,
} from "../../handlers/user/auth";

const router = Router();

router.get("/current-user", requireAuth, validateRequest, currentUser);

router.post("/login", loginValidators, validateRequest, login);
router.post("/admin-login", loginValidators, validateRequest, adminLogin);
router.post("/register", registerValidators, validateRequest, register);
router.post("/logout", logout);
router.post(
  "/forgot-password",
  forgotPasswordValidators,
  validateRequest,
  forgotPassword
);
router.post(
  "/verify-reset-password-code",
  verifyResetPasswordCodeValidators,
  validateRequest,
  verifyResetPasswordCode
);
router.post(
  "/reset-password",
  resetPasswordValidators,
  validateRequest,
  resetPassword
);

export { router as userAuthRouter };
