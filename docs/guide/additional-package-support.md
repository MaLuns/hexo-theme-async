# 额外依赖库支持

与第三方支持的区别是，此处大部分功能为安装插件或引入 CDN 实现，并由主题进行简单适配。

## 字数统计
安装 [hexo-wordcount](https://github.com/willin/hexo-wordcount)
``` bash
npm install hexo-wordcount
# or
yarn add hexo-wordcount
```
在配置文件 `_config.async.yml` 中：

- `count`: 字数统计
- `time`: 阅读时间

``` yaml
wordcount:
  enable: true
  count: true
  time: true
```

## RSS
安装 [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)。

```bash
npm install hexo-generator-feed
# or
yarn add hexo-generator-feed
```

可配置在 `_config.async.yml` 的 `social` 字段里，如：

``` yaml
sidebar:
  social:
    - icon: fas fa-rss
      url: atom.xml
```

更多配置请参见[官方文档](https://github.com/hexojs/hexo-generator-feed)（在 Hexo 工作目录下的 `_config.yml` 中进行）。

## 置顶

> 确保你的 [hexo-generator-index](https://github.com/hexojs/hexo-generator-index) 为 `2.0.0` 或以上

通过设置文章 Front Matter 中 `sticky` 属性以进行置顶，数值 >0 时越高，越靠前，数值 <0 时，越靠后。

```md
---
title: xxx
sticky: 100
---
```