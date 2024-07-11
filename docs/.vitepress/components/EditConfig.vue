<script setup>
import { ref } from "vue";
import yaml from "yaml";
import config from "../../../packages/hexo-theme-async/_config.yml?raw";
import EditConfigItem from "./EditConfigItem.vue";

const toast = ref();

const configYaml = yaml.parseAllDocuments(config)[0];

const filterConfig = list => {
	list = list.filter(item => {
		if (item.comment) {
			const comments = item.comment.split("\n").reverse()[0].split("|");
			item.comment = comments[1] || comments[0];
			if (!/^#/.test(item.comment)) {
				if (item.value?.items) {
					item.value.items = filterConfig(item.value.items);
				}
				return true;
			} else {
				return false;
			}
		}
		return true;
	});

	return list;
};

// 过滤掉不支持生产配置
const editConfigs = configYaml.contents.items.filter(item => {
	if (item.key?.commentBefore) {
		const comment = item.key.commentBefore.split("\n").reverse()[0];
		const comments = comment.split("|");
		item.key.commentBefore = comments[1] || comments[0];

		if (item.value?.items) {
			item.value.items = filterConfig(item.value.items);
		}

		return !/^#/.test(comment);
	} else {
		return false;
	}
});

console.log(editConfigs, yaml);

const onCopy = () => {
	configYaml.contents.items = editConfigs;
	console.log(yaml.stringify(configYaml));
	navigator.clipboard.writeText(yaml.stringify(configYaml));
	toast.value.show(`复制成功！`);
};
</script>
<template>
	<div class="buttons">
		<div class="title">
			<i class="fas fa-cat"></i>
			配置生成器
		</div>
		<button class="par-button" @click="onCopy">
			<i class="fas fa-copy"></i>
			复制配置
		</button>
	</div>
	<p>提供主题中 90%+ 配置生成，根据您需求在下面表单进行修改，完成后点击 复制配置 将复制配置添加进入您 配置文件即可。</p>
	<EditConfigItem v-for="item in editConfigs" :key="item.key.value" :config="item" :title="item.key?.commentBefore" />
	<info-toast ref="toast"></info-toast>
</template>

<style lang="less" scoped>
.buttons {
	.title {
		font-size: 20px;
		font-weight: 600;
	}

	position: sticky;
	top: var(--vp-nav-height);
	z-index: 999;
	background-color: var(--vp-nav-bg-color);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
}
</style>
