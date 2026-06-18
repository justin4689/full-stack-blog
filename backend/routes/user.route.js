import express from "express";
import { getUserSavedPosts, savePost } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/saved", verifyToken, getUserSavedPosts);
router.patch("/save", verifyToken, savePost);

export default router;
