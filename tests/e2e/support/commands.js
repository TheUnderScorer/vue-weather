Cypress.Commands.add( 'locationInput', () => {
    return cy.get( `#location` );
} );

Cypress.Commands.add( 'typeLocation', ( location ) => {
    cy.locationInput().type( location );

    cy.wait( 1000 );

    cy.locationInput().type( '{downarrow}{enter}' );

    cy.wait( 1000 );

    return cy;
} );
