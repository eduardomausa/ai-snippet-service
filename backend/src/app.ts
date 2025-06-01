import express from "express";
import mongoose from "mongoose";
import snippets from "./routes/snippets";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/snippets", snippets);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

export default app;
