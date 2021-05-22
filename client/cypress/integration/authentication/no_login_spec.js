/// <reference types="cypress" />

context('No Login', () => {
  it('no login /saved redirects to /resources', () => {
    cy.visit('/saved', {timeout: 10000});
    cy.url().should('match', /resources/);
  });

  it('no login /translations redirects to /login', () => {
    cy.visit('/translations', {timeout: 10000});
    cy.url().should('match', /login/);
  });
});
