<template>
	<section class="weather-data">

	</section>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { ForecastData } from '@/http/open-weather/types/ForecastResponse';

    @Component
    export default class Weather extends Vue
    {
        @Prop( {
            default: false
        } )
        public isMain!: boolean;

        @Prop( {
            default: null,
        } )
        public forecast!: ForecastData | null;
    }
</script>

<style lang="scss" scoped>

</style>
