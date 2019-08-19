<template>
	<div class="counter">
		<span class="count">
			Current count: <strong>{{ count }}</strong>
		</span>
		<div class="buttons-section">
			<button @click="$emit('increase-count')">
				Increase count.
			</button>
			<button @click="$emit('decrease-count')">
				Decrease count.
			</button>
			<button @click="$emit('reset-count')">
				Reset count
			</button>
		</div>
	</div>
</template>

<script lang="ts">
    import { Prop, Vue } from 'vue-property-decorator';
    import Component from 'vue-class-component';

    @Component
    export default class Counter extends Vue
    {
        @Prop()
        public count!: number;
    }
</script>

<style lang="scss" scoped>
	.buttons-section {
		display: flex;
		justify-content: center;

		button {
			margin: 0 1em;
		}
	}
</style>
