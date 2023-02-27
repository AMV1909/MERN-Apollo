import { connect, set } from "mongoose";
import { config } from "dotenv";

config();
set("strictQuery", true);

export const connectDB = await connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
