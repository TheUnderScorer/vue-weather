<template>
	<div class="input-container">
		<label :for="id" v-if="hasLabel">
			{{ label }}
		</label>
		<!--suppress HtmlFormInputWithoutLabel -->
		<input :id="id" :type="type" :value="value" @input="handleInput"/>
		<div class="error">
			{{ error }}
		</div>
	</div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Input extends Vue
    {
        public value: string = '';

        @Prop()
        public id!: string;

        @Prop()
        public label!: string;

        @Prop( {
            default: 'text'
        } )
        public type!: string;

        @Prop( {
            default: ''
        } )
        public error!: string;

        public handleInput( event: Event ): void
        {
            const target = event.target as HTMLInputElement;

            this.value = target.value;
            this.$emit( 'input', target.value );
        }

        public get hasLabel(): boolean
        {
            return !!this.id && !!this.label;
        }

    }
</script>

<style scoped>
	.input-container {
		display: inline-block;
	}

	label {
		display: block;
	}
</style>
