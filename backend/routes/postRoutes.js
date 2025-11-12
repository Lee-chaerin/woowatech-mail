import express from "express";
import { createPost, deletePost, getAllPosts, getPostsByCategoryId, getPostById, updatePost } from "../controller/postController.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/category/:categoryId", getPostsByCategoryId);
router.get("/:id", getPostById);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);


export default router;
