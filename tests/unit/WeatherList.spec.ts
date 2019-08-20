import { mount } from '@vue/test-utils';
import WeatherList from '@/components/WeatherList.vue';
import mockForecast from './mocks/open-weather/mockForecast';
import { wait } from '@/utils/timeout';
import vuetify from '@/plugins/vuetify';

describe( 'WeatherList.vue', () =>
{

    it( 'Renders without crashing', () =>
    {
        const component = mount( WeatherList, { vuetify } );
        component.setProps( {
            weatherData: mockForecast.list,
        } );

        expect( component.html() ).toMatchSnapshot();
    } );

    it( 'Clicking expand button should toggle display of forecast', async ( done ) =>
    {
        const component = mount( WeatherList, { vuetify } );
        const instance = component.vm as any;

        component.setProps( {
            weatherData: mockForecast.list,
        } );

        await wait( 1000 );

        const button = component.find( '.expand' );
        button.trigger( 'click' );

        expect( instance.isExpanded ).toBeTruthy();

        const forecast = component.find( '.forecast' );
        expect( forecast.classes() ).toContain( 'visible' );

        button.trigger( 'click' );

        expect( instance.isExpanded ).toBeFalsy();
        expect( forecast.html() ).toBeUndefined();

        done();
    } );

} );
