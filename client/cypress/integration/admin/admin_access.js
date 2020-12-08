/// <reference types="cypress" />

context('Admin Access', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('unauthenticated admin access redirects to login', () => {
    cy.visit('/admin');
    cy.url().should('match', /login/);
  });
});
