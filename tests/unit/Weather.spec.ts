import mockForecast from './mocks/open-weather/mockForecast';
import { mount } from '@vue/test-utils';
import Weather from '@/components/Weather.vue';

describe( 'Weather.vue', () =>
{
    const forecast = mockForecast.list[ 0 ];

    it( 'Renders without crashing', () =>
    {
        const component = mount( Weather );
        component.setProps( {
            isMain: true,
            forecast,
        } );

        expect( component.html() ).toMatchSnapshot();
    } );

    it( 'Should display temperature fixed to one digit after comma', () =>
    {
        const newForecast = { ...forecast };
        forecast.main.temp = 30.5555;

        const component = mount( Weather );
        component.setProps( {
            isMain:   true,
            forecast: newForecast,
        } );

        const temperature = component.find( '.temperature h2' );
        expect( temperature.text() ).toContain( '30.6' );
    } );

} );
