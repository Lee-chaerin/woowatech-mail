import express from "express";
import { generateInterviewQAHandler } from "../controller/aiController.js";

const router = express.Router();

router.post("/generate", generateInterviewQAHandler);

export default router;
