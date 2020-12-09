/// <reference types="cypress" />

context('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads', () => {
    cy.visit('/');
  });

  it('find resources button redirects to /resources', () => {
    cy.get('.ant-btn-primary');
    cy.get('.ant-btn-primary').click();
    cy.url().should('match', /resources/);
  });

  it('Advertise link should refer to Contact page', () => {
    cy.get('.home-block-4__partner')
      .eq(1)
      .get('a')
      .should('have.attr', 'href')
      .then(href => {
        cy.visit(href);
      });
  });
});
