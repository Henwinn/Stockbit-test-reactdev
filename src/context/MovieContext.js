import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const MovieContext = createContext();

const API_KEY = "faf7e5bb"; // OMDb API Key

const MovieApp = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [searchData, setSearchData] = useState("");  


  const fetchMovies = async (searchValue, page) => {
    try {
      let url;
      if ((page != null) & (page > 1)) {
        url =
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}&page=` +
          page;
      } else {
        url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchValue}`;
      }
     
      const response = await axios.get(url);
      const data = response.data;
      return data; 
  
    } catch (error) {
      throw error;
    }
  };

  const removeFavoriteMovie = (movie) => {
    movie.isFavorite = false;
    const newFavoriteList = favorites.filter(
      (fav) => fav.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
  };

  const addFavoriteMovie = (movie) => {
    movie.isFavorite = true;
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
  };

  const favoriteHandler = (movie, e) => {
    e.preventDefault();
    if (favorites.includes(movie)) {
      removeFavoriteMovie(movie);
    } else {
      addFavoriteMovie(movie);
    }
  };

  const showDetail = async (id) => {
    const response = await axios(
      `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    );
    const data = response.data;
    setSelectedMovie(data);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        favorites,
        setMovies,
        favoriteHandler,
        showDetail,
        selectedMovie,
        fetchMovies,
        setSearchData,
        searchData,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieApp;
