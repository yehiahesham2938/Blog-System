const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const post = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", post);


router.post("/", async (request, response) => {
  try {
    const newPost = new Post(request.body);
    await newPost.save();
    response.status(201).json(newPost);
  } catch (error) {
    response.status(500).json({ message: "Failed to create post", error: error.message });
  }
});


router.get("/", async (request, response) => {
  try {
    const getposts = await Post.find();
    response.json(getposts);
  } catch (error) {
    response.status(500).json({ message: "Failed to retrieve posts", error: error.message });
  }
});


router.put("/:id", async (request, response) => {
  try {
    const updatepost = await Post.findByIdAndUpdate(request.params.id, request.body, { new: true });
    if (!updatepost)
        {
            return response.status(404).json({ message: "Post not found" });
    
        } response.json(updatepost);
  } catch (err) {
    response.status(500).json({ message: "Failed to update post", error: err.message });
  }
});


router.delete("/:id", async (request, response) => {
  try {
    const deletepost = await Post.findByIdAndDelete(request.params.id);
    if (!deletepost)
        {
            return response.status(404).json({ message: "Post not found" });
        } response.status(204).send();
  } catch (error) {
    response.status(500).json({ message: "Failed to delete post", error: error.message });
  }
});

module.exports = router;
