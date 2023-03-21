import express from "express";
import { NotFoundError } from "../errors/not-found-error";

// routers
import { userRouter } from "./user";
import { bookingRouter } from "./booking";
import { materialRouter } from "./material";

const router = express.Router();

//! API routes
router.use("/user", userRouter);
router.use("/booking", bookingRouter);
router.use("/material", materialRouter);

// status
router.get("/status", async (_, res) => {
  return res.send("server up and running ✔✔");
});

router.all("*", async () => {
  throw new NotFoundError("route not found");
});

export { router as mainRouter };
