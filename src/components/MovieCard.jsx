import React from 'react';
import he from 'he';
import _ from 'lodash';
import { Card, Image } from 'semantic-ui-react';

const MovieCard = ({ movie, i }) => {
  return (
    <Card data-cy={`movie-${i}`}>
      <Image src={movie.img} />
      <Card.Content>
        <Card.Header data-cy='title-header'>
          {he.decode(movie.title)}
        </Card.Header>
        <Card.Description>
          Rating: {_.round(movie.avgrating, 1)}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default MovieCard;
