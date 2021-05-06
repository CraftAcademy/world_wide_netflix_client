describe('Visitor can see top 10 movies', () => {
	describe('successfully', () => {
		before(() => {
			cy.intercept('GET', 'https://worldwidenetflix.herokuapp.com/api/movies', {
				fixture: 'top10movies.json',
			});
		});

		it('is expected to show a list of top 10 global movies', () => {
			cy.visit('/');
			cy.get('[data-cy=movie-container]').within(() => {
				cy.get('[data-cy=movie-0]').within(() => {
					cy.get('[data-cy=title-header]').should(
						'contain',
						'The Shawshank Redemption'
					);
				});
			});
		});
	});

	describe('unsuccessfully', () => {
		before(() => {
			cy.intercept('GET', 'https://worldwidenetflix.herokuapp.com/api/movies', {
				statusCode: 500,
				error: '500 Internal Server Error |  0     bytes\n',
			});
		});

		it('is expected to give http error 500', () => {
			cy.visit('/');
			cy.get('[data-cy="error-message"]').should(
				'contain',
				'Request failed with status code 500'
			);
		});
	});
});
