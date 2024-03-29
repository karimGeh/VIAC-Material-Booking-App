import express from "express";
import { NotFoundError } from "../errors/not-found-error";

// routers
import { userRouter } from "./user";
import { reservationsRouter } from "./reservations";
import { materialRouter } from "./material";
import { adminRouter } from "./admin";
import { requireAdmin, requireAuth } from "../middlewares/require-auth";

const router = express.Router();

//! API routes
router.use("/user", userRouter);
router.use("/reservations", requireAuth, reservationsRouter);
router.use("/materials", materialRouter);
router.use("/admin", requireAdmin, adminRouter);

// status
router.get("/status", async (_, res) => {
  return res.send("server up and running ✔✔");
});

router.all("*", async () => {
  throw new NotFoundError("route not found");
});

export { router as mainRouter };
