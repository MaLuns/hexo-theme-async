'use strict';

/**
 * note tag
 *
 * Syntax:
 *   {% note [type] [title] %}
 *     xxxxxx
 *   {% endnote %}
 */

const noteFn = (args, content) => {
	const typeList = ['info', 'tip', 'warning', 'danger', 'details'];
	const type = typeList.includes(args[0]) ? args[0] : 'info';
	const title = (typeList.includes(args[0]) ? args[1] : args[0]) || type.toLocaleUpperCase();
	content = hexo.render.renderSync({ text: content, engine: 'markdown' });

	if (type === 'details') {
		return `<details><summary>${title}</summary>${content}</details>`;
	} else {
		return `<div class="trm-note ${type}"><div class="trm-note-title">${title}</div>${content}</div>`;
	}
};

hexo.extend.tag.register('note', noteFn, { ends: true });
