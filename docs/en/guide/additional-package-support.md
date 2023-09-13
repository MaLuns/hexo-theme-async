# Additional dependency library support

Unlike third-party support, most of the functionality here is to install plug-ins or introduce CDN implementations, easily adapted by themes.

## Word Count

Install [hexo-wordcount](https://github.com/willin/hexo-wordcount)

```bash
npm install hexo-wordcount
# or
yarn add hexo-wordcount
```

In the configuration file `_config.async.yml`:

-   `count`: Word count
-   `time`: Reading time

```yaml
wordcount:
    enable: true
    count: true
    time: true
```

## RSS

Install [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)。

```bash
npm install hexo-generator-feed
# or
yarn add hexo-generator-feed
```

It can be configured in the `social` field of `_config.async.yml`, for example:

```yaml
sidebar:
    social:
        - icon: fas fa-rss
          url: atom.xml
```

See the official documentation for more [configuration](https://github.com/hexojs/hexo-generator-feed) (in `_config.yml` in the Hexo working directory).

## Sticky

> Make sure your [hexo-generator-index](https://github.com/hexojs/hexo-generator-index) is 2.0.0 or above

The `sticky` property in `Front Matter` is set to the top. If the value is >0, the higher it is, the higher it will be; if the value is <0, the lower it will be.

```yaml {3}
---
title: xxx
sticky: 100
---
```

## Math Formula

### KaTeX

Show some simple mathematical formulas in the article, implemented using KaTeX. For details, see [documents](https://katex.org/).

> It mainly adopts the way of CDN.

-   `copy_tex`: Copy KaTeX text, enabled by default
-   `global`: If you want to use it in the global page `KaTeX`, (such as an article summary on the home page), then you can open it. (Of course, this also means that your page has to load more resources each time.)
-   `options`: Options passed to the KaTeX renderer. Specific option reference [here](https://katex.org/docs/options.html).

```yaml
katex:
    copy_tex: true
    global: false
    options: {}
```

katex's library will only load if the article or page uses KaTeX, so you need to set it up if the article or header uses KaTeX. (When you enable global loading, you no longer need to set this option.)

```yaml {3}
---
title: xxx
katex: true
---
```

Head of `katex` type can be a `bool | object`, if is `object`, the only `options` options have the effect, specific parameters and global Settings, and will be a merger with global Settings and replacement.

You can wrap the formula as follows.

In the following package, the formula will be displayed centered.

```latex
$$ E = mc^2 $$
\[ E = mc^2 \]
```

In the following package, the formula will be displayed in inline form.

```latex
$E = mc^2$
\( E = mc^2 \)
```

::: tip
注意，在 Markdown 文件中直接书写时，您需要多一个 `\` 来转译 `\`。（或者使用 `$E=mc^2$` 的方式）

使用 `\\[ E = mc^2 \\]` 而不是 `\[ E = mc^2 \]`。

Note that you need an extra `\` to translate `\` when writing directly in Markdown files. (Or use `$E=mc^2$`)

Use `\\[E = mc^2 \]` instead of `\[E = mc^2 \]`.

If you have too many characters that need to be translated, you can simply wrap it in HTML tags (internal characters will not be parsed as Markdown) instead of using multiple `\` to translate.

For example:

```html
<div>\[ E = mc^2 \]</div>
```
