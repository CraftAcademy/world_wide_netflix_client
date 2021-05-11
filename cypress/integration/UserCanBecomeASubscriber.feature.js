describe('User can become a Subscriber', () => {
  describe('successfully', () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: 'GET',
        url: 'https://worldwidenetflix.herokuapp.com/api/movies/',
        response: 'fixture:top100Movies.json',
      });
      cy.route({
        method: 'POST',
        url: 'https://worldwidenetflix.herokuapp.com/api/auth',
        response: 'fixture:user_registration.json',
      });
      cy.route({
        method: 'POST',
        url: 'https://worldwidenetflix.herokuapp.com/api/subscriptions',
        response: 'fixture:successful_payment.json',
      });
      cy.route({
        method: 'GET',
        url: 'https://worldwidenetflix.herokuapp.com/api/movies/?query=godfather',
        response: 'fixture:godfather.json',
      })
      cy.route({
        method: 'GET',
        url: 'https://worldwidenetflix.herokuapp.com/api/auth/validate_token',
        response: 'fixture:sign_in.json',
      });
      
      cy.visit('/');
      cy.get('[data-cy=login-btn]').click();
      cy.get('[data-cy=registration-email-input]').type('user@gmail.com');
      cy.get('[data-cy=registration-password]').type('password');
      cy.get('[data-cy=registration-confirmation-password]').type('password');
      cy.get('[data-cy=form-register-btn]').click();
      
    });

    it('by filling in the correct card details', () => {
      cy.get('[data-cy=subscribe-btn]').click();
      cy.get('[data-cy=subscriber-form]').within(() => {
        cy.wait(1000);

        cy.get('[data-cy=card-number]').within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body)
              .find('input[name="cardnumber"]')
              .type('4242424242424242', { delay: 50 });
          });
        });
        cy.get('[data-cy=expirydate]').within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body)
              .find('input[name="exp-date"]')
              .type('0525', { delay: 50 });
          });
        });
        cy.get('[data-cy=cvc]').within(() => {
          cy.get('iframe[name^="__privateStripeFrame"]').then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('input[name="cvc"]').type('424', { delay: 50 });
          });
        });
        cy.get('[data-cy=submit-payment]').click();        
      });
			cy.get('[data-cy=success-message]').should(
				'contain',
				'Thank you for subscribing!'
			);
      cy.get('[data-cy=search-input]').type('godfather')
      cy.get('[data-cy=search-btn]').click()

      cy.get('[data-cy=movie-container]').find('img').should('have.length', 1);
      cy.get('[data-cy=movie-container]').within(() => {
        cy.get('[data-cy=movie-0]').within(() => {
          cy.get('[data-cy=title-header]').should(
            'contain',
            'The Godfather'
          );
          cy.get('[data-cy=flag-list]').find('i').should('have.length', 10);
          cy.get('[data-cy=netflix-link]').should('contain.text', '/title/60011152')
        });
      })
    });
  });
});
