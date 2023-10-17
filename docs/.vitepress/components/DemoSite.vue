<script setup>
defineProps({
	site: {
		type: Object,
		default: () => ({
			name: "白云苍狗",
			url: "https://www.imalun.com",
			avatar: "https://www.imalun.com/img/avatar.jpg",
			desc: "主题默认示例",
		}),
	},
});
</script>

<template>
	<a class="site-link" :href="site.url" target="_blank">
		<img :src="site.avatar" />
		<br />
		<sub :title="site.desc">{{ site.name }}</sub>
	</a>
</template>

<style lang="less" scoped>
.site-link {
	text-align: center;

	img {
		margin: 0 6px;
		width: 64px;
		height: 64px;
		overflow: hidden;
		border-radius: 50%;
	}

	sub {
		display: block;
		font-size: 0.75rem;
		line-height: 1rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
