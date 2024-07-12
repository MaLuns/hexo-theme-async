import { defineComponent, shallowRef } from 'vue';
import { camelize, makeDestructurable } from './utils';

export function createReusableTemplate(options = {}) {
	const { inheritAttrs = true } = options;

	const render = shallowRef();

	const define = defineComponent({
		setup(_, { slots }) {
			return () => {
				render.value = slots.default;
			};
		},
	});

	const reuse = defineComponent({
		inheritAttrs,
		setup(_, { attrs, slots }) {
			return () => {
				if (!render.value && process.env.NODE_ENV !== 'production') throw new Error('[VueUse] Failed to find the definition of reusable template');
				const vnode = render.value?.({ ...keysToCamelKebabCase(attrs), $slots: slots });

				return inheritAttrs && vnode?.length === 1 ? vnode[0] : vnode;
			};
		},
	});

	return makeDestructurable({ define, reuse }, [define, reuse]);
}

function keysToCamelKebabCase(obj) {
	const newObj = {};
	for (const key in obj) newObj[camelize(key)] = obj[key];
	return newObj;
}
