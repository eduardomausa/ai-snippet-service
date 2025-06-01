import express from "express";
import mongoose from "mongoose";
import snippets from "./routes/snippets";

const app = express();

app.use(express.json());
app.use("/snippets", snippets);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

export default app;
