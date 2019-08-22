<template>
	<carousel :navigationEnabled="false" :paginationActiveColor="paginationActiveColor" :perPageCustom="perPage" class="forecast-carousel" navigationEnabled ref="carousel">
		<slide :key="forecastData.id" v-for="forecastData in forecast">
			<v-row align="center" class="fill-height" justify="center">
				<Weather :forecast="forecastData" class="week-weather"/>
			</v-row>
		</slide>
	</carousel>
</template>
<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import Weather from '@/components/Weather.vue';
    import { ForecastData } from '@/http/open-weather/types/ForecastResponse';
    import { Carousel, Slide } from 'vue-carousel';
    import colors from 'vuetify/lib/util/colors';

    @Component( {
        components: {
            Weather,
            Carousel,
            Slide
        }
    } )
    export default class ForecastCarousel extends Vue
    {
        @Prop()
        public forecast!: ForecastData[];

        public perPage: Array<Array<number>> = [
            [ 768, 3 ],
            [ 1024, 4 ],
            [ 1440, 7 ]
        ];

        public paginationActiveColor: string = colors.blue.accent1;
    }
</script>
<style lang="scss">
	.forecast-carousel {
		margin: 2em 0;
	}

	.VueCarousel-navigation {
		display: none;
	}
</style>
