describe('client can send users geolocation to API', () => {
	describe('Successfully', () => {
		beforeEach(() => {
			cy.intercept('GET', 'https://worldwidenetflix.herokuapp.com/api/movies', {
				fixture: 'top10movies.json',
			});
		});
		it('loads fake data', () => {
			cy.visit('/', {
				onBeforeLoad(window) {
					const stubLocation = {
						coords: {
							latitude: 55.7842,
							longitude: 12.4518,
						},
					};
					cy.stub(window.navigator.geolocation, 'getCurrentPosition').callsFake(
						(callback) => {
							return callback(stubLocation);
						}
					);
				},
			});
		});

		it('gets users country', () => {
			cy.get('[data-cy=movie-0]').should('contain', 'The Shawshank Redemption');
		});
	});

	describe('Unsuccessfully', () => {
		beforeEach(() => {
			cy.intercept('GET', 'https://worldwidenetflix.herokuapp.com/api/movies', {
				fixture: 'globalTop10Movies.json',
			});
		});
		it('loads fake data', () => {
			cy.visit('/', {
				onBeforeLoad(window) {
					const stubLocation = {
						coords: {
							latitude: null,
							longitude: null,
						},
					};
					cy.stub(window.navigator.geolocation, 'getCurrentPosition').callsFake(
						(callback) => {
							return callback(stubLocation);
						}
					);
				},
			});
		});

		it('gets users country', () => {
			cy.get('[data-cy=movie-0]').should('contain', 'The Intouchables');
		});
	});
});
