'use strict';
const { htmlTag, url_for } = require('hexo-util');

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
    const type = hexo.theme.config?.assets?.icons?.type || 'font'
    const icons = args.flat(Infinity).filter(item => typeof item === 'string' || item instanceof String)
    if (type === 'symbol') {
        return `<svg class="symbol-icon" aria-hidden="true">
    <use xlink:href="#${icons.join(" ")}"></use>
</svg>`;

    } else {
        return `<i class="${icons.join(" ")}"></i>`
    }
}

function jssHelper(src, props = {}) {
    let result = '';
    if (typeof src === 'string') {
        src = url_for.call(this, src)
        result += htmlTag('script', { src, ...props }, '') + '\n';
    }
    if (Array.isArray(src)) {
        src.forEach(item => {
            item = url_for.call(this, item);
            result += htmlTag('script', { src: item, ...props }, '') + '\n';
        })
    }
    return result
}

hexo.extend.helper.register('jss', jssHelper)
hexo.extend.helper.register('icon', iconHelper)
hexo.extend.helper.register('tag', tagHelper)