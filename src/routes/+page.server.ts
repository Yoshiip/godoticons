import path from 'path';
import fs from 'fs';
import type { PageServerLoad } from './$types';

export const load = (async (parent) => {
	const iconsDir = path.join(process.cwd(), 'static/icons');
	const files = fs.readdirSync(iconsDir);
	return {
		icons: files.map((file) => file.replace(/\.svg$/, ''))
	};
}) satisfies PageServerLoad;
