<template>
	<article class="weather-data">

	</article>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import { ForecastData } from '@/http/open-weather/types/ForecastResponse';

    @Component
    export default class WeatherList extends Vue
    {
        @Prop( {
            default: null,
        } )
        public weatherData!: ForecastData[] | null;

        public todayWeather: ForecastData;
        public forecast: ForecastData[];

        @Watch( 'weatherData' )
        public onWeatherDataChange( newData: ForecastData[] | null ): void
        {
            if ( !newData ) {
                return;
            }

        }
    }
</script>

<style lang="scss" scoped>

</style>
