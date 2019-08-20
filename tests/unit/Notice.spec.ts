import { mount } from '@vue/test-utils';
import Notice from '@/components/Notice.vue';
import '@/plugins/vuetify';

describe( 'Notice.vue', () =>
{
    it( 'Renders without crashing', () =>
    {
        const component = mount( Notice, {
            slots: {
                default: 'Test notice!',
            },
        } );

        expect( component.html() ).toMatchSnapshot();
    } );

} );
