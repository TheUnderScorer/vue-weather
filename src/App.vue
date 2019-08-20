<template>
	<v-app id="weather-app">
		<v-content>
			<v-container class="fill-height" fluid>
				<!--suppress HtmlDeprecatedAttribute -->
				<v-row align="center" justify="center">
					<v-col cols="12" md="4" sm="8">
						<v-card class="weather-card" v-if="didInit">
							<v-card-title>
								Weather
							</v-card-title>
							<v-card-text>
								<v-form id="weather_form">
									<PlacesAutocomplete :error="error" id="location" label="Location" v-on:place-changed="onPlaceChange"/>
								</v-form>
								<transition name="fade">
									<WeatherList :weatherData="forecast" v-if="!!forecast"/>
								</transition>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</v-app>
</template>

<script lang="ts">
    /// <reference types="@types/googlemaps" />

    import { Component, Vue, Watch } from 'vue-property-decorator';
    import PlacesAutocomplete from '@/components/PlacesAutocomplete.vue';
    import ForecastResponse, { ForecastData } from '@/http/open-weather/types/ForecastResponse';
    import getForecast from '@/http/open-weather/common/getForecast';
    import * as ProgressBar from 'nprogress';
    import 'nprogress/nprogress.css';
    import { getRandomArbitrary } from '@/utils/math';
    import 'vuetify/dist/vuetify.min.css';
    import Notice from '@/components/Notice.vue';
    import WeatherList from '@/components/WeatherList.vue';

    @Component( {
        components: {
            WeatherList,
            PlacesAutocomplete,
            Notice
        },
    } )
    export default class App extends Vue
    {
        public place?: google.maps.places.PlaceResult;
        public didInit: boolean = false;
        public loading: boolean = false;
        public error: string = '';
        public weather: ForecastResponse | null = null;
        public forecast: ForecastData[] = [];

        public onPlaceChange( place: google.maps.places.PlaceResult ): void
        {
            this.place = place;

            this.getWeather();
        }

        public async getWeather(): Promise<void>
        {
            if ( this.loading || !this.place || !this.place.formatted_address ) {
                return;
            }

            this.error = '';
            this.loading = true;

            try {
                this.weather = await getForecast( this.place.formatted_address );
            } catch ( e ) {
                this.resetWeathers();

                if ( e.response ) {
                    this.error = e.response.data.message;
                } else {
                    this.error = 'Unknown error occured, please try again.';
                }

                console.error( e );

                return;
            } finally {
                this.loading = false;
            }

            this.handleWeather();
        }

        protected handleWeather(): void
        {
            const { weather } = this;

            if ( !weather || !weather.list.length ) {
                this.resetWeathers();
                this.error = 'No weather found for given location.';

                return;
            }

            this.forecast = weather.list;
        }

        @Watch( 'loading' )
        public onLoading( loading: boolean ): void
        {
            if ( loading ) {
                ProgressBar.set( getRandomArbitrary( 0.1, 0.8 ) );
            } else {
                ProgressBar.done();
            }
        }

        public resetWeathers(): void
        {
            this.forecast = [];
            this.weather = null;
        }

        public mounted(): void
        {
            if ( !document.head.querySelector( '#google_maps_script' ) ) {
                this.loadGoogleScript();
            }

            ProgressBar.settings.parent = '.weather-card';
        }

        private loadGoogleScript(): void
        {
            const script = document.createElement( 'script' );
            script.id = 'google_maps_script';
            script.src = process.env.VUE_APP_GOOGLE_MAPS_SCRIPT_URL.replace( 'GOOGLE_API_KEY', process.env.VUE_APP_GOOGLE_API_KEY );
            script.onload = () => this.didInit = true;

            document.head.appendChild( script );
        }

    }
</script>

<style lang="scss">
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
