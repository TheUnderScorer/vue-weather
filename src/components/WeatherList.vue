<template>
	<section class="weather-data">
		<div class="today-weather" v-if="!!todayWeather">
			<Weather :forecast="todayWeather" :isMain="true"/>
		</div>
	</section>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import { ForecastData } from '@/http/open-weather/types/ForecastResponse';
    import Weather from '@/components/Weather.vue';

    @Component( {
        components: { Weather }
    } )
    export default class WeatherList extends Vue
    {
        @Prop( {
            default: null,
        } )
        public weatherData!: ForecastData[] | null;

        public todayWeather: ForecastData | null = null;
        public forecast: ForecastData[] = [];

        @Watch( 'weatherData' )
        public onWeatherDataChange( newData: ForecastData[] | null ): void
        {
            if ( !newData ) {
                return;
            }

            const forecast = [ ...newData ];

            this.todayWeather = forecast.shift() as ForecastData;
            this.forecast = forecast;
        }
    }
</script>

<style lang="scss" scoped>

</style>
