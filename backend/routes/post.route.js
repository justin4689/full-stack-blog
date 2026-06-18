import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
} from "../controllers/post.controller.js";
import increaseVisit from "../middlewares/increaseVisit.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth);
router.get("/", getPosts);
router.get("/:slug", increaseVisit, getPost);
router.post("/", verifyToken, createPost);
router.delete("/:id", verifyToken, deletePost);
router.patch("/feature", verifyToken, featurePost);

export default router;
