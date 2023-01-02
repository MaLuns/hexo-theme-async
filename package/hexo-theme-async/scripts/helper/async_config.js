'use strict';

const url = require('url');
const { toI18n } = require('../utils')

hexo.extend.helper.register('async_config', function () {
    const { config, theme, __ } = this

    let exportConfig = {
        hostname: url.parse(config.url).hostname || config.url,
        author: config.author,
        root: config.root,
        typed_text: theme.sidebar.typedText,
        favicon: toI18n(theme.favicon, __),
        theme_version: theme.version,
        theme: theme.theme,
        search: theme.search,
        i18n: {
            placeholder: theme.search.placeholder || __('search.placeholder'),
            empty: __('search.empty'),
            hits: __('search.hits'),
            hits_time: __('search.hits_time'),
            author: __('post.copyright.author') + __('symbol.colon'),
            copyright_link: __('post.copyright.link') + __('symbol.colon'),
            copyright_license_title: __('post.copyright.license_title') + __('symbol.colon'),
            copyright_license_content: __('post.copyright.license_content'),
            copy_button: __('post.copy.button'),
            copy_success: __('post.copy.success'),
            copy_failure: __('post.copy.failure'),
            open_read_mode: __('post.read_mode.open'),
            exit_read_mode: __('post.read_mode.exit')
        },
        creative_commons: theme.creative_commons,
        swup: theme.swup,
        plugin: {
            flickr_justified_gallery: theme.assets.plugin.flickr_justified_gallery,
            fancybox: theme.assets.plugin.fancybox
        },
        icons: theme.icons
    }

    if (config.search) {
        exportConfig.search.path = config.search.path;
    }

    return `<script>window.ASYNC_CONFIG = ${JSON.stringify(exportConfig)};</script>`;
})