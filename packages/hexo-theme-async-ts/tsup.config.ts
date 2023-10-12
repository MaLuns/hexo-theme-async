import { defineConfig } from 'tsup';

export default defineConfig(options => {
	return {
		entry: ['src/plugins/*.ts', 'src/main.ts'],
		splitting: true,
		sourcemap: false,
		clean: true,
		format: ['iife'],
		outExtension() {
			return {
				js: '.js',
			};
		},
		platform: 'browser',
		minify: !options.watch,
		outDir: '../hexo-theme-async/source/js/',
	};
});
