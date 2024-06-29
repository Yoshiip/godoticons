<script lang="ts">
	export let name = '';
	export let iconClicked = (name: string) => {};
</script>

<div
	class="relative w-24 h-24 flex flex-col justify-center items-center border rounded-lg shadow-xl bg-gray-800 border-gray-700 hover:bg-gray-700"
>
	<button
		on:click={() => {
			iconClicked(name);
		}}
		class="cursor-pointer"
	>
		<img src={'/src/lib/icons/' + name + '.svg'} alt={name} class="w-8 max-h-8" />
	</button>
	<p class="mt-4 text-xs font-semibold text-slate-200 max-w-full pl-1 pr-1 truncate">
		{name}
	</p>
</div>
