# 内置图标
本主题默认内置了 Font Awesome 5 图标，点击下方图标即可复制。

<link rel="stylesheet" href="/font-awesome.min.css">
<icon-list v-for="(item, key) in icons" v-bind="item"></icon-list>
<info-toast>复制成功！</info-toast>

<script setup>
    import icons from "../.vitepress/assets/icon.json";
</script>