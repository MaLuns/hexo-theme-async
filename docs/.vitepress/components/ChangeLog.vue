<script setup >
const props = defineProps({
    type: String,
    text: {
        type: String,
        default: ''
    }
})

</script>
    
<template>
    <li class="log" :class="type">
        <slot>{{ type }}：<span v-html="text"></span></slot>
    </li>
</template>
    
<style lang="less" scoped>
.log {
    &.feat {
        color: #2d8cf0;
    }

    &.fix {
        color: #ff2600;
    }

    // 样式
    &.style {
        color: #2db7f5;
    }

    // 优化
    &.refactor {
        color: #19be6b;
    }
}
</style>
        