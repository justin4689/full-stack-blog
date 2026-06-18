import User from "../models/user.model.js";

export const getUserSavedPosts = async (req, res) => {
  const user = await User.findById(req.userId);
  res.status(200).json(user.savedPosts);
};

export const savePost = async (req, res) => {
  const postId = req.body.postId;
  const user = await User.findById(req.userId);

  const isSaved = user.savedPosts.some((p) => p === postId);

  if (!isSaved) {
    await User.findByIdAndUpdate(req.userId, { $push: { savedPosts: postId } });
  } else {
    await User.findByIdAndUpdate(req.userId, { $pull: { savedPosts: postId } });
  }

  res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
};
