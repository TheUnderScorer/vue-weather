<template>
	<v-sheet class="weather-data" color="grey lighten-5" elevation="1">
		<div class="today-weather" v-if="!!todayWeather">
			<Weather :forecast="todayWeather" :isMain="true"/>
		</div>
		<v-row justify="center" v-if="!!forecast && forecast.length">
			<v-btn :class="{active : isExpanded}" @click="isExpanded = !isExpanded" class="expand" color="primary" fab>
				<v-icon>
					mdi-arrow-down
				</v-icon>
			</v-btn>
		</v-row>
		<transition type="fade">
			<carousel :class="{visible: isExpanded}" :perPage="7" class="forecast" navigationEnabled v-if="!!forecast && !!forecast.length && isExpanded">
				<slide :key="forecastData.id" v-for="forecastData in forecast">
					<v-row align="center" class="fill-height" justify="center">
						<Weather :forecast="forecastData" class="week-weather"/>
					</v-row>
				</slide>
			</carousel>
		</transition>
	</v-sheet>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
    import { ForecastData } from '@/http/open-weather/types/ForecastResponse';
    import { Carousel, Slide } from 'vue-carousel';

    @Component( {
        components: {
            Weather: () => import('@/components/Weather.vue'),
            Carousel,
            Slide,
        }
    } )
    export default class WeatherList extends Vue
    {
        @Prop( {
            default: null,
        } )
        public weatherData!: ForecastData[] | null;

        public todayWeather: ForecastData | null = null;
        public forecast: ForecastData[] = [];
        public isExpanded: boolean = false;

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
	.expand {
		margin: 1em 0;

		&.active {
			i {
				transform: rotate(180deg);
			}
		}
	}

	.forecast {
		margin: 2em 0;
	}
</style>
