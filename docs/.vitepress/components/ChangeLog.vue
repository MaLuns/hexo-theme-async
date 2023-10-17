<script setup>
const types = {
	feat: "✨",
	fix: "🐞",
	perf: "🎈",
	refactor: "🦄",
	style: "🌈",
	docs: "📃",
};
defineProps({
	type: String,
	text: {
		type: String,
		default: "",
	},
});
</script>

<template>
	<li class="log" :class="type" :title="type">
		<slot>
			<span class="type">{{ types[type] }}：</span>
			<span v-html="text"></span>
		</slot>
	</li>
</template>

<style lang="less" scoped>
.log {
	list-style: none;

	&.feat {
		color: #2d8cf0;
	}

	&.fix {
		color: #d9391b;
	}

	// 样式
	&.style {
		color: #b86d3b;
	}

	// 优化
	&.refactor {
		color: #35b9d7;
	}
}
</style>
