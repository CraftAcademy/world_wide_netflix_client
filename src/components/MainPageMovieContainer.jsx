import React, { useState, useEffect } from 'react';
import { Card, Container } from 'semantic-ui-react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const MainPageMovieContainer = () => {
  const [topTenMovies, setTopTenMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);

  const getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const fetchMovieData = async () => {
    try {
      const pos = await getPosition();
      const { latitude, longitude } = pos.coords;
      if (latitude && longitude) {
        const response = await axios.get(
          `/movies/?lat=${latitude}&lon=${longitude}`
        );
        setTopTenMovies(response.data.body);
        setErrorMessage('');
      }
    } catch (error) {
      if (error.message === 'User denied Geolocation') {
        const response = await axios.get(`/movies/`);
        setTopTenMovies(response.data.body);
        setErrorMessage(
          "Allow your location to show movies that's not from your country"
        );
      } else if (error.status === 500) {
        setErrorMessage(
          'Please try again later, our servers are currently not responding'
        );
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, []);

  let movieList = topTenMovies.map((movie, i) => {
    return <MovieCard data-cy='movie-card' movie={movie} i={i} />;
  });

  return (
    <Container>
      {errorMessage && <h1 data-cy='error-message'>{errorMessage}</h1>}
      <Card.Group data-cy='movie-container' itemsPerRow={5} centered>
        {movieList}
      </Card.Group>
    </Container>
  );
};

export default MainPageMovieContainer;
