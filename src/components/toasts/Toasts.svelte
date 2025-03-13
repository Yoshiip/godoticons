<script lang="ts">
	import Toast from './Toast.svelte';

	import { dismissToast, toasts } from '../../stores/toasts';
</script>

{#if $toasts}
	<section
		class="fixed top-0 left-0 right-0 w-full flex justify-center flex-col z-50 m-4 pointer-events-none"
	>
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
			>
		{/each}
	</section>
{/if}
