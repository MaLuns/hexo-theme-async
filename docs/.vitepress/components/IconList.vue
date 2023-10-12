<script setup>
import { ref, watch } from "vue";

const props = defineProps({
	title: String,
	prefix: String,
	icons: Array,
	h2: Boolean,
});

let iconList = ref(props.icons);
const show = ref(true);
const searchVal = ref("");
const toast = ref();

function change() {
	show.value = !show.value;
}

function copyIcon(icon) {
	navigator.clipboard.writeText(`<i class="${props.prefix} ${icon}"></i>`);
	toast.value.show(`<${icon}> 复制成功！`);
}

watch(searchVal, newVal => {
	iconList.value = props.icons.filter(item => {
		return item.includes(newVal);
	});
});
</script>

<template>
	<info-toast ref="toast"></info-toast>
	<div class="title" :id="title" v-if="!h2">
		<span @click="change">
			<i :class="`fas fa-angle-${show ? 'down' : 'right'}`"></i>
			&nbsp;&nbsp;{{ title }} ({{ iconList.length }})
		</span>
		<input class="search-input" v-model="searchVal" placeholder="Search Icon" />
	</div>
	<h2 class="title" :id="title" v-else>
		<span @click="change">
			<i :class="`fas fa-angle-${show ? 'down' : 'right'}`"></i>
			&nbsp;&nbsp;{{ title }} ({{ iconList.length }})
		</span>
		<input class="search-input" v-model="searchVal" placeholder="Search Icon" />
	</h2>
	<ul class="icon-list" v-show="show">
		<li v-for="item in iconList" @click="copyIcon(item)">
			<i :class="`${prefix} ${item}`"></i>
		</li>
	</ul>
</template>

<style lang="less" scoped>
.title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;

	span {
		cursor: pointer;
		user-select: none;
	}

	.search-input {
		border-radius: 4px;
		border: 1px solid rgb(206, 206, 206);
		padding: 0.2em 0.6em;
		background: transparent;
		transition: border 0.3s;

		&:focus {
			border: 1px solid var(--vp-c-brand);
		}
	}
}

.icon-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, 80px);
	grid-gap: 10px;
	justify-content: center;
	list-style: none !important;
	margin: 0px !important;
	padding: 0px !important;
	text-align: center;

	li {
		cursor: pointer;
		border-radius: 3px;
		margin: 0px !important;
		padding: 20px !important;
		transition:
			background-color 0.2s,
			transform 0.2s;

		i {
			width: 40px;
			font-size: 36px;
			line-height: 40px;
		}

		&:hover {
			background-color: var(--vp-c-bg-alt);
			transform: scale(1.2);
		}
	}
}
</style>
