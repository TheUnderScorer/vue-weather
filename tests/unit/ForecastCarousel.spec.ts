import { mount } from '@vue/test-utils';
import ForecastCarousel from '@/components/ForecastCarousel.vue';
import mockForecast from './mocks/open-weather/mockForecast';
import vuetify from '@/plugins/vuetify';

jest.mock( 'vuetify/lib/util/colors', () => ( {
    blue: {
        accent1: 'blue'
    }
} ) );

describe( 'ForecastCarousel.vue', () =>
{
    it( 'Renders without crashing', () =>
    {
        const component = mount( ForecastCarousel, {
            vuetify
        } );
        component.setProps( {
            forecast: mockForecast.list,
        } );

        expect( component.html() ).toMatchSnapshot();
    } );
} );
