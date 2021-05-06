import React, { useState, useEffect } from 'react';
import { Card, Container, Image, Grid } from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import he from 'he';

const MainPageMovieContainer = () => {
	const [topTenMovies, setTopTenMovies] = useState([]);

	const fetchMovieData = async () => {
		await axios.get('/movies').then((res) => {
			const movies = res.data.results;
			setTopTenMovies(movies);
		});
	};

	useEffect(() => {
		fetchMovieData();
	}, []);

	return (
		<Container>
			<Grid data-cy='movie-container'>
				<Grid.Row columns={5} stretched padded>
					{topTenMovies.map((movie, i) => (
						<Grid.Column>
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
						</Grid.Column>
					))}
				</Grid.Row>
			</Grid>
		</Container>
	);
};

export default MainPageMovieContainer;
