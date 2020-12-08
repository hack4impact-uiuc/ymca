/// <reference types="cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it("cy.go() - go back or forward in the browser's history", () => {
    cy.visit('http://localhost:3000/admin');
    cy.url().should('match', /login/);
  });
});
