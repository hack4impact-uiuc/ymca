/// <reference types="Cypress" />

context('Navbar', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has nav bar', () => {
    cy.get('.nav-desktop');
  });

  it('first link (logo) redirects to home', () => {
    cy.visit('/resources');
    cy.get('header > a').click({ force: true });
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('navigation has 3 text links', () => {
    cy.get('.ant-menu > li > a').should('have.length', 3);
  });

  it('first link redirects to home', () => {
    cy.visit('/resources');
    cy.get('.ant-menu > li > a')
      .eq(0)
      .click({ force: true });
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });

  it('second link redirects to resources', () => {
    cy.get('.ant-menu > li > a')
      .eq(1)
      .click({ force: true });
    cy.url().should('match', /resources/);
  });

  it('third link redirects to login', () => {
    cy.get('.ant-menu > li > a')
      .eq(2)
      .click({ force: true });
    cy.url().should('match', /login/);
  });
});
