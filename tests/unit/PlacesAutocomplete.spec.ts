/// <reference types="@types/googlemaps" />
import { shallowMount } from '@vue/test-utils';
import PlacesAutocomplete from '@/components/PlacesAutocomplete.vue';
import '@/plugins/vuetify';
import { Autocomplete as GoogleAutocomplete } from './mocks/google/places/Autocomplete';

describe( 'PlacesAutocomplete.vue', () =>
{

    beforeAll( () =>
    {
        window.google = {
            maps: {
                places: {
                    Autocomplete: GoogleAutocomplete,
                },
            },
        };
    } );

    it( 'Renders without crashing', () =>
    {
        shallowMount( PlacesAutocomplete );
    } );

    it( 'Should create instance of google autocomplete on mount', () =>
    {
        const component = shallowMount( PlacesAutocomplete );
        const instance = component.vm as any;

        expect( instance.getGoogleService() ).toBeInstanceOf( GoogleAutocomplete );
    } );

} );
