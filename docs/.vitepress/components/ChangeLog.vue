<script setup>
import { computed } from "vue";

const types = {
	feat: "✨",
	fix: "🐞",
	perf: "🎈",
	refactor: "🦄",
	style: "🌈",
	docs: "📃",
};

const props = defineProps({
	type: String,
	text: {
		type: String,
		default: "",
	},
});

const htmlstr = computed(() => {
	return props.text
		.replace(/#d\d{1,}/, p => {
			const id = p.replace(/#d/, "");
			return `<a href='https://github.com/MaLuns/hexo-theme-async/discussions/${id}' target='_blank' rel='noreferrer'>#${id}</a>`;
		})
		.replace(/#\d{1,}/, p => {
			const id = p.replace(/#/, "");
			return `<a href='https://github.com/MaLuns/hexo-theme-async/issues/${id}' target='_blank' rel='noreferrer'>#${id}</a>`;
		});
});
</script>

<template>
	<li class="log" :class="type" :title="type">
		<slot>
			<span class="type">{{ types[type] }}：</span>
			<span v-html="htmlstr"></span>
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
