describe('Visitor can see top 10 movies', () => {
	describe('successfully', () => {
		before(() => {
			cy.intercept('GET', 'https://worldwidenetflix.herokuapp.com/api/movies', {
				fixture: 'top10movies.json',
			});
		});
		it('is expected to opend the main page', () => {
			cy.visit('/');
		});

		it('is expected to show a list of top 10 global movies', () => {
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
			cy.intercept(
				'GET',
				'https://worldwidenetflix.herokuapp.com/api/movies',
				{ status: 500 },
				{
					response: { message: 'Something went wrong, please try again later' },
				}
			);
		});
		it('is expected to give http error 500', () => {
			cy.get('[data-cy="error-message"]').should(
				'contain',
				'Something went wrong, please try again later'
			);
		});
	});
});
