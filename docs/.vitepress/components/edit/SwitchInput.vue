<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: Boolean });
</script>

<template>
	<label class="switch">
		<input type="checkbox" :checked="props.modelValue" @change="emit('update:modelValue', $event.target.checked)" />
		<span class="slider round"></span>
	</label>
</template>
