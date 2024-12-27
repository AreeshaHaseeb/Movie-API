import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const App = () => {

  const [movies, setMovies] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { 
    const fetchMovies = async () => { 
      try {
          const response = await axios.get(
            "https://api.themoviedb.org/3/movie/popular", 
            {
              params: {
                api_key: import.meta.env.VITE_API_KEY,
              },
              }
            );
            setMovies(response.data.results); 
          } catch (error) {
            console.error("Error fetching movies:", error);
          }
        };
        fetchMovies();
  }, []);
  const handleSearch = () => {
    setSearchQuery(search); 
  };
  
  const filteredMovies = searchQuery
  ? movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];
    return (
      <div>
          <nav className="navbar">
            <div className="logo">
              <h2>Seker</h2>
            </div>
            <div className="links">
              <a href="#">Images</a>
              <a href="#">Videos</a>
              <a href="#">Maps</a>
              <a href="#">News</a>
              <a href="#">Product</a>
            </div>
            <div className="signin">
              <a href="#">Sign in ▼</a>
            </div>
          </nav>
      <div className="search-container">
      <div className="search-wrapper">
      <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="How to design"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          </div>
      </div>
      <div class="container">
  <div class="item">
    <img src="clock-icon.png" alt="icon" />
    <p>How to design</p>
  </div>

  <div class="item">
    <img src="clock-icon.png" alt="icon" />
    <p>How to work hard</p>
  </div>

  <div class="item">
    <img src="clock-icon.png" alt="icon" />
    <p>How to choose font</p>
  </div>

  <div class="item">
    <img src="clock-icon.png" alt="icon" />
    <p>How to choose color palette</p>
  </div>
</div>

        <ul>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <li key={movie.id}>
                  <h3>{movie.title}</h3>
                  <p>Release Date: {movie.release_date}</p>
                  <p>Rating: {movie.vote_average}</p>
                </li>
              ))
            ) : (
              <p></p>
            )}
        </ul>
    </div>
  )
};


export default App;