import type { PageLoad } from './$types';

export const load = (async (parent) => {
	return parent.data;
}) satisfies PageLoad;
