import type { PageLoad } from './$types';
const imageModules = import.meta.glob('../lib/icons/*.svg');

export const load = (async (parent) => {
	const data = {
		icons: [] as string[]
	};

	const loadIcons = async () => {
		const iconPromises = Object.entries(imageModules).map(async ([modulePath, moduleLoader]) => {
			const module = await moduleLoader();
			if (module && typeof module === 'object' && 'default' in module) {
				const iconName = modulePath.split('/').pop()?.split('.').shift();
				if (iconName) {
					data.icons.push(iconName);
				}
			}
		});

		await Promise.all(iconPromises);
	};

	await loadIcons();

	return data;
}) satisfies PageLoad;
