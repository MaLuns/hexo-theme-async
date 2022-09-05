# 内置图标
本主题默认内置了 Font Awesome 5 图标，点击下方图标即可复制。

::: tip
如果您使用的图标并不是很多，您可以通过 [自定义图标](/guide/config.html#图标-icon) 来覆盖 [固定图标](/guide/config.html#自定义图标-icon) 方式缩减主题大小。(嗯，目测 Font Awesome 5 还是挺大的😂)
:::

<link rel="stylesheet" href="/font-awesome.min.css">
<icon-list v-for="(item, key) in icons" v-bind="item"></icon-list>
<info-toast>复制成功！</info-toast>

<script setup>
    import icons from "../.vitepress/assets/icon.json";
</script>