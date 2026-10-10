import mongoose from "mongoose";

export function connectDb() {
  try {
    const mongoUri = process.env.DB_URI;

    if (!mongoUri) {
      throw new Error("The DB_URI is needed");
    }

    const dbb = mongoose.connect(mongoUri);
    console.log("Mongoose Successfully Connected", dbb);
  } catch (err) {
    console.error("Failed to connect to Databaes: ", err);
    process.exit(1);
  }
}
