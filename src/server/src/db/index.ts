import mongoose from "mongoose";

export const connectToDatabase = async (
  database_URI: string
): Promise<boolean> => {
  try {
    await mongoose.connect(database_URI);
    console.log("Connected to MongoDb");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
