describe('Visitor can see top 100 movies', () => {
  describe('successfully', () => {
    before(() => {
      let interceptCount = 0;
      cy.intercept(
        'https://worldwidenetflix.herokuapp.com/api/movies/?lat=55.7842&lon=12.4518',
        (req) => {
          req.reply((res) => {
            if (interceptCount === 0) {
              interceptCount += 1;
              res.send({ fixture: 'top10Movies.json' });
            } else {
              res.send({ fixture: 'top100Movies.json' });
            }
          });
        }
      );

      cy.intercept('POST', 'https://worldwidenetflix.herokuapp.com/api/auth/', {
        fixture: 'user_registration.json',
      });
    });

    it('is expected to show the registration form', () => {
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
      cy.get('[data-cy=movie-container]').find('img').should('have.length', 10)
      cy.get('[data-cy=login-btn]').click();
      cy.get('[data-cy=login-modal-header]').should('be.visible');
      cy.get('[data-cy=login-modal-content]').within(() => {
        cy.get('[data-cy=registration-email-input]').type(
          'bob.kramer@hotmail.com'
        );
        cy.get('[data-cy=registration-password]').type('password');
        cy.get('[data-cy=registration-confirmation-password]').type('password');
        cy.get('[data-cy=form-register-btn]').click();
      });
      cy.get('[data-cy=movie-container]').find('img').should('have.length', 100);
    });
  });
});
