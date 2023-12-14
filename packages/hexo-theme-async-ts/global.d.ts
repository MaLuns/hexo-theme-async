/* eslint-disable @typescript-eslint/ban-types */
declare interface Window {
	ASYNC_CONFIG: {
		hostname: string;
		author: string;
		root: string;
		typed_text: Array<string>;
		favicon: {
			visibilitychange: boolean;
			hidden: string;
			showText: string;
			hideText: string;
		};
		theme_version: string;
		theme: Record<string, any>;
		search?: {
			path: string;
			preload: boolean;
			trigger: string;
			top_n_per_article: string;
			unescape: string;
		};
		i18n: {
			placeholder: string;
			empty: string;
			hits: string;
			hits_time: string;
			author: string;
			copyright_link: string;
			copyright_license_title: string;
			copyright_license_content: string;
			copy_success: string;
			copy_failure: string;
			open_read_mode: string;
			exit_read_mode: string;
			notice_outdate_message: string;
			sticky: string;
			just: string;
			min: string;
			hour: string;
			day: string;
			month: string;
		};
		creative_commons?: {
			license: string;
			language: string;
		};
		swup: boolean;
		plugin: any;
		icons: {
			[k: string]: string;
		};
		icontype: 'symbol' | 'font';
		highlight: {
			plugin: 'highlighjs' | 'prismjs';
			theme: boolean;
			copy: boolean;
			lang: boolean;
			title: 'mac' | 'default';
			height_limit: false | number;
		};
		notice_outdate?: {
			limit_day: number;
			position: 'top' | 'bottom';
			message_prev: string;
			message_next: string;
		};
		date_suffix: {
			month: string;
			day: string;
			hour: string;
			min: string;
			just: string;
		};
		covers?: string | string[];
		toc?: {
			post_title?: boolean;
		};
		live_time?: {
			start_time?: string;
			prefix?: string;
		};
	};

	PAGE_CONFIG: {
		title?: string;
		isPost: boolean;
		isHome: boolean;
		postUpdate: string;
	};

	asyncFun: {
		[key: string]: Function;
	};

	clipboardData: any;
	originTitle: any;

	changeGiscusTheme: () => void;
	show_date_time: () => void;

	// 三方插件
	Fancybox: any;
	Swiper: any;
	Swup: any;
	fjGallery: any;
}
