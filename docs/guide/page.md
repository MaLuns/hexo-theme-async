# 页面配置

本主题默认支持并使用以下页面类型。

## 文章 Posts

- `keywords`：关键字，用于 meta 标签
- `description`：描述，用于 meta 标签
- `cover`：文章封面图，可为字符串或数组，如果数组长度为 2 则会根据主题自动切换。
- `sticky`：首页排序值
- `banner`：文章页横幅背景，字段参考 [横幅 banner.default](/guide/config.html#横幅-banner) 字段。
- `toc`：是否显示目录，仅当值为 false 生效。默认通过 `_config.async.yaml` 的 `toc` 控制。
- `single_column`：单栏显示详情页，为 true 时生效。
- `author`：文章作者
- `originalLink`：文章源链接（用于转载）

内置的置顶脚本已删除，将 `hexo-generator-index` 升级到 `2.0.0+` 以上版本即可。

```yaml
---
title: 从零开始搭建一个后台模板
keywords: admin-template,vue,element,后台模板
cover: [https://www.logosc.cn/uploads/resources/2018/11/29/1543459457_thumb.jpg]
sticky: 10
banner:
  type: img
  bgurl: https://pic1.zhimg.com/v2-b3c2c6745b9421a13a3c4706b19223b3_r.jpg
  bannerText: Hi my new friend!
toc: false # 无需显示目录
---
```

## 归档 Archives

Hexo 默认支持。

## 分类 Categories

如果您尚未安装 `hexo-generator-category`，请输入 `npm install hexo-generator-category`。

新建 `categories` 页面，在博客根目录下输入：

```bash
hexo new page categories
```

修改 `source/categories/index.md` 的 `Front Matter`

```yaml {4}
---
title: 分类
date: 2019-11-16 10:46:27
layout: category
---
```

::: tip

> [分类和标签](https://hexo.io/zh-cn/docs/front-matter.html#%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E7%AD%BE)

尽管 Hexo 支持了为一篇文章设置多个分类，但我个人更建议您一篇文章只放在一个分类下，而使用标签来为它进行多个描述。

同时太多的分类与标签，既不方便整理，也不利于移动端的展示。

:::

## 标签 tags

如果您尚未安装 `hexo-generator-tag`，请输入 `npm install hexo-generator-tag`。

新建 `tags` 页面，在博客根目录下输入：

```bash
hexo new page tags
```

修改 `source/tags/index.md` 的 `Front Matter`

```yaml {4}
---
title: 标签
date: 2019-11-16 10:46:27
layout: tag
---
```

## 友链 Links

新建友链页面。

```bash
hexo new page links
```

进入 `source/links/index.md`，设置 `layout` 字段。

```yaml {3}
---
title: 友情链接
layout: links
---
```

在 `_config.async.yml` 中的添加 `links` 配置信息。

提示：（❌）不是在 `banner.links` 添加，（✔）是直接在配置文件添加新的 `links` 属性。

- `name`：站点名称
- `url`：博客链接
- `image`：头像图片链接
- `desc`：一句话描述

```yaml
links:
  - name: 白云苍狗
    url: //www.imalun.com/
    image: //www.imalun.com/images/avatar.jpg
    desc: 醒，亦在人间；梦，亦在人间
```

如果您的友链比较多，可能会导致 `_config.async.yml` 过长，您可以将 links 配置拆分出来。在 Hexo 工作目录下新建 `source/_data/links.yml` 文件，字段和 `_config.async.yml` 中的一致，只是不再需要 `links` 字段。

```yaml
- name: 白云苍狗
  url: //www.imalun.com/
  image: //www.imalun.com/images/avatar.jpg
  desc: 醒，亦在人间；梦，亦在人间
```

也可以是 `source/_data/links.json` 文件

```json
[
	{
		"name": "白云苍狗",
		"url": "//www.imalun.com/",
		"image": "//www.imalun.com/images/avatar.jpg",
		"desc": "醒，亦在人间；梦，亦在人间"
	}
]
```

## 关于 About

新建关于页面。

```bash
hexo new page about
```

进入 `source/about/index.md`，设置 `layout` 字段。

```yaml {3}
---
title: 关于
layout: about
---
```

如果使用内置模板，可以设置 `_config.async.yml` 中的 `about`。

```yaml
about:
  insert: none # 插入规则 before（插入在内容前） | after（插入在内容后） | none（不插入）
  title: # 标题
  introduction: # 个人简单描述
  blog: # 博客信息
  privacy: # 隐私权说明
```

您也可以直接在 `source/about/index.md` 编写您的关于页面， 如果 `about/index.md` 有内容则优先使用自定义内容，否则使用配置项内容。

## 404 Not Found

可以直接在 `source` 目录下新建 `404.md`。

```yaml
---
layout: 404
---
```

在本地，您也可以直接访问 `/404.html` 查看效果。只有当您将其部署到 `GitHub Pages` 上，您访问不存在的页面才会显示。

## 自定义页面 Customize Page

新建自定义页面。像上面 友链、关于等页面也属于自定义页面，主要区别是它们可以通过约定配置，就可以输出主题内置页面样式，当然如果您想要个性化这些页面，也可以通过自定也页面覆盖主题的默认信行为。

```bash
hexo new page xxxxx
```

自定义页面只会保留顶部菜单、背景区域、左侧个人信息（如果不想要个人信息，可以将页面设置为单栏 `single_column: true`）。

```yaml
---
title: 自定义页面
single_column: true
---
```

在自定义页面时，可以直接复制主题中 HTML 代码使用，增加编写自定义页面效率，除了复用默认主题代码，还有其他内置卡片样式可以参考 [自定义页面演示](https://hexo-theme-async.imalun.com/demosite/customize_page/)，以及主题内置的 [Tag Plugins](https://hexo-theme-async.imalun.com/demosite/2022/12/30/tag_plugins/)

### 相册页

相册页面只是普通的页面，您只需要 hexo new page xxxxx 创建您的页面就行

然后使用标签外挂 [gallery](https://hexo-theme-async.imalun.com/demosite/2022/12/30/tag_plugins/)，具体用法请查看对应的内容。

```markdown
<div class="row">
{% gallery '壁纸' '收藏的一些壁纸' '/gallery/wallpaper' https://th.wallhaven.cc/lg/z8/z8dg9y.jpg %}
{% gallery '图库' '收藏的一些壁纸' '/gallery/wallpaper' https://th.wallhaven.cc/lg/rd/rddgwm.jpg %}
</div>
```

<VersionBlock version="1.2.12">
</VersionBlock>

### 相册详情页

相册详情页面也是普通的页面，您只需要 hexo new page xxxxx 创建您的页面就行

然后使用标签外挂 [galleryGroup](https://hexo-theme-async.imalun.com/demosite/2022/12/30/tag_plugins/)，具体用法请查看对应的内容。

```markdown
{% galleryGroup %}
{% galleryItem https://th.wallhaven.cc/orig/85/85oy2j.jpg https://w.wallhaven.cc/full/85/wallhaven-85oy2j.png %}
![](https://w.wallhaven.cc/full/jx/wallhaven-jx3z65.jpg)
{% galleryItem https://th.wallhaven.cc/orig/85/85oylj.jpg https://w.wallhaven.cc/full/85/wallhaven-85oylj.png %}
{% galleryItem https://th.wallhaven.cc/orig/vq/vq9688.jpg https://w.wallhaven.cc/full/vq/wallhaven-vq9688.jpg %}
{% galleryItem https://th.wallhaven.cc/orig/2y/2y8q7m.jpg https://w.wallhaven.cc/full/2y/wallhaven-2y8q7m.png %}
{% galleryItem https://th.wallhaven.cc/orig/85/85oyzj.jpg https://w.wallhaven.cc/full/85/wallhaven-85oyzj.png %}
{% galleryItem https://th.wallhaven.cc/orig/7p/7p2589.jpg https://w.wallhaven.cc/full/7p/wallhaven-7p2589.png %}
{% galleryItem https://th.wallhaven.cc/orig/m3/m39kj1.jpg https://w.wallhaven.cc/full/m3/wallhaven-m39kj1.jpg %}
{% galleryItem https://th.wallhaven.cc/orig/6d/6dorxl.jpg https://w.wallhaven.cc/full/6d/wallhaven-6dorxl.jpg %}
{% galleryItem https://th.wallhaven.cc/orig/o5/o53ro5.jpg https://w.wallhaven.cc/full/o5/wallhaven-o53ro5.jpg %}
{% galleryItem https://th.wallhaven.cc/orig/l8/l831lq.jpg https://w.wallhaven.cc/full/l8/wallhaven-l831lq.jpg %}
{% galleryItem https://th.wallhaven.cc/orig/zy/zy8ewv.jpg https://w.wallhaven.cc/full/zy/wallhaven-zy8ewv.jpg %}
{% galleryItem https://th.wallhaven.cc/orig/3l/3lz1pd.jpg https://w.wallhaven.cc/full/3l/wallhaven-3lz1pd.png %}
{% galleryItem https://th.wallhaven.cc/orig/1p/1pkz5w.jpg https://w.wallhaven.cc/full/1p/wallhaven-1pkz5w.png %}
{% galleryItem https://th.wallhaven.cc/orig/p9/p9kdej.jpg https://w.wallhaven.cc/full/p9/wallhaven-p9kdej.jpg %}
{% galleryItem https://th.wallhaven.cc/orig/x6/x68mrd.jpg https://w.wallhaven.cc/full/x6/wallhaven-x68mrd.jpg %}
{% endgalleryGroup %}
```
