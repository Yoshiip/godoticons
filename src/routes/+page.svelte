<script lang="ts">
	import { onMount } from 'svelte';
	import IconCard from '../components/IconCard.svelte';
	import SearchBar from '../components/SearchBar.svelte';
	import { addToast } from '../stores/toasts';
	import { ToastType } from '../ToastType';
	import iconsSrc from '$lib/icons.json';

	let data = { icons: iconsSrc };

	let numIcons = Object.keys(data.icons).length;

	let count = 30;
	let icons = data.icons.slice(0, count);

	let query = '';

	function searchIcons(event: Event) {
		query = (event.target as HTMLInputElement).value.toLowerCase();
		count = 30;
		filterIcons();
	}

	function filterIcons() {
		icons = Object.values(data.icons).filter((icon) => icon.toLowerCase().includes(query));
		numIcons = icons.length;
		icons = icons.slice(0, count);
	}

	function showMoreIcons() {
		count += 30;
		filterIcons();
	}

	const bottomVisible = () =>
		document.documentElement.clientHeight + window.scrollY + 100 >=
		(document.documentElement.scrollHeight || document.documentElement.clientHeight);

	function handleScroll() {
		if (bottomVisible()) {
			showMoreIcons();
		}
	}

	onMount(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	let copyAsSVG = false;

	function copyImageToClipboard(name: string) {
		if (copyAsSVG) {
			fetch(`/icons/${name}.svg`)
				.then((response) => response.text())
				.then((svg) => {
					navigator.clipboard.writeText(svg);
					addToast('SVG copied to clipboard', ToastType.SUCCESS);
				})
				.catch((error) => console.error('Error copying SVG to clipboard:', error));
		} else {
			navigator.clipboard.writeText(`get_theme_icon("${name}", "EditorIcons")`);
			addToast('Code copied to clipboard', ToastType.SUCCESS);
		}
	}
</script>

<svelte:head>
	<title>Godot Icons Browser</title>
	<meta name="description" content="Search for icons from the Godot Engine icon theme." />
	<meta name="keywords" content="godot, icons, browser, engine, theme" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Godot Icons Browser" />
	<meta name="twitter:description" content="Search for icons from the Godot Engine icon theme." />
	<meta name="twitter:image" content="/icons/GodotMonochrome.svg" />

	<meta name="author" content="Tourneur Aymeri" />
	<link rel="shortcut icon" href="/icons/GodotMonochrome.svg" type="image/x-icon" />
	<script async defer src="https://buttons.github.io/buttons.js"></script>
</svelte:head>

<div class="bg-slate-950 fixed h-full w-full -z-20"></div>

<div class="absolute h-full w-full -z-10">
	<div
		class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
	></div>
</div>

<div class="relative isolate pt-4 lg:px-8">
	<div class="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
		<div class="text-center">
			<img src="/icons/GodotMonochrome.svg" class="w-16 h-16 m-auto" alt="Godot Monochrome Logo" />
			<h1 class="text-4xl font-bold tracking-tight text-slate-50 sm:text-6xl">
				Godot Icons Browser
			</h1>
			<p class="mt-6 text-lg leading-8 text-slate-300">
				Search for icons from the Godot Engine icon theme. Click on an icon to copy its name or
				GDScript code.
			</p>
			<a
				class="github-button"
				href="https://github.com/Yoshiip/godot-icons-browser"
				data-color-scheme="no-preference: light; light: light;  dark;"
				data-size="large"
				aria-label="View Godot Icons Browser on GitHub">GitHub</a
			>
		</div>
	</div>
</div>
<div
	class="max-w-screen-lg flex-col md:flex-row rounded-xl shadow-2xl mb-8 m-auto flex p-2 justify-evenly items-center gap-2 bg-slate-900"
>
	<p class="text-slate-50 flex flex-1 items-center font-bold text-lg">
		<img src="/icons/Image.svg" alt="Image" aria-hidden="true" class="w-4 h-4 me-4" />
		{numIcons} icon{numIcons === 1 ? '' : 's'} found
	</p>
	<div class="flex justify-center items-center gap-2">
		<p class="text-slate-50">Copy as</p>

		<div class="inline-flex rounded-md shadow-sm" role="group">
			<button
				type="button"
				class="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-s-lg focus:z-10 focus:ring-2 bg-gray-800 border-gray-700 text-white hover:text-white hover:bg-gray-700 focus:ring-blue-500 focus:text-white"
				on:click={() => (copyAsSVG = false)}
			>
				<img src="/icons/Script.svg" class="w-3 h-3 me-2" alt="SVG Icon" />
				<p class:text-blue-500={copyAsSVG === false}>GDScript</p>
			</button>
			<button
				type="button"
				class="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-e-lg focus:z-10 focus:ring-2 bg-gray-800 border-gray-700 text-white hover:text-white hover:bg-gray-700 focus:ring-blue-500 focus:text-white"
				on:click={() => (copyAsSVG = true)}
			>
				<img src="/icons/Curve2D.svg" class="w-3 h-3 me-2" alt="SVG Icon" />
				<p class:text-blue-500={copyAsSVG === true}>SVG</p>
			</button>
		</div>
	</div>
	<SearchBar onInput={searchIcons} />
</div>
<div class="flex flex-wrap gap-4 w-full justify-center">
	{#each Object.values(icons) as icon}
		<IconCard iconClicked={copyImageToClipboard} name={icon} />
	{/each}
</div>
<footer
	class="w-full max-w-screen-lg p-4 rounded-xl shadow-2xl m-auto flex mb-8 mt-8 justify-between items-center gap-16 bg-slate-900 sm:text-center text-gray-400"
>
	<div class="text-sm">
		<span>Not affiliated with Godot Engine.</span>
		<span class="flex items-center justify-center">
			<img src="/icons/Timer.svg" class="w-3 h-3 me-2" aria-hidden="true" alt="Timer" />
			Last updated: May 2024</span
		>
	</div>
	<a
		href="https://github.com/Yoshiip/godot-icons-browser"
		class="hover:underline me-4 md:me-6 flex items-center justify-center"
	>
		<img
			src="/icons/ExternalLink.svg"
			class="w-3 h-3 me-2"
			aria-hidden="true"
			alt="External Link"
		/>
		GitHub
	</a>
</footer>
