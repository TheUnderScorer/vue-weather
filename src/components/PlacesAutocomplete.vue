<template>
	<div class="autocomplete-container">
		<v-text-field :error="!!error" :error-messages="error" :id="id" :label="label" placeholder="Enter searched location..." ref="textfield" v-model="value"/>
	</div>
</template>

<script lang="ts">
    /// <reference types="@types/googlemaps" />

    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

    @Component
    export default class PlacesAutocomplete extends Vue
    {
        public place: google.maps.places.PlaceResult | null = null;
        public value: string = '';

        @Prop()
        public id!: string;

        @Prop()
        public error !: string;

        @Prop( {
            default: ''
        } )
        public label!: string;

        private service!: google.maps.places.Autocomplete;

        public mounted(): void
        {
            const textField = this.$refs.textfield as Vue;

            this.service = new google.maps.places.Autocomplete( textField.$refs.input as HTMLInputElement, {
                types: [ '(cities)' ],

            } );

            this.service.addListener( 'place_changed', () => this.handlePlaceChange() );
        }

        public handlePlaceChange(): void
        {
            this.place = this.service.getPlace();
            console.log( { ...this.place } );
            this.value = this.place.formatted_address as string;
        };

        @Watch( 'place' )
        public onPlaceChange( place: google.maps.places.PlaceResult ): void
        {
            this.$emit( 'place-changed', place );
        }

        public getGoogleService(): google.maps.places.Autocomplete
        {
            return this.service;
        }
    }
</script>

<style lang="scss" scoped>

</style>
