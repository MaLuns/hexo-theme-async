/**
 * 类型判断
 */
export const isType = (vals => {
	const isType = {
		getType: val => Object.prototype.toString.call(val),
	};
	vals.forEach(key => {
		isType[`is${key}`] = val => Object.prototype.toString.call(val) === `[object ${key}]`;
	});
	return isType;
})(['Array', 'Boolean', 'Number', 'Object', 'String', 'Undefined', 'Null']);

export const makeDestructurable = (obj, arr) => {
	if (typeof Symbol !== 'undefined') {
		const clone = { ...obj };

		Object.defineProperty(clone, Symbol.iterator, {
			enumerable: false,
			value() {
				let index = 0;
				return {
					next: () => ({
						value: arr[index++],
						done: index > arr.length,
					}),
				};
			},
		});

		return clone;
	} else {
		return Object.assign([...arr], obj);
	}
};

const cacheStringFunction = fn => {
	const cache = Object.create(null);
	return str => {
		const hit = cache[str];
		return hit || (cache[str] = fn(str));
	};
};

export const camelize = cacheStringFunction(str => {
	return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
});
