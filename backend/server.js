import express from "express";
import dotenv from "dotenv";
dotenv.config();

import emailRoutes from "./routes/emailRoutes.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("연결 성공");
});

app.use("/api/emails", emailRoutes);

app.listen(process.env.PORT);