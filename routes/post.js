const express = require("express");
const router = express.Router();
const uploadCloud = require("../middleware/cloudinary.js");
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/", uploadCloud.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image file." });
    }
    const { title, description, category, userId } = req.body;
    const image = req.file.path;
    const newPost = new Post({ title, image, description, category, userId });
    await newPost.save();
    return res.status(201).json({
      success: true,
      message: "Post created successfully!",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
