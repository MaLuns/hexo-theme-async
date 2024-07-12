<script setup>
import { onMounted, ref, watch } from "vue";
import { isType } from "../../libs/utils";
import ArrayInput from "./ArrayInput.vue";
import { createReusableTemplate } from "../../libs/template";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
	modelValue: Object,
	schema: Object,
});

const ckey = ref(0);
const vals = ref();
// let defVal = {}
// let schema = {}

const [DefineTemplate, ReuseTemplate] = createReusableTemplate();

const ininScheam = val => {
	if (isType.isObject(val)) {
		let newVal = {};
		for (const key in val) {
			newVal[key.split(":")[0]] = ininScheam(val[key]);
		}
		return newVal;
	} else if (isType.isArray(val)) {
		return val.map(item => {
			if (isType.isObject(item)) {
				let newVal = {};
				for (const key in item) {
					newVal[key.split(":")[0]] = ininScheam(item[key]);
				}
				return newVal;
			} else {
				return item;
			}
		});
	} else {
		return val;
	}
};

onMounted(() => {
	console.log(JSON.stringify(ininScheam(props.schema), null, 2));
	vals.value = props.modelValue ?? [];
	watch(vals, val => emits("update:modelValue", val), { deep: true });
});

const onAdd = () => {
	vals.value.push(JSON.parse(JSON.stringify(props.schema)));
};

const onDel = i => {
	vals.value.splice(i, 1);
	ckey.value += 1;
};
</script>
<template>
	<DefineTemplate v-slot="{ schemas, data }">
		<div class="form-item" v-for="(item, key) in schemas">
			<div class="form-item-label">{{ key.split(":")[1] }}</div>

			<!-- 嵌套数组 -->
			<template v-if="isType.isArray(item)">
				<!-- 数组元素结构是自身 -->
				<template v-if="item.length === 0">
					<ObjectArrayInput v-model="data[key]" :schema="schemas"></ObjectArrayInput>
				</template>
				<template v-else>
					<!-- 数组元素结构是对象 -->
					<template v-if="isType.isObject(item[0])">
						<ObjectArrayInput v-model="data[key]" :schema="item[0]"></ObjectArrayInput>
					</template>
					<!-- 数组元素结构是基础数据 -->
					<template v-else>
						<ArrayInput v-model="data[key]"></ArrayInput>
					</template>
				</template>
			</template>
			<!-- 嵌套对象 -->
			<div v-else-if="isType.isObject(item)">
				<ReuseTemplate :schemas="item" :data="data[key]" />
			</div>
			<!-- 普通值 -->
			<template v-else>
				<input v-model="data[key]" class="box-input" type="text" />
			</template>
		</div>
	</DefineTemplate>

	<div class="edit-object-array" :key="ckey">
		<button class="par-button" @click="onAdd">新增</button>
		<div class="form" v-for="(data, i) in vals">
			<div style="flex-shrink: 0">
				<button class="close-button" @click="onDel(i)" title="删除">
					<i class="fas fa-times"></i>
				</button>
			</div>
			<div style="flex: 1">
				<ReuseTemplate :schemas="schema" :data="data" />
				<!-- 	<div class="form-item" v-for="(item, key) in schema">
					<div class="form-item-label">{{ key.split(':')[1] }}</div>
					<template v-if="isType.isArray(item)">
						<template v-if="item.length === 0">
							<ObjectArrayInput v-model="data[key]" :schema="schema"></ObjectArrayInput>
						</template>
<template v-else>

						</template>
</template>
<template v-else-if="isType.isObject(item)">

					</template>
<template v-else>
						<input v-model="data[key]" class="box-input" type="text" />
					</template>
</div> -->
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped>
.edit-object-array {
	width: 100%;
}

.form {
	display: flex;
	justify-content: space-between;
	border: 1px solid var(--vp-c-gutter);
	margin-top: 10px;
	border-radius: 4px;
	width: 100%;
	padding: 10px;

	+ .form {
		margin-top: 10px;
	}

	.form-item {
		padding: 0 10px;
		display: flex;
		align-items: center;

		+ .form-item {
			margin-top: 20px;
		}

		&-label {
			width: 80px;
			text-align: right;
			padding-right: 8px;
			flex-shrink: 0;
		}
	}
}

.close-button {
	background-color: var(--vp-c-danger-1);
	color: var(--vp-c-bg);
	width: 24px;
	height: 24px;
	text-align: center;
	display: inline-block;
	border-radius: 6px;
	cursor: pointer;
	user-select: none;
}
</style>
