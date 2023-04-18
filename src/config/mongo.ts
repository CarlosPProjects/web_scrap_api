import "dotenv/config";
import { connect } from "mongoose";

async function connectDB(): Promise<void> {
  try {
    await connect(<string>process.env.DB_URI);
    console.log("Database connected");
  } catch (e) {
    console.log(e);
  }
}

export default connectDB;
