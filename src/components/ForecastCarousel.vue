<template>
	<carousel :perPageCustom="perPage" class="forecast-carousel" navigationEnabled>
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
    }
</script>
<style lang="scss" scoped>

	.forecast-carousel {
		margin: 2em 0;
	}
</style>
