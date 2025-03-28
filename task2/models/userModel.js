const express = `require("express")`;
const UserSchema = new mongoose.Schema({
  name: String,
  postCount: Number,
});

exports.UserSchema = UserSchema();