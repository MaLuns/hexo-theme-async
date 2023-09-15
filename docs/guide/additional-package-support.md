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

> 确保您的 [hexo-generator-index](https://github.com/hexojs/hexo-generator-index) 为 `2.0.0` 或以上

通过设置文章 Front Matter 中 `sticky` 属性以进行置顶，数值 >0 时越高，越靠前，数值 <0 时，越靠后。

```yaml {3}
---
title: xxx
sticky: 100
---
```

## 数学公式

### KaTeX

在文章中显示一些简单的数学公式，使用 KaTeX 实现。具体方法请参见[官方文档](https://katex.org/)。

> 其主要采用 CDN 的方式实现。

- `copy_tex`: 复制 KaTeX 文本，默认开启
- `global`: 如果您想要在全局页面使用 `KaTeX`，（譬如首页的文章摘要），那么您可以开启它。（当然，这也意味着您的页面每次需要加载更多的资源。）
- `options`: 传入 KaTeX 渲染器的选项。具体选项参考[这里](https://katex.org/docs/options.html)。

```yaml
katex:
  copy_tex: true
  global: false
  options: {}
```

只有在使用了 `katex` 的文章或页面才会加载 KaTeX 的库，所以您需要在使用 KaTeX 的文章或头部进行设置。
（当您开启全局加载时，将不再需要设置此选项。）

```yaml {3}
---
title: xxx
katex: true
---
```

头部中的 `katex` 类型可以是 `bool | object`，如果是 `object`，那只有 `options` 选项有效果，具体参数与全局设置一样，并且会与全局设置合并与替换。

您可以使用如下方式包裹公式。

如下包裹，公式将被居中展示。

```latex
$$ E = mc^2 $$
\[ E = mc^2 \]
```

如下包裹，公式将以行内形式展示。

```latex
$E = mc^2$
\( E = mc^2 \)
```

::: tip
注意，在 Markdown 文件中直接书写时，您需要多一个 `\` 来转译 `\`。（或者使用 `$E=mc^2$` 的方式）

使用 `\\[ E = mc^2 \\]` 而不是 `\[ E = mc^2 \]`。

如果您有过多需要转译的字符，您可以直接使用 HTML 标签包裹它（内部的字符将不会被作为 Markdown 解析），而无需使用多个 `\` 来转译。

譬如：

```html
<div>\[ E = mc^2 \]</div>
```
:::

## live2d
安装 [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

``` bash
npm install hexo-helper-live2d
# or
yarn add hexo-helper-live2d
```

在 Hexo 根目录的 `_config.yml` 中进行配置：

> 更多选项含义请参见 [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)

``` yaml
live2d:
  enable: true
  # 推荐使用 CDN 来加载
  scriptFrom: unpkg
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  debug: false
  model:
    # 推荐使用 CDN 来加载模型
    use: https://unpkg.com/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json
  display:
    position: left
    width: 150
    height: 300
  mobile:
    show: true
  react:
    opacity: 0.7
```

## pjax

使用 [swup](https://swup.js.org/getting-started/) 实现，默认为关闭的。

``` yaml
swup: true
```