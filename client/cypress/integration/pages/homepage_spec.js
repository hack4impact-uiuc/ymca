/// <reference types="cypress" />

context('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads', () => {
    cy.visit('/');
  });

  it('correct page title', () => {
    cy.title().should('eq', 'NAWC Resource Center');
  });

  it('find resources button redirects to /resources', () => {
    cy.get('.ant-btn-primary');
    cy.get('.ant-btn-primary').click();
    cy.url().should('match', /resources/);
  });
});
