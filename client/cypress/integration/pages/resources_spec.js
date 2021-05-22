/// <reference types="cypress" />

context('Home page', () => {
    beforeEach(() => {
      cy.visit('/resources');
    });
  
    it('successfully loads', () => {
      cy.visit('/resources');
    });
  
    it('correct page title', () => {
      cy.title().should('eq', 'NAWC Resource Center');
    });
  
    it('click logo redirects to /', () => {
      // TODO
    });
  });
  