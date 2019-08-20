import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import '@/plugins/vuetify';

let loaderValue: number = 0;
let loaderDone: boolean = false;

jest.mock( 'nprogress', () => ( {
    set:  ( value: number ) => loaderValue = value,
    done: () => loaderDone = true,
} ) );

jest.mock( 'nprogress/nprogress.css', () => null );
jest.mock( 'vuetify/dist/vuetify.min.css', () => null );

describe( 'App.vue', () =>
{
    afterEach( () =>
    {
        jest.restoreAllMocks();

        loaderDone = false;
        loaderValue = 0;
    } );

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

    it( 'Should fetch weather on place change', () =>
    {
        const component = shallowMount( App );
        const spy = jest.spyOn( component.vm, 'getWeather' as any );
        const instance = component.vm as any;

        instance.onPlaceChange( {
            formatted_address: 'Katowice, Poland',
        } );

        expect( spy ).toBeCalledTimes( 1 );
    } );

    it( 'Should toggle loading bar when loading data changes', () =>
    {
        const component = shallowMount( App );
        const instance = component.vm as any;

        instance.loading = true;
        expect( loaderValue ).toBeGreaterThan( 0 );

        instance.loading = false;
        expect( loaderDone ).toBeTruthy();
    } );

} );
