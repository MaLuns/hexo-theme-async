<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
	modelValue: [String, Number],
	type: {
		type: String,
		default: "text",
	},
});
</script>

<template>
	<input :value="props.modelValue" :type="type" class="search-input box-input" @input="emit('update:modelValue', $event.target.value)" />
</template>
