export class Autocomplete
{
    public input: HTMLInputElement;
    public listeners: any[] = [];
    public place: any = null;
    public options?: google.maps.places.AutocompleteOptions;

    public constructor( input: HTMLInputElement, options?: google.maps.places.AutocompleteOptions )
    {
        this.input = input;
        this.options = options;
    }

    public addListener( event: string, callback: () => any ): void
    {
        this.listeners.push( {
            event, callback,
        } );
    }

    public getPlace(): any
    {
        return this.place;
    }
}
