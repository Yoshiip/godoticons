<script lang="ts">
	export let onInput = (event: Event) => {};
</script>

<form class="flex items-center max-w-sm mx-auto">
	<label for="simple-search" class="sr-only">Search</label>
	<div class="relative w-full">
		<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
			<img src="/src/assets/icons/Search.svg" alt="" srcset="" />
		</div>
		<input
			on:input={onInput}
			type="text"
			id="simple-search"
			class="bordertext-sm rounded-lg block w-full ps-10 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
			placeholder="Search icon..."
			required
		/>
	</div>
</form>
