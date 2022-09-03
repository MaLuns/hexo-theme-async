<script setup >
import logs from "../assets/log.json";
</script>
        
<template>
    <template v-for="item in logs">
        <h2 :id="item.large_version.replace(/\./g,'-')">
            {{ item.large_version }}
            <a class="header-anchor" :href="`#${item.large_version.replace(/\./g,'-')}`" aria-hidden="true">#</a>
        </h2>
        <template v-for="log in item.children">
            <blockquote>
                <Badge>{{ log.version }}</Badge>
            </blockquote>
            <ul>
                <ChangeLog v-for="(item, index) in log.logs" v-bind="item" :key="index"></ChangeLog>
            </ul>
        </template>
    </template>
</template>