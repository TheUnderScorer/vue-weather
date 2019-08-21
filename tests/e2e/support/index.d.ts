// tslint:disable-next-line:no-namespace
declare namespace Cypress
{
    interface Chainable
    {
        locationInput(): Chainable<Element>;

        wait( ms: number ): Chainable<any>;

        typeLocation( location: string ): Chainable<any>;
    }
}
