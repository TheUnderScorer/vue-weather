import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import '@/plugins/vuetify';

jest.mock( 'nprogress/nprogress.css', () => null );
jest.mock( 'vuetify/dist/vuetify.min.css', () => null );

describe( 'App.vue', () =>
{
    it( 'Renders without crashing', () =>
    {
        shallowMount( App );
    } );

    it( 'Creates google script on mount if it was not created previously', () =>
    {
        shallowMount( App );
        let scripts = document.head.querySelectorAll( '#google_maps_script' );

        expect( scripts ).toHaveLength( 1 );

        shallowMount( App );
        scripts = document.head.querySelectorAll( '#google_maps_script' );

        expect( scripts ).toHaveLength( 1 );
    } );

} );
