import express from "express";
import { NotFoundError } from "../errors/not-found-error";
import { userRouter } from "./user";

const router = express.Router();

//! API routes
router.use("/user", userRouter);

// status
router.get("/status", async (_, res) => {
  return res.send("server up and running ✔✔");
});

router.all("*", async () => {
  throw new NotFoundError("route not found");
});

export { router as mainRouter };
