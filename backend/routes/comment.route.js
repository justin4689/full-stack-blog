import express from "express";
import { addComment, deleteComment, getPostComments } from "../controllers/comment.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/:postId", getPostComments);
router.post("/:postId", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);

export default router;
