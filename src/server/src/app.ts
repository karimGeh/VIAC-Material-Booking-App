import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import path from "path";

//? models

//? middleware
import { errorHandler } from "./middlewares/error-handler";
import { currentUser } from "./middlewares/current-user";

//? Routes
import { mainRouter } from "./routes";
import {
  MaterialCategoryDoc,
  MaterialDoc,
  ReservationDoc,
  UserDoc,
} from "./models";

//? global declaration
declare global {
  namespace Express {
    interface Request {
      q_authUser: UserDoc;
      q_user: UserDoc;
      q_reservation: ReservationDoc;
      q_material: MaterialDoc;
      q_materialCategory: MaterialCategoryDoc;
    }
  }
}

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use(morgan("dev"));

app.use(currentUser);
// public files
// app.use("/public", express.static(path.join(__dirname, "public")));

//!
//! routes - start
app.use("/api/v1", mainRouter);
app.use("/", express.static(path.join(__dirname, "..", "client")));

//! routes - end
//!

app.all("*", async (_, res) => {
  return res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.use(errorHandler);

export default app;
