import { mount } from '@vue/test-utils';
import ForecastCarousel from '@/components/ForecastCarousel.vue';
import mockForecast from './mocks/open-weather/mockForecast';

describe( 'ForecastCarousel.vue', () =>
{
    it( 'Renders without crashing', () =>
    {
        const component = mount( ForecastCarousel );
        component.setProps( {
            forecast: mockForecast.list,
        } );

        expect( component.html() ).toMatchSnapshot();
    } );
} );
