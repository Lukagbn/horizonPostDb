const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const { title, image, description, category, userId } = req.body;
    const newPost = await Post({ title, image, description, category, userId });
    await newPost.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
