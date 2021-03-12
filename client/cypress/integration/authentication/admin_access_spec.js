/// <reference types="cypress" />

context('Admin Access', () => {
  it('unauthenticated /admin access redirects to login', () => {
    cy.visit('/admin');
    cy.url().should('match', /login/);
  });
});
