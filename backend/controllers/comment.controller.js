import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";

export const getPostComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate("user", "username img")
    .sort({ createdAt: -1 });

  res.json(comments);
};

export const addComment = async (req, res) => {
  const newComment = new Comment({
    ...req.body,
    user: req.userId,
    post: req.params.postId,
  });

  const savedComment = await newComment.save();
  res.status(201).json(savedComment);
};

export const deleteComment = async (req, res) => {
  if (req.userRole === "admin") {
    await Comment.findByIdAndDelete(req.params.id);
    return res.status(200).json("Comment has been deleted");
  }

  const deletedComment = await Comment.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });

  if (!deletedComment) return res.status(403).json("You can delete only your comment!");

  res.status(200).json("Comment deleted");
};
