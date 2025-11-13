import express from "express";
import { createUser, deleteUser, getAllUsers, getUserByEmail, getUserById, sendVerifyMail, verifyCode } from "../controller/userController.js";

const router = express.Router();

router.post("/send", sendVerifyMail);
router.post("/varify", verifyCode);
router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/email", getUserByEmail);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;
