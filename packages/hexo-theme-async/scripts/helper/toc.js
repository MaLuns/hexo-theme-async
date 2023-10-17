'use strict';

const { tocObj, escapeHTML } = require('hexo-util');

// 获取树状数据

/* 
const getTreeData = (list = []) => {
    let len = list.length;
    let st = [, , , , , ,];
    let last = 0;
    for (let index = 0; index < len; index++) {
        let item = list[index];
        let currerLevel = item.level;

        if (currerLevel < last) {
            for (let currerLevel = 0; currerLevel < last; currerLevel++) {
                if (st[currerLevel]) {
                    st[currerLevel].rang.push(index);
                }
            }
        } else if (currerLevel > last && currerLevel - 2 > 0) {
            if (st[currerLevel - 2]) {
                st[currerLevel - 2].rang.push(index);
                st[currerLevel - 2] = null;
            }
        }

        st[currerLevel] = item;
        st[currerLevel].rang = [index];
        last = currerLevel;
    }
    if (st[last - 1]) {
        st[last - 1].rang.push(len);
    }

    let res = [];
    let min = 6;
    list.forEach(item => {
        min = Math.min(min, item.level);
        if (item.rang.length === 2) {
            let { rang: [start, end] } = item;
            item.childen = list.slice(start + 1, end);
            res.push(item);
        }
        delete item.rang;
    });
    return res.filter(item => item.level === min);
};

function tocHelper(str, options = {}) {
    options = Object.assign({
        min_depth: 1,
        max_depth: 6,
        class: 'toc',
        list_number: false,
        type: 'html'
    }, options);

    const data = tocObj(str, { min_depth: options.min_depth, max_depth: options.max_depth });
    if (options.type === 'data') return getTreeData(data)
    if (!data.length) return '';

    const className = escapeHTML(options.class);
    const listNumber = options.list_number;

    let result = `<ol class="${className}">`;

    const lastNumber = [0, 0, 0, 0, 0, 0];
    let firstLevel = 0;
    let lastLevel = 0;

    for (let i = 0, len = data.length; i < len; i++) {
        const el = data[i];
        const { level, id, text } = el;
        const href = id ? `#${id}` : null;
        lastNumber[level - 1]++;

        for (let i = level; i <= 5; i++) {
            lastNumber[i] = 0;
        }

        if (firstLevel) {
            for (let i = level; i < lastLevel; i++) {
                result += '</li></ol>';
            }

            if (level > lastLevel) {
                result += `<ol class="${className}-child">`;
            } else {
                result += '</li>';
            }
        } else {
            firstLevel = level;
        }

        result += `<li class="${className}-item ${className}-level-${level}">`;
        if (href) {
            result += `<a rel="nofollow" class="${className}-link" href="${href}"><span class="${className}-tips">${text}</span></a>`;
        } else {
            result += `<a rel="nofollow" class="${className}-link"><span class="${className}-tips">${text}</span></a>`;
        }
        lastLevel = level;
    }

    for (let i = firstLevel - 1; i < lastLevel; i++) {
        result += '</li></ol>';
    }

    return result;
} */

function tocHelper(str, options = {}) {
	options = Object.assign(
		{
			min_depth: 1,
			max_depth: 6,
			class: 'trm-toc',
			class_item: '',
			class_link: '',
			class_text: '',
			class_child: '',
			class_number: '',
			class_level: '',
			list_number: true,
		},
		options,
	);

	const data = tocObj(str, { min_depth: options.min_depth, max_depth: options.max_depth });

	if (!data.length) return '';

	const className = escapeHTML(options.class);
	const itemClassName = escapeHTML(options.class_item || options.class + '-item');
	const linkClassName = escapeHTML(options.class_link || options.class + '-link');
	const textClassName = escapeHTML(options.class_text || options.class + '-text');
	const childClassName = escapeHTML(options.class_child || options.class + '-child');
	const numberClassName = escapeHTML(options.class_number || options.class + '-number');
	const levelClassName = escapeHTML(options.class_level || options.class + '-level');
	const listNumber = options.list_number;

	let result = `<ol class="${className}">`;

	const lastNumber = [0, 0, 0, 0, 0, 0];
	let firstLevel = 0;
	let lastLevel = 0;

	for (let i = 0, len = data.length; i < len; i++) {
		const el = data[i];
		const { level, id, text } = el;
		const href = id ? `#${id}` : null;

		if (!el.unnumbered) {
			lastNumber[level - 1]++;
		}

		for (let i = level; i <= 5; i++) {
			lastNumber[i] = 0;
		}

		if (firstLevel) {
			for (let i = level; i < lastLevel; i++) {
				result += '</li></ol>';
			}

			if (level > lastLevel) {
				result += `<ol class="${childClassName}">`;
			} else {
				result += '</li>';
			}
		} else {
			firstLevel = level;
		}

		result += `<li class="${itemClassName} ${levelClassName}-${level}" title="${text}">`;
		if (href) {
			result += `<a rel="nofollow" class="${linkClassName}" href="${href}">`;
		} else {
			result += `<a class="${linkClassName}">`;
		}

		if (listNumber && !el.unnumbered) {
			result += `<span class="${numberClassName}">`;

			for (let i = firstLevel - 1; i < level; i++) {
				result += `${lastNumber[i]}.`;
			}

			result += '</span> ';
		}

		result += `<span class="${textClassName}">${text}</span></a>`;

		lastLevel = level;
	}

	for (let i = firstLevel - 1; i < lastLevel; i++) {
		result += '</li></ol>';
	}

	return result;
}

hexo.extend.helper.register('toc', tocHelper);
