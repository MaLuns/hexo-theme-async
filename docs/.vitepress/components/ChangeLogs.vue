<script setup>
import logs from "../assets/log.json";
</script>

<template>
	<template v-for="item in logs">
		<h2 :id="item.large_version.replace(/\./g, '-')">
			{{ item.large_version }}
			<a class="header-anchor" :href="`#${item.large_version.replace(/\./g, '-')}`" aria-hidden="true">&ZeroWidthSpace;</a>
		</h2>
		<template v-for="log in item.children">
			<div class="header-title">
				<Badge :type="log.version.search('beta') > -1 ? 'warning' : 'tip'">{{ log.version }}</Badge>
				<span>{{ log.date }}</span>
			</div>
			<ul>
				<ChangeLog v-for="(item, index) in log.logs" v-bind="item" :key="index"></ChangeLog>
			</ul>
		</template>
	</template>
</template>
<style lang="less" scoped>
.header-title {
	display: flex;
	justify-content: space-between;
	align-items: center;

	.VPBadge {
		transform: translateY(0px);
	}
}

ul {
	background: var(--vp-c-bg-alt);
	padding: 10px 10px 10px 20px;
	border-radius: 6px;
}
</style>
