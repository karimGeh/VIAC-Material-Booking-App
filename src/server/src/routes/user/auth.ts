import { Router } from "express";

const router = Router();

router.get("/current-user");

router.post("/login");
router.post("/register");
router.post("/logout");
router.post("/forgot-password");
router.post("/verify-reset-password-code");
router.post("/reset-password");

export { router as userAuthRouter };
