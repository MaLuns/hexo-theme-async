const path = require('path');
const pkg = require('../../package.json');
const { regExp, isPlainObject } = require('../utils');

hexo.extend.filter.register('before_generate', () => {
	const themeConfig = hexo.theme.config;
	const { assets } = themeConfig;
	if (themeConfig.assets._CND_CREATED_) return;

	const thirdPartySrc = hexo.render.renderSync({ path: path.join(hexo.theme_dir, '/plugins.yml'), engine: 'yaml' });

	const cdnSource = {
		local: '',
		jsdelivr: `https://cdn.jsdelivr.net/npm`,
		unpkg: `https://unpkg.com`,
	};

	const createCDNLink = (data, type, internal) => {
		if (isPlainObject(data)) {
			let keys = Object.keys(data);
			keys.forEach(key => {
				data[key] = createCDNLink(data[key], type, internal);
			});
		} else if (Array.isArray(data)) {
			data.forEach((item, index) => {
				data[index] = createCDNLink(item, type, internal);
			});
		} else {
			if (regExp.http.test(data)) {
				return data;
			}
			let cdn = cdnSource[type] || type;
			if (internal) {
				if (cdn === 'local') return data;
				if (cdn) cdn += `/hexo-theme-async@${pkg.version == '0.0.0' ? 'latest' : pkg.version}/source/`;
				data = cdn + data;
			} else {
				data = cdn + data;
			}
		}
		return data;
	};

	themeConfig.assets.plugin = Object.assign(createCDNLink(thirdPartySrc, assets.third_party_provider), createCDNLink(assets.plugin, assets.internal_provider, true));
	themeConfig.assets._CND_CREATED_ = true;
});
