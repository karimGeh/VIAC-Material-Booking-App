import { Router } from "express";

const router = Router();

router.use("/auth");

export { router as userRouter };
