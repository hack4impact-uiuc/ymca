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

  it('five partners', () => {
    cy.get('.home-block-4-partner').should('have.length', 5);
  });

  it('first partner links to cufair', () => {
    cy.get('.home-block-4-partner > a')
      .eq(0)
      .should('have.attr', 'href')
      .then(href => {
        expect(href).to.equal('https://www.cu-fair.org/');
      });
  });

  it('second partner links to cuphd', () => {
    cy.get('.home-block-4-partner > a')
      .eq(1)
      .should('have.attr', 'href')
      .then(href => {
        expect(href).to.equal('https://www.c-uphd.org/');
      });
  });

  it('third partner links to cuphd', () => {
    cy.get('.home-block-4-partner > a')
      .eq(2)
      .should('have.attr', 'href')
      .then(href => {
        expect(href).to.equal('https://twitter.com/dharitreee/');
      });
  });

  it('fourth partner links to cuphd', () => {
    cy.get('.home-block-4-partner > a')
      .eq(3)
      .should('have.attr', 'href')
      .then(href => {
        expect(href).to.equal('https://www.threespinners.org/');
      });
  });

  it('fifth partner links to cuphd', () => {
    cy.get('.home-block-4-partner > a')
      .eq(4)
      .should('have.attr', 'href')
      .then(href => {
        expect(href).to.equal('https://www.therefugeecenter-cu.org/');
      });
  });
});
