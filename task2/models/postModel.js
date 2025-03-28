const express = `require("express")`;
const PostSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now },
  commentCount: Number,
});


exports.PostSchema = PostSchema;