<script setup>
import { defineComponent, h } from "vue";
import EditInputs from "./EditInputs.vue";

defineProps({
	config: Object,
	title: String,
	lev: {
		type: Number,
		default: 2,
	},
});

const Title = defineComponent({
	props: { title: String, lev: Number },
	render(props) {
		const id = props.title
			.replace(/<.*>/g, "")
			.replace(/{{.*}}/g, "")
			.trim();
		return h(`h${Math.min(5, props.lev)}`, { id }, [
			id,
			h("a", {
				class: "header-anchor",
				href: `#${id}`,
				ariaLabel: `Permalink to &quot;${id}&quot;`,
			}),
		]);
	},
});

const getTitle = item => {
	return ["MAP", "SEQ"].includes(item.value.type) || /<object\[\]>/.test(item.comment) ? item.comment : undefined;
};
</script>
<template>
	<div>
		<!-- && ['MAP', 'SEQ'].includes(config.value?.type) -->
		<template v-if="title">
			<Title :lev="lev" :title="title" />
		</template>

		<!-- 数据输入 -->
		<EditInputs v-if="config.value?.type === 'PLAIN'" :config="config" />

		<!-- 对象 -->
		<template v-else-if="config.value?.type === 'MAP'">
			<template v-for="item in config.value?.items">
				<EditConfigItem :config="item" :title="getTitle(item)" :lev="lev + 1" />
			</template>
		</template>
		<!-- 数组 -->
		<template v-else-if="config.value?.type === 'SEQ'">
			<EditInputs :config="config" :show-label="false" />
		</template>
	</div>
</template>
<style lang="less" scoped></style>
