<template>
	<div class="card-box">
		<h2 class="card-box__title">
			{{ title }}
		</h2>
		<h4 class="card-box__subtitle" v-if="!!subTitle">
			{{ subTitle }}
		</h4>
		<div class="card-box__content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class CardBox extends Vue
    {
        @Prop()
        public title!: string;

        @Prop( {
            default: ''
        } )
        public subTitle!: string;
    }
</script>

<style lang="scss" scoped>
	@import '../scss/variables';

	.card-box {
		background-color: $white;
		padding: 0.5em 2em;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
	}
</style>
