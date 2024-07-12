<script setup>
const props = defineProps(["modelValue", "type"]);
const emit = defineEmits(["update:modelValue"]);

const onArrayInput = e => {
	if (props.type === "NumberArray") {
		emit(
			"update:modelValue",
			e.target.value.split(",").map(i => Number(i)),
		);
	} else {
		emit("update:modelValue", e.target.value.split(","));
	}
};
</script>

<template>
	<input :value="props.modelValue?.join(',')" @input="onArrayInput" type="text" class="search-input box-input" placeholder="多条请用逗号分隔" />
</template>
