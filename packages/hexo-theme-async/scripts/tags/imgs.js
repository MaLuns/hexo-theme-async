'use strict';

const { htmlTag, url_for } = require('hexo-util');

const rUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\w]*))?)/;
const rMeta = /["']?([^"']+)?["']?\s*["']?([^"']+)?["']?/;

/**
 * Image tag
 *
 * Syntax:
 *   {% imgs [class names] /path/to/image /path/to/image  [width] [height] [alt text [title text]] %}
 */
hexo.extend.tag.register('imgs', function (args) {
	const classMap = ['trm-light-icon', 'trm-dark-icon'];
	const classes = [];
	const attrs = [];
	const srcs = [];
	let width, height, title, alt;

	// Find image URL and class name
	while (args.length > 0) {
		const item = args.shift();
		if (rUrl.test(item) || item.startsWith('/')) {
			srcs.push(url_for.call(hexo, item));
		} else {
			if (srcs.length < 1) {
				classes.push(item);
			} else {
				attrs.push(item);
			}
		}
	}

	// Find image width and height
	if (attrs && attrs.length) {
		if (!/\D+/.test(attrs[0])) {
			width = attrs.shift();

			if (attrs.length && !/\D+/.test(attrs[0])) {
				height = attrs.shift();
			}
		}

		const match = rMeta.exec(attrs.join("'"));

		// Find image title and alt
		if (match != null) {
			alt = match[1];
			title = match[2];
		}
	}

	if ([].length === 1) {
		return htmlTag('img', {
			src: srcs[0],
			class: classes.join(' '),
			width,
			height,
			title,
			alt,
		});
	} else {
		return srcs
			.map((src, index) => {
				return htmlTag('img', {
					class: `${classes.join(' ')} ${classMap[index] || ''}`,
					src,
					width,
					height,
					title,
					alt,
				});
			})
			.join(' ');
	}
});
