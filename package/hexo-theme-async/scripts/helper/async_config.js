'use strict';

const url = require('url');
const { toI18n } = require('../utils')

hexo.extend.helper.register('async_config', function () {
    const { config, theme, __ } = this
    
    let exportConfig = {
        hostname: url.parse(config.url).hostname || config.url,
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
        }
    }

    if (config.search) {
        exportConfig.search.path = config.search.path;
    }

    return `<script>window.ASYNC_CONFIG = ${JSON.stringify(exportConfig)};</script>`;
})