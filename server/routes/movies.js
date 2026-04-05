import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// GET /search/movie
router.get("/movie", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Query required" });

  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${process.env.TMDB_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "TMDB fetch failed" });
  }
});

export default router;