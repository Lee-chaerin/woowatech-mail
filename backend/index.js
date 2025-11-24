import express from "express";
import dotenv from "dotenv";
import cron from "node-cron";
import cors from "cors";

dotenv.config();

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import { generateInterviewQA } from "./controller/aiController.js";
import { sendNewsletter } from "./services/techletterService.js";

const app = express();
const port = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/ai", aiRoutes);

app.listen(port);

cron.schedule(
  "00 00 * * *",
  async () => {
    console.log("면접 질문 자동 생성 시작...");
    const categories = [1, 2, 3, 4];

    for (const category of categories) {
      await generateInterviewQA(category);
    }

    console.log("오늘의 면접 질문 생성 완료");
  },
  {
    timezone: "Asia/Seoul",
  },
);

cron.schedule(
  "00 07 * * *",
  async () => {
    console.log("면접 레터 발송 시작...");

    try {
      await sendNewsletter();
      console.log("면접 레터 발송 작업 완료");
    } catch (error) {
      console.error("면접 레터 발송 중 오류 발생: ", error);
    }
  },
  {
    timezone: "Asia/Seoul",
  },
);
