hexo.extend.filter.register('after_post_render', data => {
	let replaceText = ` data-tag='post-image' onload='this.onload=null;this.style.opacity=1;'`;

	// img lazyload
	if (hexo.theme.config.lazyload && hexo.theme.config.lazyload.enable) {
		replaceText += ` loading="lazy"`;
	}

	// img failed to load
	if (hexo.theme.config.error_img.post_page) {
		replaceText += ` ${hexo.extend.helper.get('onerror').bind(hexo)('post_page')}`;
	}

	data.content = data.content.replace(/<img(.+?)(\/{0,1})>/gi, (str, p1) => str.replace(p1, `${p1} ${replaceText}`));

	return data;
});
