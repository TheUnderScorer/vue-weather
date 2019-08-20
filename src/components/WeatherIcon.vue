<template>
	<v-img :class="cssClasses" :src="iconUrl" alt="" class="weather-icon lighten-2"/>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { Weather } from '@/http/open-weather/types/ForecastResponse';
    import { IconSize } from '@/components/types/IconSize';

    @Component
    export default class WeatherIcon extends Vue
    {
        @Prop()
        public weather!: Weather;

        @Prop()
        public size!: IconSize;

        private static baseIconUrl: string = 'http://openweathermap.org/img/wn/ICON_ID@2x.png';

        public get cssClasses(): string[]
        {
            return [
                this.size,
                this.weather.id.toString(),
                this.weather.icon,
                this.weather.main,
            ];
        }

        public get iconUrl(): string
        {
            return WeatherIcon.baseIconUrl.replace( 'ICON_ID', this.weather.icon );
        }
    }
</script>

<style lang="scss" scoped>
	.weather-icon {
		width: 80px;
		height: 80px;
		display: inline-block;

		&.large {
			width: 100px;
			height: 100px;
		}
	}
</style>
