<template>
	<div :class="type" class="notice">
		<section class="notice-text">
			<slot></slot>
		</section>
		<v-btn @click="$emit('notice-close')" class="notice-close" text x-small>
			x
		</v-btn>
	</div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { NoticeType } from '@/components/types/NoticeType';

    @Component
    export default class Notice extends Vue
    {
        @Prop()
        public type!: NoticeType;
    }
</script>

<style lang="scss" scoped>
	@import '../scss/variables';

	.notice {
		padding: 0.5em;
		background-color: transparent;
		margin-bottom: 0.5em;
		display: flex;

		.notice-text {
			width: 90%;
		}

		&.error {
			background-color: $red;

			&, .notice-close {
				color: $white;
			}
		}
	}
</style>
