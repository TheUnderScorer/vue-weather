<template>
	<article :class="cssClasses" class="weather-data" v-if="!!forecast">
		<WeatherIcon :size="iconSize" :weather="forecast.weather[0]"/>
		<div class="weather-details">
			<div class="temperature">
				<h2>
					{{ forecast.main.temp.toFixed(1) }}°C
				</h2>
			</div>
			<div class="weather-main">
				{{ forecast.weather[0].main }}
			</div>
		</div>
	</article>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { ForecastData } from '@/http/open-weather/types/ForecastResponse';
    import WeatherIcon from '@/components/WeatherIcon.vue';
    import { IconSize } from '@/components/types/IconSize';

    @Component( {
        components: {
            WeatherIcon
        }
    } )
    export default class Weather extends Vue
    {
        @Prop()
        public isMain!: boolean;

        @Prop( {
            default: null,
        } )
        public forecast!: ForecastData | null;

        public get cssClasses()
        {
            return {
                'is-main':  this.isMain,
                'is-small': !this.isMain,
            };
        }

        public get iconSize(): IconSize
        {
            return this.isMain ? 'large' : 'small';
        }
    }
</script>

<style lang="scss" scoped>
	.weather-data {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		line-height: 1.5em;

		&.is-small {
			display: inline-flex;
		}

		&.is-main {
			font-size: 1.5em;
		}
	}
</style>
