<script setup>
import sites from "../assets/sites.json";
const lessSites = sites.slice(0, 20).filter(item => !item.type);
const list = [...lessSites, ...lessSites];

defineProps({
	title: String,
});
</script>

<template>
	<div class="demo-template-cards">
		<div class="demo-template-title" v-if="title">{{ title }}</div>
		<div style="width: fit-content">
			<ul class="demo-template reverse">
				<li class="demo-template-column" v-for="item in list" :key="item">
					<a class="demo-template-card" :href="item.url" target="_blank" rel="noopener noreferrer">
						<div class="demo-template-avatar">
							<img alt="" style="top: -2px; positon: relative" :src="item.avatar" />
						</div>
						<div>
							<h4 class="text-truncate">{{ item.name }}</h4>
							<p>{{ item.desc }}</p>
						</div>
					</a>
				</li>
			</ul>
			<ul class="demo-template">
				<li class="demo-template-column" v-for="item in list" :key="item">
					<a class="demo-template-card" :href="item.url" target="_blank" rel="noopener noreferrer">
						<div class="demo-template-avatar">
							<img alt="" style="top: -2px; positon: relative" :src="item.avatar" />
						</div>
						<div>
							<h4 class="text-truncate">{{ item.name }}</h4>
							<p>{{ item.desc }}</p>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="less" scoped>
.demo-template-cards {
	width: 100%;
	overflow-x: hidden;
	padding: 64px 0;

	.demo-template-title {
		padding: 0px 0 30px;
		text-align: center;
		font-size: 22px;
		font-weight: bold;
	}
}

.demo-template {
	display: flex !important;
	animation: actions-starter-workflows 40s linear both infinite;

	&.reverse {
		animation: actions-starter-workflows 55s linear both infinite reverse;
	}

	& + .demo-template {
		margin-top: 20px;
	}

	&:hover {
		animation-play-state: paused;
	}

	.demo-template-column {
		padding-left: 10px !important;
		padding-right: 10px !important;
		min-width: 369px;

		.demo-template-card {
			border-radius: 6px;
			padding: 10px;
			box-shadow:
				0 1px 15px rgba(27, 31, 35, 0.11),
				0 0 1px rgba(106, 115, 125, 0.397);
			border: 1px solid var(--vp-c-bg-soft);
			background-color: var(--vp-c-bg-soft);
			display: flex;
			align-items: center;
			transition:
				transform 0.2s,
				box-shadow 0.2s;
			transform: scale(1);

			&:hover {
				transform: scale(1.05);
				z-index: 10;
			}

			.demo-template-avatar {
				border-radius: 50%;
				width: 60px;
				height: 60px;
				line-height: 60px;
				overflow: hidden;
				margin-right: 10px;
			}

			p {
				padding-top: 4px;
				line-height: 24px;
				font-size: 14px;
				font-weight: 500;
				color: var(--vp-c-text-2);
				white-space: nowrap;
			}
		}
	}

	@keyframes actions-starter-workflows {
		0% {
			transform: translateX(0%);
		}

		100% {
			transform: translateX(-50%);
		}
	}
}
</style>
