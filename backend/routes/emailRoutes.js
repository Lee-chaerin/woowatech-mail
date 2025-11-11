import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById } from "../controller/emailController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;
