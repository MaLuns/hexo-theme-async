'use strict';

const url = require('url');
const { url_for } = require('hexo-util');
const { toI18n } = require('../utils');

const urlFor = url_for.bind(hexo);

hexo.extend.helper.register('async_config', function () {
	const { config, theme, __ } = this;

	let exportConfig = {
		hostname: url.parse(config.url).hostname || config.url,
		author: config.author,
		root: config.root,
		typed_text: theme.sidebar.typedText || theme.sidebar.typed_text,
		theme_version: theme.version,
		theme: theme.theme,
		favicon: toI18n(theme.favicon, __),
		i18n: {
			placeholder: theme.search.placeholder || __('search.placeholder'),
			empty: __('search.empty'),
			hits: __('search.hits'),
			hits_time: __('search.hits_time'),

			author: __('post.copyright.author') + __('symbol.colon'),
			copyright_link: __('post.copyright.link') + __('symbol.colon'),
			copyright_license_title: __('post.copyright.license_title') + __('symbol.colon'),
			copyright_license_content: __('post.copyright.license_content'),
			copy_success: __('post.copy.success'),
			copy_failure: __('post.copy.failure'),
			open_read_mode: __('post.read_mode.open'),
			exit_read_mode: __('post.read_mode.exit'),
			notice_outdate_message: __('post.notice_outdate_message'),
			sticky: __('post.sticky'),

			just: __('date_suffix.just'),
			min: __('date_suffix.min'),
			hour: __('date_suffix.hour'),
			day: __('date_suffix.day'),
			month: __('date_suffix.month'),
		},
		swup: theme.swup,
		plugin: {
			flickr_justified_gallery: theme.assets.plugin.flickr_justified_gallery,
		},
		icons: theme.icons,
		icontype: theme.assets.icons.type,
		highlight: {
			plugin: config.highlight.enable || config.syntax_highlighter == 'highlight.js' ? 'highlighjs' : 'prismjs',
			theme: theme.highlight.theme,
			copy: theme.highlight.copy,
			lang: theme.highlight.lang,
			title: theme.highlight.title,
			height_limit: theme.highlight.height_limit,
		},
		toc: {
			post_title: theme.toc.post_title,
		},
		live_time: {
			start_time: theme.footer?.live_time?.enable ? theme.footer.live_time.start_time : '',
			prefix: __(theme.footer.live_time.prefix),
		},
		danmu: theme.banner.danmu,
	};

	// 随便封面
	if (theme.cover.type === 'random') {
		exportConfig.covers = Array.isArray(theme.cover.default) ? theme.cover.default.map(item => urlFor(item)) : urlFor(theme.cover.default);
	}

	// 复制添加版权
	if (theme.creative_commons && theme.creative_commons.clipboard) {
		exportConfig.creative_commons = {
			license: theme.creative_commons.license,
			language: theme.creative_commons.language,
		};
	}

	// 过期提醒
	if (theme.notice_outdate && theme.notice_outdate.enable) {
		exportConfig.notice_outdate = theme.notice_outdate;
	}

	// 查询
	if (theme.search && theme.search.enable && theme.search.type === 'local') {
		exportConfig.search = theme.search;

		if (config.search) {
			exportConfig.search.path = config.search.path;
		}
	}

	return `<script>window.ASYNC_CONFIG = ${JSON.stringify(exportConfig)};</script>`;
});

hexo.extend.helper.register('page_config', function () {
	const is_post = hexo.extend.helper.get('is_post').bind(this);
	const is_home = hexo.extend.helper.get('is_home').bind(this);
	const full_date = hexo.extend.helper.get('full_date').bind(this);

	let exportConfig = {
		isPost: is_post(),
		isHome: is_home(),
		postUpdate: full_date(this.page.updated),
	};
	return `<script id="async-page-config">window.PAGE_CONFIG = ${JSON.stringify(exportConfig)};</script>`;
});
