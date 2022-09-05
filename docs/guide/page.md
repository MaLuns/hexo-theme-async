# 页面配置

本主题默认支持并使用以下页面类型。

## 文章 Posts

- `keywords`：关键字，用于 meta 标签
- `description`: 描述，用于 meta 标签
- `photos`：文章封面图 (下个版本弃用) 
- `cover`: 文章封面图 
- ~~`top`: 首页排序值~~
- `sticky`: 首页排序值

内置的置顶脚本已删除，将 `hexo-generator-index` 升级到 `2.0.0` 以上版本即可。

``` yaml
---
title: 从零开始搭建一个后台模板
keywords: admin-template,vue,element,后台模板
photos: [https://www.logosc.cn/uploads/resources/2018/11/29/1543459457_thumb.jpg]
sticky: 10
---
```


## 归档 Archives
Hexo 默认支持。

## 分类 Categories
Hexo 默认支持。

## 友链 Links

新建友链页面。

```bash
hexo new page links
```
进入 `source/links/index.md`，设置 `layout` 字段。

``` yaml
---
title: 友情链接
type: links
---
```
在 `_config.async.yml` 中的 `links` 添加友链列表信息。

- `name`: 站点名称
- `url`: 博客链接
- `image`: 头像图片链接
- `desc`: 一句话描述

``` yaml
links:
  - name: 白云苍狗
    url: //www.imalun.com/
    image: //www.imalun.com/images/avatar.jpg
    desc: 醒，亦在人间；梦，亦在人间
```

## 关于 About
新建关于页面。

```bash
hexo new page about
```

进入 `source/about/index.md`，设置 `layout` 字段。

``` yaml
---
title: 关于
type: about
---
```

如果使用内置模板，可以设置 `_config.async.yml` 中的 `about`。
``` yaml
about:
  title:        # 标题
  introduction: # 个人简单描述
  blog:         # 博客信息
  privacy:      # 隐私权说明    
```
你也可以直接在 `source/about/index.md` 编写你的关于页面， 如果 `about/index.md` 有内容则优先使用自定义内容，否则使用配置项内容。

## 404 Not Found
可以直接在 `source` 目录下新建 `404.md`。
``` yaml
---
layout: 404
---
```

在本地，你也可以直接访问 `/404.html` 查看效果。只有当你将其部署到 `GitHub Pages` 上，你访问不存在的页面才会显示。