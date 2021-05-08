describe('client can send users geolocation to API', () => {
  describe('Successfully', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        'https://worldwidenetflix.herokuapp.com/api/movies/?lat=55.7842&long=12.4518',
        {
          fixture: 'top10movies.json',
        }
      );
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
			cy.get('[data-cy=error-message]').should('not.exist')
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

  describe('Unsuccessfully', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        'https://worldwidenetflix.herokuapp.com/api/movies/',
        {
          fixture: 'globalTop10Movies.json',
        }
      );
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
      cy.get('[data-cy=error-message]').should(
        'contain',
        "Allow your location to show movies that's not from your country"
      );
      cy.get('[data-cy=movie-container]').within(() => {
        cy.get('[data-cy=movie-0]').within(() => {
          cy.get('[data-cy=title-header]').should(
            'contain',
            'The Intouchables'
          );
        });
      });
    });
  });
});
