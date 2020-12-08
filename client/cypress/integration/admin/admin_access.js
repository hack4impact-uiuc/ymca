/// <reference types="cypress" />

context('Admin Access', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('unauthenticated /admin access redirects to login', () => {
    cy.visit('/admin');
    cy.url().should('match', /login/);
  });

  it('unauthenticated /edit-home access redirects to login', () => {
    cy.visit('/edit-home');
    cy.url().should('match', /login/);
  });

  it('unauthenticated /role-approval access redirects to login', () => {
    cy.visit('/role-approval');
    cy.url().should('match', /login/);
  });
});
