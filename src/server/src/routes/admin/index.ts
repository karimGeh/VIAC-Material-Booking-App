import { Router } from "express";
import { adminUsersRouter } from "./users";

const router = Router();

router.use("/users", adminUsersRouter);

export { router as adminRouter };
