app.get("/users", async (req, res) => {
    try {
      const topUsers = await User.find().sort({ postCount: -1 }).limit(5);
      res.json(topUsers);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });