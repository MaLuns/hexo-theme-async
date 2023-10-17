const { toI18n, isPlainObject } = require('../utils');

function variableHelper(name, val, isLang = false, isSwupScript = false) {
	if (![null, undefined].includes(val) && typeof name === 'string') {
		if (isLang) {
			const { __ } = this;
			val = toI18n(val, __);
		}

		let varStr = Array.isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString) ? JSON.stringify(val, null, 2) : `'${String(val)}'`;
		return `<script ${isSwupScript ? 'data-swup-reload-script' : ''}>window.${name}=${varStr}</script>`;
	}
}

hexo.extend.helper.register('variable', variableHelper);
