/// <reference types="cypress" />

context('Admin Access', () => {
  it('unauthenticated /admin access redirects to /login', () => {
    cy.visit('/admin', { timeout: 10000 });
    cy.url().should('match', /login/);
  });
});
