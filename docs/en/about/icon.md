# Built-in icon

This theme has a built-in Font Awesome 5 icon by default, which can be copied by clicking the bottom icon.

::: tip
If you don't use many ICONS, you can reduce the size of the theme by [customizing icon](/en/guide/config.html#图标-icon) to cover [fixed icon](/guide/config.html#自定义图标-icon). (Well, it looks pretty big 😂)
:::

<link rel="stylesheet" href="/font-awesome.min.css">
<icon-list v-for="(item, key) in icons" v-bind="item"></icon-list>
<info-toast>copy success！</info-toast>

<script setup>
    import icons from "../../.vitepress/assets/icon.json";
</script>
