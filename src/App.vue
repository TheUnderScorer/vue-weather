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
									<PlacesAutocomplete id="location" label="Location" v-on:place-changed="onPlaceChange"/>
								</v-form>
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
    import ForecastResponse from '@/http/open-weather/types/ForecastResponse';
    import getForecast from '@/http/open-weather/common/getForecast';
    import * as ProgressBar from 'nprogress';
    import 'nprogress/nprogress.css';
    import { getRandomArbitrary } from '@/utils/math';

    @Component( {
        components: {
            PlacesAutocomplete,
        },
    } )
    export default class App extends Vue
    {
        public place?: google.maps.places.PlaceResult;
        public didInit: boolean = false;
        public loading: boolean = false;
        public error: string = '';
        public weather: ForecastResponse | null = null;

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

            this.loading = true;

            try {
                this.weather = await getForecast( this.place.formatted_address );
            } catch ( e ) {
                this.error = 'Unknown error occured, please try again.';

                console.error( e );

                return;
            } finally {
                this.loading = false;
            }

            console.log( 'Weather for provided location: ', this.weather );

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

        public mounted(): void
        {
            if ( document.head.querySelector( '#google_maps_script' ) ) {
                return;
            }

            const script = document.createElement( 'script' );
            script.id = 'google_maps_script';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${ process.env.VUE_APP_GOOGLE_API_KEY }&libraries=places`;
            script.onload = () => this.didInit = true;

            document.head.appendChild( script );
        }

    }
</script>
