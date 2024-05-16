'use strict';

/**
 * flink tag
 *
 * Syntax:
 *   {% flink [key] [col] %}
 *     xxxxxx
 *   {% endflink %}
 */

const flinkFn = (args, content) => {
	const truncate = hexo.extend.helper.get('truncate').bind(hexo);
	const onerror = hexo.extend.helper.get('onerror').bind(hexo);

	const key = /^[A-Za-z\-_]+$/.test(args[0]) ? args[0] : '';
	const col = /^[0-9]+$/.test(args[0]) ? args[0] : /^[0-9]+$/.test(args[1]) ? args[1] : 6;

	content = hexo.render.renderSync({ text: content, engine: 'yaml' });
	if (key && !content) {
		const data = hexo.locals.get('data');
		content = data[key];
	}

	if (!content) return;

	let listResult = '';

	content.forEach(item => {
		listResult += `
<div class="col-lg-${col}">
    <a href='${item.url}' target='_blank' rel="nofollow">
        <div class="trm-link-box trm-scroll-animation trm-p-20">
            <div class="trm-link-content">
                <div class="trm-icon">
                    <img class="no-fancybox" draggable="false" ${onerror('flink')} alt="${item.name}" src="${item.image}">
                </div>
                <div class="trm-link-text">
                    <h6 class="trm-mb-10">${item.name}</h6>
                    <div>${truncate(item.desc || '', { length: 32 })}</div>
                </div>
            </div>
        </div>
    </a>
</div>`;
	});

	return `<div class="trm-flink row">${listResult}</div>`;
};

hexo.extend.tag.register('flink', flinkFn, { ends: true });
