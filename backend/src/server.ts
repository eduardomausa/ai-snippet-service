import "reflect-metadata";
import "./configuration/container";
import dotenv from "dotenv";
import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
