<script setup>
import { computed } from "vue";
import YAML from "yaml";

import ObjectArrayInput from "./edit/ObjectArrayInput.vue";
import BaseInput from "./edit/BaseInput.vue";
import ArrayInput from "./edit/ArrayInput.vue";
import EnumInput from "./edit/EnumInput.vue";
import SwitchInput from "./edit/SwitchInput.vue";
import { isType } from "../libs/utils";

const props = defineProps({
	config: Object,
	showLabel: {
		type: Boolean,
		default: true,
	},
});

const inputType = {
	"[object String]": "text",
	"[object Null]": "text",
	"[object Number]": "number",
};

/**
 * 数据格式化
 */
const dataSchema = computed(() => {
	const valType = isType.getType(props.config.value.value);
	const data = {
		type: valType,
		component: BaseInput,
		attr: {},
	};

	if (isType.isBoolean(props.config.value.value)) {
		data.component = SwitchInput;
	}

	// 备注上 类型注解
	if (comment.value.typeStr) {
		const dataType = comment.value.typeStr[1];

		// 枚举类型值
		if (/^\[.*\]$/.test(dataType)) {
			data.type = "Enum";
			data.attr.option = dataType.replace(/[[\]]/g, "").split(",");
			data.component = EnumInput;
		} else if (dataType === "string[]") {
			// 字符串数组
			data.type = "StringArray";
			data.attr.type = "StringArray";
			data.component = ArrayInput;
		} else if (dataType === "object[]") {
			// 对象数组
			data.type = "ObjectArray";
			data.component = ObjectArrayInput;
		}

		// 将节点类型 YAMLSeq2(数组结构) 改为 Scalar2(通用结构)
		if (props.config.value.constructor.name === "YAMLSeq2") {
			const node = YAML.createNode("", true);
			node.value = props.config.toJSON()[props.config.key.value] ?? [];
			node.type = "SEQ";
			props.config.value = node;
		}
	} else {
		data.attr.type = inputType[valType];
	}

	// 属性注释上申明数据结构  key.commentBefore
	if (/{{.*}}/.test(props.title)) {
		data.attr.schema = JSON.parse(`${/{({.*})}/.exec(props.title)[1]}`);
	}

	// 属性注释上申明数据结构  node.comment
	if (comment.value.schemaStr) {
		data.attr.schema = JSON.parse(`${comment.value.schemaStr[1]}`);
	}

	return data;
});

/**
 * 当前配置备注信息
 */
const comment = computed(() => {
	let comment = props.config.comment ?? ""; //val.key.value
	if (props.config.value && props.config.value.comment) comment = props.config.value.comment;
	let comments = comment.split("|");
	comment = comments[1] || comments[0];

	return {
		title: comment
			.replace(/<.*>/g, "")
			.replace(/{{.*}}/g, "")
			.trim(),
		typeStr: /<(.*)>/.exec(comment),
		schemaStr: /{({.*})}/.exec(comment),
	};
});
</script>

<template>
	<div class="form-item">
		<component v-model="config.value.value" :is="dataSchema.component" v-bind="dataSchema.attr"></component>
		<div v-if="showLabel && !['ObjectArray'].includes(dataSchema.type)" class="form-item-label">
			{{ comment.title }}
		</div>
	</div>
</template>
<style lang="less" scoped>
.search-input {
	width: 200px;
}

.form-item {
	display: flex;
	align-items: center;
	margin: 10px 0;

	&-label {
		padding-left: 10px;
	}
}
</style>
