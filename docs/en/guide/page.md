# Theme page

The following page types are supported and used by default for this theme.

## Article

- `keywords`: keyword used for meta tags
- `description`: Description for meta tags
- `cover`: Article cover, which can be a string or array. If the array length is 2, it will automatically switch according to the theme.
- `sticky`: home page sorting value
- `banner`: Article page banner background, field reference [banner.default](/guide/config.html#横幅-banner) Field.
- `toc`: Specifies whether to display directories. This parameter takes effect only when the value is false. Pass by default `_config.async.yaml` 的 `toc` Control.
- `single_column`: Displays details in one column. This parameter takes effect when it is true.
- `author`: Set the author will show
- `originalLink`: Article source link

The built-in top script has been removed. Upgrade the `hexo-generator-index` to version `2.0.0+` or higher.

```yaml
---
title: Build a background template from scratch
keywords: admin-template
cover: [https://www.logosc.cn/uploads/resources/2018/11/29/1543459457_thumb.jpg]
sticky: 10
banner:
  type: img
  bgurl: https://pic1.zhimg.com/v2-b3c2c6745b9421a13a3c4706b19223b3_r.jpg
  bannerText: Hi my new friend!
toc: false # No need to display directories
---
```

## Archives

Hexo support by default.

## Categories

If you have not installed `hexo-generator-category`, please enter `npm install hexo-generator-category` in the terminal.

Create a new `categories` page, and enter the following in the root directory of the blog:

```bash
hexo new page categories
```

Modify `Front Matter` of `source/categories/index.md`

```yaml {4}
---
title: Category
date: 2019-11-16 10:46:27
layout: category
---
```

::: tip

> [Categories & Tags](https://hexo.io/zh-cn/docs/front-matter.html#%E5%88%86%E7%B1%BB%E5%92%8C%E6%A0%87%E7%AD%BE)

Although Hexo supports multiple categories for an article, I personally recommend you to put an article under one category only and use tags for multiple descriptions for it.

Also, too many categories and tags are not easy to organize and not good for mobile display.

:::

## Tags

If you have not installed `hexo-generator-tag`, please enter `npm install hexo-generator-tag` in the terminal.

Create a new `tags` page, and enter the following in the root directory of the blog:

```bash
hexo new page tags
```

Modify `Front Matter` of `source/tags/index.md`

```yaml {4}
---
title: tag
date: 2019-11-16 10:46:27
layout: tag
---
```

## Friend links

New Friends Link Page.

```bash
hexo new page links
```

Go to `source/links/index.md` and set the `layout` field.

```yaml {3}
---
title: My friends
layout: links
---
```

Add `links` configuration information in `_config.async.yml`.

- `name`: their name
- `url`: blog link
- `image`: avatar image link
- `desc`: one-sentence description

```yaml
links:
  - name: 白云苍狗
    url: //www.imalun.com/
    image: //www.imalun.com/images/avatar.jpg
    desc: 醒，亦在人间；梦，亦在人间
```

If you have too many friend links, the `_config.async.yml` may be too long. You can split the links configuration. Create a new `source/_data/links.yml` file in the Hexo working directory with the same fields as in `_config.async.yml` except that the `links` field is no longer required.

```yaml
- name: 白云苍狗
  url: //www.imalun.com/
  image: //www.imalun.com/images/avatar.jpg
  desc: 醒，亦在人间；梦，亦在人间
```

It can also be a `source/_data/links.json` file

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

## About

Create a new About page.

```bash
hexo new page about
```

Go to `source/about/index.md` and set the `layout` field.

```yaml {3}
---
title: about
layout: about
---
```

If using a built-in template, you can set `about` in `_config.async.yml`.

```yaml
about:
  title: # Title
  introduction: # Personal brief description
  blog: # Blog message
  privacy: # Privacy Note
```

You can also write your about page directly in `source/about/index.md`, using custom content if `about/index.md` has content, and configuration items if not.

## 404 Not Found

You can create `404.md` directly in the `source` directory.

```yaml
---
layout: 404
---
```

Locally, you can also go directly to `/404.html` to see the effect. Only when you deploy it to `GitHub Pages` will pages you visit that don't exist show up.

## Customize Page

Create a custom page. The main difference is that they can be configured by convention to output the built-in page style of the theme. Of course, if you want to personalize these pages, you can also override the default line of the theme through custom pages.

```bash
hexo new page xxxxx
```

The custom page only keeps the top menu, the background area, and the left profile (if you don't want the profile, you can set the page to single_column: true).

```yaml
---
title: Custom page
single_column: true
---
```

When customizing pages, you can directly copy the HTML code in the theme for use, increasing the efficiency of writing [custom pages](https://hexo-theme-async.imalun.com/demosite/customize_page/). In addition to reusing the default theme code, there are other built-in card styles that can refer to the custom page demo, as well as the theme built-in [Tag Plugins](https://hexo-theme-async.imalun.com/demosite/2022/12/30/tag_plugins/)

### Album page

Album pages are just regular pages, you just need `hexo new page xxxxx` to create your page

Then use the tag [gallery](https://hexo-theme-async.imalun.com/demosite/2022/12/30/tag_plugins/), see the corresponding content for the specific usage.

```markdown
<div class="row">
{% gallery 'wallpaper' 'collection of some wallpaper' '/gallery/wallpaper' https://th.wallhaven.cc/lg/z8/z8dg9y.jpg %}
{% gallery 'gallery' 'collection of some wallpape' '/gallery/wallpaper' https://th.wallhaven.cc/lg/rd/rddgwm.jpg %}
</div>
```

<VersionBlock version="1.2.12">
</VersionBlock>

### Album details page

The album details page is also a normal page, you just need `hexo new page xxxxx` to create your page

Then use the tag external [galleryGroup](https://hexo-theme-async.imalun.com/demosite/2022/12/30/tag_plugins/), please see the corresponding content for specific usage.

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
