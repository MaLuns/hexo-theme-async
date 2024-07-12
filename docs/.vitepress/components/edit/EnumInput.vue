<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
	modelValue: [String, Number],
	option: {
		type: Array,
		default: () => [],
	},
});
</script>

<template>
	<select class="search-input box-input" :value="props.modelValue" @change="emit('update:modelValue', $event.target.value)">
		<option v-for="item in option" :value="item">
			{{ item }}
		</option>
	</select>
</template>

<style lang="less" scoped>
.box-input {
	width: 200px;
}
</style>
