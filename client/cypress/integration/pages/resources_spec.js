/// <reference types="cypress" />

context('Resources page', () => {
  beforeEach(() => {
    cy.visit('/resources', { timeout: 10000 });
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

context('Resources category filtering', () => {
  beforeEach(() => {
    cy.visit('/resources', { timeout: 10000 });
  });

  it('all resources redirects to /resources', () => {
    cy.get('.ant-menu').eq(1).find('li').click({ force: true });
    cy.url().should('match', /resources/);
  });

  it('citizenship redirects to /resources?category=Citizenship', () => {
    cy.get('div[title=Citizenship]').click({ force: true });
    cy.url().should('include', '/resources?category=Citizenship');
  });

  it('education redirects to /resources?category=Education', () => {
    cy.get('div[title=Education]').click({ force: true });
    cy.url().should('include', '/resources?category=Education');
  });

  it('finances redirects to /resources?category=Finances', () => {
    cy.get('div[title=Finances]').click({ force: true });
    cy.url().should('include', '/resources?category=Finances');
  });

  it('healthcare redirects to /resources?category=Healthcare', () => {
    cy.get('div[title=Healthcare]').click({ force: true });
    cy.url().should('include', '/resources?category=Healthcare');
  });

  it('home redirects to /resources?category=Home', () => {
    cy.get('div[title=Home]').click({ force: true });
    cy.url().should('include', '/resources?category=Home');
  });

  it('legal redirects to /resources?category=Legal', () => {
    cy.get('div[title=Legal]').click({ force: true });
    cy.url().should('include', '/resources?category=Legal');
  });

  it('other redirects to /resources?category=Other', () => {
    cy.get('div[title=Other]').click({ force: true });
    cy.url().should('include', '/resources?category=Other');
  });

  it('treatment redirects to /resources?category=Treatment', () => {
    cy.get('div[title=Treatment]').click({ force: true });
    cy.url().should('include', '/resources?category=Treatment');
  });
});
