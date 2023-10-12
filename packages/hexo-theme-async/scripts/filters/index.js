hexo.extend.filter.register('after_post_render', data => {
	// img lazyload
	if (hexo.theme.config.lazyload && hexo.theme.config.lazyload.enable) {
		data.content = data.content.replace(/<img(.+?)(\/{0,1})>/gi, (str, p1) => {
			return str.replace(p1, `${p1} loading="lazy"`);
		});
	}

	if (hexo.theme.config.error_img.post_page) {
		const onerror = hexo.extend.helper.get('onerror').bind(hexo);
		data.content = data.content.replace(/<img(.+?)(\/{0,1})>/gi, (str, p1) => {
			return str.replace(p1, `${p1} ${onerror('post_page')}`);
		});
	}
	return data;
});
