/**
 * Regular expression
 */
const regExp = {
	http: /^http:\/\/|^https:\/\/|^\/\//,
};

/**
 * Is a object?
 * typeof [] === "object"
 * @param {*} item
 */
function isObject(item) {
	return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Merge with override array (modify target object)
 * @param {*} target
 * @param {*} source
 */
function merge(target, source) {
	for (const key in source) {
		if (isObject(target[key]) && isObject(source[key])) merge(target[key], source[key]);
		else target[key] = source[key];
	}
	return target;
}

/**
 *
 * @param {*} obj
 * @returns
 */
function isPlainObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 *
 * @param {*} obj
 * @param {*} __
 * @returns
 */
function toI18n(obj, __) {
	let isArr = Array.isArray(obj);
	if (isArr || (isPlainObject(obj) && obj.toString === Object.prototype.toString)) {
		let target = isArr ? [] : {};
		for (let key in obj) {
			if (isArr) {
				if (Array.isArray(key) && isPlainObject(key)) {
					target.push(toI18n(key, __));
				} else if (typeof obj[key] === 'string') {
					target.push(__(key));
				} else {
					target.push(key);
				}
			} else {
				if (Array.isArray(obj[key]) && isPlainObject(obj[key])) {
					target[key] = toI18n(obj[key], __);
				} else if (typeof obj[key] === 'string') {
					target[key] = __(obj[key]);
				} else {
					target[key] = obj[key];
				}
			}
		}
		return target;
	} else {
		return __(obj);
	}
}

function escapeBackslash(path) {
	// Replace backslashes on Windows
	return path.replace(/\\/g, '/');
}

module.exports = {
	merge,
	toI18n,
	isPlainObject,
	escapeBackslash,
	regExp,
};
