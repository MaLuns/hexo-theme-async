/**
 * galleryGroup and allery
 * transplant from hexo-theme-butterfly
 */

'use strict';
const { url_for, htmlTag } = require('hexo-util');
const urlFor = url_for.bind(hexo);

/**
 * 相册
 * @param {*} args
 * @param {*} content
 * @returns
 */
function galleryGroup(args, content) {
	return `<div class="fj-gallery no-fancybox">
    ${content
			.split('\n')
			.map(md => {
				return hexo.render.renderSync({ text: md, engine: 'markdown' });
			})
			.join('')}
</div>`;
}

/**
 * 相册图片
 * @param {*} args
 * @returns
 */
function galleryItem(args) {
	return htmlTag('img', {
		src: urlFor(args[0]),
		'data-src': urlFor(args[1]),
	});
}

/**
 * 相册库
 * @param {*} args
 * @returns
 */
function gallery(args) {
	const name = args[0];
	const desrc = args[1];
	const url = urlFor(args[2]);
	const img = urlFor(args[3]);
	const col = args[4] || 6;
	const ratio = args[5] || 80;

	return `
<div class="col-lg-${col}">
    <a href="${url}" class="trm-portfolio-item trm-scroll-animation">
        <div class="trm-cover-frame" style="padding-bottom:${ratio}%">
            <img class="trm-cover no-fancybox" src="${img}" alt="Group Image Gallery">
        </div>
        <div class="trm-item-description">
            <div>
                <h6>${name}</h6>
                <p style="margin: 5px 0 0;font-size: .9rem;opacity: .8;">${desrc}</p>
            </div>
        </div>
    </a>
</div>`;
}

hexo.extend.tag.register('galleryGroup', galleryGroup, { ends: true });
hexo.extend.tag.register('galleryItem', galleryItem);
hexo.extend.tag.register('gallery', gallery);
