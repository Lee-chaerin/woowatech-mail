import express from "express";
import { sendVerifyCode, checkVerifyCode, getAllUsers, getUserByEmail, getUserById, deleteUser} from "../controller/userController.js";

const router = express.Router();

router.post("/sendcode", sendVerifyCode);
router.post("/checkcode", checkVerifyCode);
router.get("/", getAllUsers);
router.post("/email", getUserByEmail);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;
