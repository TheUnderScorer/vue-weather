/// <reference types="cypress" />

describe( 'Home tests', () =>
{
    it( 'Visits the app root url', () =>
    {
        cy.visit( '/' );
        cy.contains( 'div', 'Weather' );
    } );
} );
