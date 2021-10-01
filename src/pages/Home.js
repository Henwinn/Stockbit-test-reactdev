import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Input from "../components/Input";
import { MovieContext } from "../context/MovieContext";
import Card from "../components/Card";
import "../styles/Home.css";
import MyVerticallyCenteredModal from "../components/Modal";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const { movies, favoriteHandler, fetchMovies, setMovies, setSearchData, searchData } =
    useContext(MovieContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState(null);

  const [search, setSearch] = useState('batman');

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  // useEffect(() => {
  //   loadMoviesList(page);
  // }, []);

  useEffect(() => {
    if(search !== ""){
      loadMoviesList(page);
    }
   
  }, [search]);

  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if(!noData || !loading) {
        setLoading(true);
        loadMoviesList(page);
      }
    }
  }

  const loadMoviesList = (page) => {
    // setTimeout(() => {
      fetchMovies(search, page)
        .then((res) => {
          let newPage;
          let newList;
          if(searchData === search){
            
            newPage = page + 1;
            newList = movies.concat(res.Search);
          } else {
           
            newPage = 1;
            newList = res.Search;
          }
          
          setMovies(newList);
          setPage(newPage);
          setSearchData(search);
          if(res.Search.length===0)
            setNoData(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() =>{
          setLoading(false);
        })
      // }
    // ,1500);
  }


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const showModal = (movie) => {
    setModalShow(true);
    setSelectedMovie(movie);
  };
  return (
    <div className="home-container">
      <Input handleSearch={handleSearch} />
      {/* conditional rendering */}
      {movies?.length > 0 ? (
        <div className="movies">
          {movies?.map((movie) => {
            return (
              <div>
                <Card
                  key={movie.imdbID}
                  image={movie.Poster}
                  title={movie.Title}
                  year={movie.Year}
                  addFavorite={(e) => favoriteHandler(movie, e)}
                  isFavorite={movie.isFavorite}
                  onClickTitle={(e) => showModal(movie)}
                ></Card>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="search-warning">
          <p>Search Movies</p>
        </div>
      )}

      {loading ? <div className="text-center">loading data ...</div> : ""}
      {noData ? <div className="text-center">no data anymore ...</div> : ""}
      <>
        <MyVerticallyCenteredModal
          movie={selectedMovie}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    </div>
  );
};

export default Home;
