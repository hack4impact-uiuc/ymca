/// <reference types="cypress" />

context('No Login', () => {
  it('no login /saved redirects to /resources', () => {
    cy.visit('/saved');
    cy.url().should('match', /resources/);
  });
});
