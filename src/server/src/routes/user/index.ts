import { Router } from "express";
import { userAuthRouter } from "./auth";

const router = Router();

router.use("/auth", userAuthRouter);

export { router as userRouter };
