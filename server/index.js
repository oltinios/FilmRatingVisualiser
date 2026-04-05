// index.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // or remove if Node 18+ (fetch is built-in)
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// search route
app.get("/search/movie", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Query required" });

  try {
    // Use v3 API key in query param
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query
    )}&api_key=${process.env.TMDB_API_KEY}`;

    console.log("Fetching TMDB URL:", url);

    const response = await fetch(url);
    if (!response.ok) {
      console.error("TMDB returned status", response.status);
      return res.status(500).json({ error: "TMDB fetch failed" });
    }

    const data = await response.json();
    console.log("TMDB returned results:", data.results?.length);
    res.json(data);
  } catch (err) {
    console.error("TMDB fetch error:", err);
    res.status(500).json({ error: "TMDB fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});