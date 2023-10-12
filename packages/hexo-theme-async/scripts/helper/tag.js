'use strict';
const { htmlTag, url_for } = require('hexo-util');
const urlFor = url_for.bind(hexo);

function tagHelper(tag, props, innerHTML = '') {
	if (!tag || (!props && !innerHTML)) return;
	if (typeof props === 'string') {
		innerHTML = props;
		props = {};
	}
	const attrs = Object.keys(props).map(key => {
		return `${key}='${props[key]}' `;
	});
	if (Array.isArray(innerHTML)) {
		innerHTML = innerHTML.join('\n');
	}
	return `<${tag} ${attrs.join('')}>${innerHTML}</${tag}>`;
}

function iconHelper(...args) {
	const type = hexo.theme.config?.assets?.icons?.type || 'font';
	const icons = args.flat(Infinity).filter(item => typeof item === 'string' || item instanceof String);
	if (type === 'symbol') {
		let id = icons.shift();
		return `<svg class="symbol-icon ${icons.join(' ')}" aria-hidden="true">
    <use xlink:href="#${id}"></use>
</svg>`;
	} else {
		return `<i class="iconfont ${icons.join(' ')}"></i>`;
	}
}

function jssHelper(src, props = {}) {
	let result = '';
	if (typeof src === 'string') {
		src = urlFor(src);
		result += htmlTag('script', { src, ...props }, '') + '\n';
	}
	if (Array.isArray(src)) {
		src.forEach(item => {
			item = urlFor(item);
			result += htmlTag('script', { src: item, ...props }, '') + '\n';
		});
	}
	return result;
}

function swichImgsHelper(srcs, props = {}) {
	const classMap = ['trm-light-icon', 'trm-dark-icon'];
	if (Array.isArray(srcs)) {
		srcs = srcs.filter(src => !!src);
		if (srcs.length === 2) {
			return srcs
				.map((src, index) => {
					return htmlTag('img', {
						...props,
						class: `${props.class || ''} ${classMap[index] || ''}`,
						src: urlFor(src),
					});
				})
				.join(' ');
		} else {
			return htmlTag('img', { ...props, src: urlFor(srcs[0]) });
		}
	} else {
		return htmlTag('img', { ...props, src: urlFor(srcs) });
	}
}

function onerrorHelper(key = 'post_page') {
	return `onerror='this.onerror=null;this.src="${urlFor(hexo.theme.config.error_img[key])}"'`;
}

hexo.extend.helper.register('jss', jssHelper);
hexo.extend.helper.register('icon', iconHelper);
hexo.extend.helper.register('tag', tagHelper);
hexo.extend.helper.register('swich_imgs', swichImgsHelper);
hexo.extend.helper.register('onerror', onerrorHelper);
