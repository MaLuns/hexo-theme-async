<script setup >
import logs from "../assets/log.json";
</script>
        
<template>
    <template v-for="item in logs">
        <h2 :id="item.large_version.replace(/\./g, '-')">
            {{ item.large_version }}
            <a class="header-anchor" :href="`#${item.large_version.replace(/\./g, '-')}`" aria-hidden="true">#</a>
        </h2>
        <template v-for="log in item.children">
            <blockquote>
                <Badge :type="log.version.search('beta') > -1 ? 'warning' : 'tip'">{{ log.version }}</Badge>
                <span>{{ log.date }}</span>
            </blockquote>
            <ul>
                <ChangeLog v-for="(item, index) in log.logs" v-bind="item" :key="index"></ChangeLog>
            </ul>
        </template>
    </template>
</template>
<style lang="less" scoped>
blockquote {
    display: flex;
    justify-content: space-between;
    align-items: end;
}

ul {
    background: var(--vp-c-bg-alt);
    padding: 10px 10px 10px 30px;
    border-radius: 6px;
}
</style>