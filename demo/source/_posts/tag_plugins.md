---
title: Tag Plugins
date: 2022-12-30 15:08:29
categories: Plugins
---
主题内置的一些标签插件说明和示例。

<!--more-->

## Imgs 照片

用于适配黑白两种主题时显示图片，切换主题样式查看效果。

``` yaml
{% imgs [class names] [src1] [src2] [width] [height] [alt text'title text] %}

[src1]          : 亮色主题时显示图片路径
[src2]          : 暗色主题时显示图片路径
[width]         : 宽
[height]        : 高
[alt text]      : alt 属性
[title text]    : title 属性

```

使用方式

``` markdown
{% imgs trm-cover /img/1.jpg /img/2.jpg  alt text %}

等效于

<img class="trm-cover trm-light-icon" src="/img/1.jpg" alt="alt text">
<img class="trm-cover trm-dark-icon" src="/img/2.jpg" alt="alt text">

```

{% imgs trm-cover /img/1.jpg /img/2.jpg  alt text %}


## Tabs 标签选项卡

从next主题移植

使用方法

``` yaml
{% tabs Unique name, [index] %}
<!-- tab [Tab caption]-->
任何内容(也支持内联标签)。
<!-- endtab -->
{% endtabs %}

Unique name   : 标签块标签的唯一名称，不带逗号。
                如果名称中有空格，对于生成 id，所有空格将被破折号取代
[index]       : tabs 默认选项卡的下标。
                如果未指定，将选择第一个选项卡。
                如果索引为 -1，则不会选择任何选项卡。
                (可选参数)

[Tab caption] : 当前标签的标题。
                如果没有指定标题，带有标签索引后缀的唯一名称将被用作标签标题。
                (可选参数)

```

### 默认使用方式

``` markdown
{% tabs test1 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}
```

{% tabs test1 %}
<!-- tab 标签1 -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab 标签2 -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}

### 预设选择tabs

``` markdown
{% tabs test2, 3 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}
```

{% tabs test2, 3 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}

### 沒有预设tabs

``` markdown
{% tabs test3, -1 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}
```

{% tabs test3, -1 %}
<!-- tab -->
**This is Tab 1.**
<!-- endtab -->

<!-- tab -->
**This is Tab 2.**
<!-- endtab -->

<!-- tab -->
**This is Tab 3.**
<!-- endtab -->
{% endtabs %}

## Gallery 相册

一个相册集合。

``` yaml
<div class="row">
{% galleryGroup name description link img-url [col] %}
{% galleryGroup name description link img-url [col] %}
{% galleryGroup name description link img-url [col] %}
</div>

name            : 相册名字
description     : 相册描述
link            : 连接到对应相册的地址
img-url         : 图库封面的地址
[col]           : 相册列宽 1-12 ，默认为 6
```

示例：

``` markdown
<div class="row">
{% gallery '壁纸' '收藏的一些壁纸' '/gallery/wallpaper' https://th.wallhaven.cc/lg/z8/z8dg9y.jpg %}
{% gallery '图库' '收藏的一些壁纸' '/gallery/wallpaper' https://th.wallhaven.cc/lg/rd/rddgwm.jpg %}
</div>
```

<div class="row">
{% gallery '壁纸' '收藏的一些壁纸' '/gallery/wallpaper' https://th.wallhaven.cc/lg/z8/z8dg9y.jpg 6 60 %}
{% gallery '图库' '收藏的一些壁纸' '/gallery/wallpaper' https://th.wallhaven.cc/lg/rd/rddgwm.jpg 6 60 %}
</div>

<h3 id="相册详情"><a href="#相册详情" class="headerlink" title="相册详情"></a>相册详情</h3>
<p>相册详情，会根据图片自动排版。</p>

``` yaml
{% galleryGroup %}
{% galleryItem url1 [url2] %}
markdown 图片格式
{% endgalleryGroup %}

有两种编写方式可以直接写 markdown 格式图片，也可以使用 galleryItem 标签插件。

galleryItem
url1        : 图片略缩图地址
[url2]      : 图片原图地址，可选
```

示例：

``` markdown
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

## Caniuse 查看兼容性

``` yaml
{% caniuse feature @ [periods] %}

feature     : 在https://caniuse.com上搜索您想要的特性，然后单击搜索结果标题左侧的#，您将得到该特性的唯一名称。
[periods]   : 可选参数。选择要显示的浏览器版本。支持值:，，，，，，，，。如果该值为空，将使用默认值 past_1past_2past_3past_4past_5currentfuture_3future_2future_1current
```

示例：

``` markdown
{% caniuse fetch %}
```

{% caniuse fetch %}

## Flink 链接列表

可在任何界面插入类似友情链接列表效果

内容格式与友情链接界面一样，支持 yml 格式

```yaml
{% flink [key] [col] %}
[content]
{% endflink %}

[content]   : 可选参数。链接数据，格式为 yaml。
[key]       : 可选参数。Hexo 数据文件的 key，如果 content 为空，则会加载指定 key 数据。[content] 和 [key] 需要二选一。
[col]       : 可选参数。链接列宽 1-12 ，默认为 6
```

示例

```
{% flink 12 %}
- name: Hexo
  url: //hexo.io/
  image: //d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg
  desc: 快速、简洁且高效的博客框架
- name: 白云苍狗
  url: //www.imalun.com/
  image: //www.imalun.com/images/avatar.jpg
  desc: 醒，亦在人间；梦，亦在人间
{% endflink %}
```

{% flink 12 %}
- name: Hexo
  url: //hexo.io/
  image: //d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg
  desc: 快速、简洁且高效的博客框架
- name: 白云苍狗
  url: //www.imalun.com/
  image: //www.imalun.com/images/avatar12312.jpg
  desc: 醒，亦在人间；梦，亦在人间
{% endflink %}

或者使用 Hexo 数据文件

```
{% flink links 12 %}
{% endflink %}
```

{% flink links 12 %}
{% endflink %}


## Note 便签

快速插入便签。

``` yaml
{% note [type] [title] %}
文字或者 `markdown` 均可
{% endnote %} 

[type]				: 可选参数。便签类型 info, tip, warning, danger, details
[title]				: 可选参数。标题。
```

示例

``` markdown
{% note info %}
This is an info box.
{% endnote %}

{% note tip %}
This is a tip.
{% endnote %}

{% note warning %}
This is a warning.
{% endnote %}

{% note danger %}
This is a dangerous warning.
{% endnote %}

{% note details %}
This is a details block.
{% endnote %}
```

{% note info %}
This is an info box.
{% endnote %}

{% note tip %}
This is a tip.
{% endnote %}

{% note warning %}
This is a warning.
{% endnote %}

{% note danger %}
This is a dangerous warning.
{% endnote %}

{% note details %}
This is a details block.
{% endnote %}