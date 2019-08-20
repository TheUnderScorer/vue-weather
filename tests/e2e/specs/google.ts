describe( 'Google tests', () =>
{
    it( 'Typing into search input shows suggestions from google maps', () =>
    {
        cy.visit( '/' );

        const input = cy.get( '#location' );
        input.type( 'Katowice' );

        const locationResult = cy.get( '.pac-container .pac-item' );
        locationResult.should( 'have.length', '1' );
    } );
} );
