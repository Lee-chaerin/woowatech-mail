import express from "express";
import { createUser } from "../controller/emailController.js";

const router = express.Router();

router.post("/", createUser);

export default router;
