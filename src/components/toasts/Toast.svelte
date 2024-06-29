<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { ToastType } from '../../ToastType';

	const dispatch = createEventDispatcher();

	export let type: ToastType;
	export let dismissible = true;
</script>

<div
	id="toast-success"
	class="flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow pointer-events-auto text-gray-400 bg-gray-800"
	role="alert"
	transition:fade
>
	{#if type === ToastType.SUCCESS}
		<img
			src="/src/lib/icons/StatusSuccess.svg"
			aria-hidden="true"
			class="w-6 h-6"
			alt="Sucess"
		/>
	{:else if type === ToastType.ERROR}
		<img src="/src/lib/icons/StatusError.svg" aria-hidden="true" class="w-6 h-6" alt="Error" />
	{:else if type === ToastType.DANGER}
		<img
			src="/src/lib/icons/StatusWarning.svg"
			aria-hidden="true"
			class="w-6 h-6"
			alt="Danger"
		/>
	{/if}

	<div class="ms-3 text-sm font-normal"><slot></slot></div>
	{#if dismissible}
		<button
			on:click={() => dispatch('dismiss')}
			type="button"
			class="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 text-gray-500 hover:text-white bg-gray-800 hover:bg-gray-700"
			aria-label="Close"
		>
			<span class="sr-only">Close</span>
			<img src="/src/lib/icons/Close.svg" aria-hidden="true" class="w-6 h-6" alt="Close" />
		</button>
	{/if}
</div>
