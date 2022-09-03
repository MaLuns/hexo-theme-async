<script setup >

defineProps({
    type: String,
    text: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <span class="badge" :class="type">
        <slot>{{ text }}</slot>
    </span>
</template>

<style scoped>
.badge {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #0078e7;
    background-color: #0077e713;
    color: #0078e7;
    padding: 2px 12px;
    font-size: 14px;
    line-height: 20px;
}
</style>
    