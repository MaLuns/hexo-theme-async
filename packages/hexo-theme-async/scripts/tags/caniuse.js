/**
 * Can i use
 * transplant from hexo-theme-next
 */

'use strict';

function caniUse(args) {
	const [feature, periods = 'current'] = args.join('').split('@');

	if (!feature) {
		hexo.log.warn('Caniuse feature can NOT be empty.');
		return '';
	}

	return `<iframe data-feature="${feature}" src="https://caniuse.bitsofco.de/embed/index.html?feat=${feature}&periods=${periods}&accessible-colours=false" frameborder="0" width="100%" height="400px"></iframe>`;
}

hexo.extend.tag.register('caniuse', caniUse);
