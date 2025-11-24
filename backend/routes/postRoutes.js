import express from "express";
import { createPost, getAllPosts, getPagePosts, getPostById } from "../controller/postController.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/category/:categoryId", getPagePosts);
router.get("/:id", getPostById);

export default router;
