<script setup>
import { ref, reactive, toRaw } from "vue";
import yaml from "yaml";
import config from "../../../packages/hexo-theme-async/_config.yml?raw";
import EditConfigItem from "./EditConfigItem.vue";
import { isType } from "../libs/utils";

const toast = ref();

const configYaml = yaml.parseAllDocuments(config)[0];
const configJson = configYaml.toJSON();

// 过滤深层属性
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
const editConfigs = reactive(
	configYaml.contents.items.filter(item => {
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
	}),
);

// 获取 json 改动内容
const diffJson = (oldJson, newJson) => {
	if (isType.isObject(oldJson) && isType.isObject(newJson)) {
		// 对象
		let diffVal;
		for (const key in newJson) {
			const diff = diffJson(oldJson[key], newJson[key]);
			if (diff !== undefined) {
				diffVal = diffVal ?? {};
				diffVal[key] = diff;
			}
		}
		return diffVal;
	} else if (isType.isArray(oldJson) && isType.isArray(newJson)) {
		// 数组
		if (oldJson.length !== newJson.length || newJson.some((val, i) => diffJson(val, oldJson[i]) !== undefined)) {
			return newJson;
		}
	} else {
		// 基础类型
		if (oldJson !== newJson) {
			return newJson;
		}
	}
};

const onCopy = () => {
	configYaml.contents.items = toRaw(editConfigs);
	const newConfigJson = configYaml.toJSON();
	navigator.clipboard.writeText(yaml.stringify(diffJson(configJson, newConfigJson)));
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
	<p>
		提供主题中 90%+ 配置生成，根据您需求在下面表单进行修改，完成后点击 复制配置 将复制配置添加进入您 配置文件即可。
		<br />
		<br />
		不支持配置主要为三方插件相关配置。
	</p>
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
	z-index: 10;
	background-color: var(--vp-nav-bg-color);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
}
</style>
