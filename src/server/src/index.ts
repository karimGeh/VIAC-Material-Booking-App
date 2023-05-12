import dotenv from "dotenv";
import app from "./app";
import { connectToDatabase } from "./db";
import { verifyEnvironmentCheck } from "./validators/kick-off.validators";

dotenv.config();

const { DB_CONNECTION_STRING, PORT } = process.env;

const start = async () => {
  console.clear();

  verifyEnvironmentCheck();
  await connectToDatabase(DB_CONNECTION_STRING);

  // start the App
  const prot = PORT || 5000;
  app.listen(prot, () => {
    console.log(`SERVER UP AND LISTENING ON PORT ${prot}!`);
    console.log(`server status : GET http://127.0.0.1:${prot}/api/v1/status`);
  });
};

start();
