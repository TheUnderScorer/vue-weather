<template>
	<div class="autocomplete-container">
		<v-text-field :error="!!error" :error-messages="error" :id="id" :label="label" clearable placeholder="Enter searched location..." ref="textfield"/>
	</div>
</template>

<script lang="ts">
    /// <reference types="@types/googlemaps" />

    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

    @Component
    export default class AutoComplete extends Vue
    {
        public error: string = '';
        public place: google.maps.places.PlaceResult | null = null;

        @Prop()
        public id!: string;

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
        };

        @Watch( 'place' )
        public onPlaceChange( place: google.maps.places.PlaceResult ): void
        {
            this.$emit( 'place-changed', place );
        }
    }
</script>

<style lang="scss" scoped>

</style>
