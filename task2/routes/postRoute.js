app.get("/posts", async (req, res) => {
    try {
      const { type } = req.query;
      if (type === "popular") {
        const popularPosts = await Post.find().sort({ commentCount: -1 });
        res.json(popularPosts);
      } else if (type === "latest") {
        const latestPosts = await Post.find().sort({ createdAt: -1 }).limit(5);
        res.json(latestPosts);
      } else {
        res.status(400).json({ error: "Invalid type parameter" });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  