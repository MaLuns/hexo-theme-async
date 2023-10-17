import { defineConfig } from 'vitepress';

export default defineConfig({
	lang: 'zh-CN',
	title: 'Hexo-Theme-Async',
	description: '🎈 A simple, lightweight Hexo theme',
	lastUpdated: true,
	head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
	locales: {
		'/en/': {
			lang: 'en-US',
			label: 'English',
			description: 'A simple & lightweight theme for Hexo.',
		},
		'/': {
			lang: 'zh-CN',
			label: '简体中文',
			description: 'A simple & lightweight theme for Hexo.',
		},
	},
	themeConfig: {
		logo: '/logo.svg',
		search: {
			provider: 'local',
		},
		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/MaLuns/hexo-theme-async',
			},
			{
				icon: {
					svg: `<svg t="1668479734033" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="673" width="200" height="200"><path d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m259.2-569.6H480c-12.8 0-25.6 12.8-25.6 25.6v64c0 12.8 12.8 25.6 25.6 25.6h176c12.8 0 25.6 12.8 25.6 25.6v12.8c0 41.6-35.2 76.8-76.8 76.8h-240c-12.8 0-25.6-12.8-25.6-25.6V416c0-41.6 35.2-76.8 76.8-76.8h355.2c12.8 0 25.6-12.8 25.6-25.6v-64c0-12.8-12.8-25.6-25.6-25.6H416c-105.6 0-188.8 86.4-188.8 188.8V768c0 12.8 12.8 25.6 25.6 25.6h374.4c92.8 0 169.6-76.8 169.6-169.6v-144c0-12.8-12.8-25.6-25.6-25.6z" fill="#888888" p-id="674"></path></svg>`,
				},
				link: 'https://gitee.com/ml13/hexo-theme-async',
			},
		],
		editLink: {
			pattern: 'https://github.com/Maluns/hexo-theme-async/edit/master/docs/:path',
			text: '帮助改善此页面！( ￣□￣)/',
		},
		nav: [
			{ text: 'Guide', link: '/guide/' },
			{ text: 'DemoSites', link: '/demo/' },
			{ text: 'Sponsors', link: '/sponsors/' },
			{
				text: 'Languages',
				items: [
					{ text: '简体中文', link: '/guide/' },
					{ text: 'English', link: '/en/guide/' },
				],
			},
			{
				text: 'Docs',
				items: [
					{ text: 'Preview', link: 'https://hexo-theme-async.imalun.com/' },
					{ text: 'Laster', link: 'https://async-docs.imalun.com/' },
				],
			},
			{ text: 'HexoEditor', link: 'https://web-hexo-editor.imalun.com/' },
		],
		sidebar: {
			'/': [
				{
					text: '指南',
					items: [
						{
							text: '使用指南',
							link: '/guide/',
						},
						{
							text: '主题配置',
							link: '/guide/config',
						},
						{
							text: '页面配置',
							link: '/guide/page',
						},
						{
							text: '第三方支持',
							link: '/guide/third-party-support',
						},
						{
							text: '额外依赖库支持',
							link: '/guide/additional-package-support',
						},
						{
							text: '更新日志',
							link: '/guide/change-log',
						},
						{
							text: 'FAQ',
							link: '/guide/faq',
						},
					],
				},
				{
					text: '关于',
					items: [
						{
							text: '关于主题',
							link: '/about/',
						},
						{
							text: '内置图标',
							link: '/about/icon',
						},
					],
				},
			],
			'/en/': [
				{
					text: 'Guide',
					items: [
						{
							text: 'Usage guide',
							link: '/en/guide/',
						},
						{
							text: 'Theme Configuration',
							link: '/en/guide/config',
						},
						{
							text: 'Theme page',
							link: '/en/guide/page',
						},
						{
							text: 'Third-party support',
							link: '/en/guide/third-party-support',
						},
						{
							text: 'Additional Dependency Library Support',
							link: '/en/guide/additional-package-support',
						},
						{
							text: 'Change Log',
							link: '/en/guide/change-log',
						},
						{
							text: 'FAQ',
							link: '/en/guide/faq',
						},
					],
				},
				{
					text: 'About',
					items: [
						{
							text: 'About Theme',
							link: '/en/about/',
						},
						{
							text: 'Icons',
							link: '/en/about/icon',
						},
					],
				},
			],
		},
		footer: {
			message: 'Released under the SATA | MIT License.',
			copyright: 'Copyright © 2020-PRESENT MaLuns',
		},
	},
});
