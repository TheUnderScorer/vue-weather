import { mount, shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import '@/plugins/vuetify';
import MockAdapter from 'axios-mock-adapter';
import forecastClient from '@/http/open-weather/forecastClient';
import mockForecast from './mocks/open-weather/mockForecast';
import mockPlace from './mocks/google/places/mockPlace';
import vuetify from '@/plugins/vuetify';

let loaderValue: number = 0;
let loaderDone: boolean = false;

jest.mock( 'nprogress', () => ( {
    set:      ( value: number ) => loaderValue = value,
    done:     () => loaderDone = true,
    settings: {
        parent: '',
    },
} ) );

jest.mock( 'nprogress/nprogress.css', () => null );
jest.mock( 'vuetify/dist/vuetify.min.css', () => null );

let mockAxios: MockAdapter;

describe( 'App.vue', () =>
{
    beforeAll( () =>
    {
        Object.assign( process.env, {
            'VUE_APP_GOOGLE_MAPS_SCRIPT_URL': '',
            'VUE_APP_GOOGLE_API_KEY':         ''
        } );
    } );

    beforeEach( () =>
    {
        mockAxios = new MockAdapter( forecastClient );
    } );

    afterEach( () =>
    {
        mockAxios.restore();
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
        mockAxios
            .onGet()
            .replyOnce( 200, mockForecast );

        const component = shallowMount( App );
        const spy = jest.spyOn( component.vm, 'getWeather' as any );
        const instance = component.vm as any;

        instance.onPlaceChange( mockPlace );

        expect( spy ).toBeCalledTimes( 1 );
    } );

    it( 'Should toggle loading bar when loading data changes', () =>
    {
        const component = mount( App, {
            vuetify,
        } );
        const instance = component.vm as any;

        instance.loading = true;
        expect( loaderValue ).toBeGreaterThan( 0 );

        instance.loading = false;
        expect( loaderDone ).toBeTruthy();
    } );

} );
