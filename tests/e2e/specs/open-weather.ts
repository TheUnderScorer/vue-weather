describe( 'OpenWeather tests', () =>
{
    it( 'Selecting location from google autocomplete results should show weather for this location', () =>
    {
        cy.visit( '/' );

        cy.typeLocation( 'Katowice' );

        const todayWeather = cy.get( '.today-weather' );
        todayWeather.should( 'be.visible' );
    } );

    it( 'Clicking expand arrow should display weather forecast', () =>
    {
        cy.visit( '/' );

        cy.typeLocation( 'Łódź' );

        cy.get( '.expand' ).click();
        cy.get( '.forecast' ).should( 'be.visible' );
    } );
} );
