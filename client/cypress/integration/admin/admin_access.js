/// <reference types="cypress" />

context('Admin Access', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('unauthenticated admin access redirects to login', () => {
    cy.visit('http://localhost:3000/admin');
    cy.url().should('match', /login/);
  });
});
