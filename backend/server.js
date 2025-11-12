import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";

dotenv.config();

import emailRoutes from "./routes/emailRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import { generateInterviewQA } from "./controller/aiController.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/emails", emailRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/ai", aiRoutes);

app.listen(port);

cron.schedule("0 0 * * *", async () => {
  console.log("매일 면접 질문 자동 생성 시작...");
  const categories = [1, 2, 3, 4];

  for (const category of categories) {
    await generateInterviewQA(category);
  }

  console.log("오늘의 면접 질문 생성 완료");
});