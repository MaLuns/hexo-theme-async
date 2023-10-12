import path from 'path';
import { defineConfig } from 'vite';

import Components from 'unplugin-vue-components/vite';

export default defineConfig({
	assetsInclude: ['*/*.yml'],
	resolve: {
		alias: {
			'@/': `${path.resolve(__dirname, 'theme')}/`,
		},
	},
	plugins: [
		Components({
			include: [/\.vue/, /\.md/],
			dirs: '.vitepress/components',
			dts: '.vitepress/components.d.ts',
		}),
	],
});
