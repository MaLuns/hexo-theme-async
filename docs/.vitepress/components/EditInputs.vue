<script setup>
import { computed } from "vue";
import YAML from "yaml";
import EditObjectArray from "./EditObjectArray.vue";

const props = defineProps({
	config: Object,
	showTitle: {
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
 * 配置数据类型
 */
const dataSchema = computed(() => {
	const type = {
		type: Object.prototype.toString.call(props.config.value.value),
		option: [false, true],
		schema: {},
	};

	/**
	 *  属性备注上申明数据类型 - 	数据类型声明格式
	 *  <[enum,enum]> 枚举
	 *  <string[]> 字符串数组
	 *  <object[]> 对象数组
	 */

	if (comment.value.typeStr) {
		const dataType = comment.value.typeStr[1];

		// 枚举类型值
		if (/^\[.*\]$/.test(dataType)) {
			type.type = "Enum";
			type.option = dataType.replace(/[[\]]/g, "").split(",");
		} else if (dataType === "string[]") {
			// 字符串数组
			type.type = "StringArray";
		} else if (dataType === "object[]") {
			// 对象数组
			type.type = "ObjectArray";
		}

		// 将节点类型 YAMLSeq2(数组结构) 改为 Scalar2(通用结构)
		if ((props.config, props.config.value.constructor.name === "YAMLSeq2")) {
			const node = YAML.createNode("", true);
			node.value = props.config.toJSON()[props.config.key.value] ?? [];
			props.config.value = node;
		}
	}

	// 属性注释上申明数据结构  key.commentBefore
	if (/{{.*}}/.test(props.title)) {
		type.schema = JSON.parse(`${/{({.*})}/.exec(props.title)[1]}`);
	}

	// 属性注释上申明数据结构  node.comment
	if (comment.value.schemaStr) {
		type.schema = JSON.parse(`${comment.value.schemaStr[1]}`);
	}

	return type;
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

const onArrayInput = e => {
	props.config.value.value = e.target.value.split(",");
	if (dataSchema.type === "NumberArray") {
		props.config.value.value = props.config.value.value.map(i => Number(i));
	}
};
</script>

<template>
	<div class="form-item">
		<!-- 基础类型 -->
		<input v-if="['[object String]', '[object Null]', '[object Number]'].includes(dataSchema.type)" v-model="config.value.value" :type="inputType[dataSchema.type]" class="search-input box-input" />
		<!-- 枚举选择 -->
		<select v-if="['[object Boolean]', 'Enum'].includes(dataSchema.type)" class="search-input box-input" v-model="config.value.value">
			<option v-for="item in dataSchema.option" :value="item">{{ item }}</option>
		</select>
		<!-- 字符串数组 -->
		<input v-if="['StringArray'].includes(dataSchema.type)" :value="config.value?.value?.join(',')" @input="onArrayInput" type="text" class="search-input box-input" placeholder="多条请用逗号分隔" />
		<!-- 对象数组 -->
		<EditObjectArray v-if="['ObjectArray'].includes(dataSchema.type)" v-model:value="props.config.value.value" :schema="dataSchema.schema" />

		<div v-if="showTitle && !['ObjectArray'].includes(dataSchema.type)" class="form-item-label">
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
	margin: 10px 0;

	&-label {
		padding-left: 20px;
	}
}
</style>
