<script setup>
import { onMounted, ref, watch } from "vue";

const emits = defineEmits(["update:value"]);

const props = defineProps({
	value: Object,
	schema: Object,
});

const ckey = ref(0);
const vals = ref();

onMounted(() => {
	vals.value = props.value ?? [];
	watch(
		vals,
		val => {
			emits("update:value", val);
		},
		{ deep: true },
	);
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
	<div class="edit-object-array" :key="ckey">
		<button class="par-button" @click="onAdd">新增</button>
		<div class="form" v-for="(data, i) in vals">
			<div style="flex-shrink: 0">
				<button class="close-button" @click="onDel(i)" title="删除">
					<i class="fas fa-times"></i>
				</button>
			</div>
			<div style="flex: 1">
				<div class="form-item" v-for="(item, key) in schema">
					<div class="form-item-label">{{ key }}</div>
					<template v-if="Array.isArray(item)">
						<EditObjectArray v-model:value="data[key]" :schema="schema"></EditObjectArray>
					</template>
					<template v-else>
						<input v-model="data[key]" class="box-input" type="text" />
					</template>
				</div>
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
