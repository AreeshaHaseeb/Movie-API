import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import clockIcon from './assets/clock-icon.png';
import footerIcon1 from './assets/footer-icon.png';
import footerIcon3 from './assets/footer-icon-3.png';



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
      <div className="app-background">
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
          id="input-ID"
          type="text"
          placeholder="Search for a movie!"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
          <button id= "search-id" className="search-button" onClick={handleSearch}>
            Search
          </button>
          </div>
      </div>
      <div className="container">
        <div className="item">
          <img src={clockIcon} alt="icon" />
          <p>Sonic the Hedgehog 3</p>
        </div>

        <div className="item">
          <img src={clockIcon} alt="icon" />
          <p>The Lord of the Rings: The War of the Rohirrim</p>
        </div>

        <div className="item">
          <img src={clockIcon} alt="icon" />
          <p>Mufasa: The Lion King</p>
        </div>

        <div className="item">
          <img src={clockIcon} alt="icon" />
          <p>Gladiator II</p>
        </div>
      </div>
      <ul>
        {searchQuery ? ( 
          filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
                <p>Release Date: {movie.release_date}</p>
                <p>Rating: {movie.vote_average}</p>
                <p>Popularity: {movie.popularity}</p>
                <p>{movie.adult ? "18+" : "All Ages"}</p>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              </li>
            ))
          ) : (
            <p>No movies found! Maybe search for something else?</p>
          )
        ) : null 
        }
      </ul>
        <div className="footer">
          <img src={footerIcon3} alt="footer icon" />
          <img src={footerIcon1} alt="footer icon" />
        </div>
    </div>
  )
};


export default App;