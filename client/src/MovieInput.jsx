import React, { useState, useEffect } from "react";

export default function MovieInput() {
  const [query, setQuery] = useState("");
  const [dropdown, setDropdown] = useState([]);

  // Use your token from .env (VITE_ prefix is required for Vite)
  const token = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    if (!query) {
      setDropdown([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        const res = await fetch(
            `http://localhost:5000/search/movie?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setDropdown(data.results.slice(0, 5)); 
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };

    fetchMovies();
  }, [query, token]);

  const handleSelect = (movie) => {
    alert(`You selected: ${movie.title} (${movie.release_date?.slice(0,5)})`);
    setQuery("");
    setDropdown([]);
  };

  return (
    <div style={{ position: "relative", width: "250px", margin: "20px auto" }}>
      <input
        type="text"
        placeholder="Type a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "8px", fontSize: "16px" }}
      />
      {dropdown.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            border: "1px solid #aaa",
            background: "#fff",
            position: "absolute",
            top: "38px",
            width: "100%",
            zIndex: 10,
          }}
        >
          {dropdown.map((movie) => (
            <li
              key={movie.id}
              onClick={() => handleSelect(movie)}
              style={{ padding: "5px", cursor: "pointer" }}
            >
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}