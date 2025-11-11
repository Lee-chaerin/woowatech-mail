import express from "express";
import dotenv from "dotenv";
import { db } from "./db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("연결 성공");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(PORT);
});