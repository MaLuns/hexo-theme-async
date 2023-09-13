# Third-party support

All configuration is done by default in the `_config.async.yml` file.

The difference from the additional packagfe support, here is mainly to use the service implementation provided by third-party service providers.

## Analysis Statistics

The default built-in Baidu, Google, Tencent three.

-   `enable`: whether to enable
-   `baidu`: Key of Baidu statistics
-   `google`: Indicates the Tracking ID of Google statistics
-   `tencent`:H5 App id collected by Tencent
    -   `sid`:
    -   `cid`:

```yaml
webAnalytics:
    enable: false
    baidu:
    google:
    tencent:
        sid:
        cid:
```

Take Baidu Statistics as an example:

```yaml
webAnalytics:
    enable: true
    baidu: Baidu statistics Key
```

## Comment

::: warning
~~Due to the theme scrolling plug-in, the DOM changes in the comment area need to be monitored to update the scrolling listening information of the plug-in, so the compatible three-party plug-in becomes tedious~~ (fixed in v1.1.3). I use comment plug-in limited, so do compatibility processing is relatively little.
:::

### bComments

What are b-comments references [here](https://github.com/MaLuns/bcommentjs)

-   `enable`: Disabled by default
-   `env`:Tencent cloud environment ID

```yaml
comment:
    bComments:
        enable: true
        env: Tencent cloud environment ID
```

### Twikoo

A simple, safe, free static website review system, based on [Tencent cloud development](https://curl.qcloud.com/KnnJtUom).

> 后端部署请参见[官方文档](https://twikoo.js.org/)。
> [快速上手](https://twikoo.js.org/quick-start.html)

```yaml
comment:
    twikoo:
        enable: true
        envId: xxxxxxxxxxxxxxx # Tencent Cloud environment id
        region: # Environment region, the default is ap-shanghai. If your environment region is not shanghai, this parameter is required
        option: # A custom js path for different articles. If your article path is not location.pathname, pass this parameter
```

### Giscus

[Giscus](https://github.com/laymonage/giscus) is a commenting system supported by GitHub Discussions. Let visitors leave comments and reactions on your site via GitHub! Greatly inspired by [utterances](https://utteranc.es/).

> Giscus (Discussions) are more detailed than utterances (issue-based), and responses can be specified. More like a comment system.

Refer to [Giscus Docs](https://giscus.app/zh-CN) for the configuration information fields

```yaml
comment:
    giscus:
        enable: false
        repo:
        repo-id:
        category:
        category-id:
        mapping: pathname
        reactions-enabled: 1
        emit-metadata: 0
        lang: zh-CN
        theme:
            light: light
            dark: dark
```

### Integrate other commenting plug-ins

If you need to integrate some three-party comment plug-ins, you can do so by modifying the following layout file.

::: tip
Generally speaking, you only need to add corresponding `js` and `css` files according to the three-party comment plug-in, add corresponding initialization code in `layout/_third-party/comment/`, and handle the theme switching style well.
:::

Take Twikoo for example:

Part I:

You'll need a `layout/_third-party/comment/twikoo.ejs` file where you'll write the HTML-related code used by the comment plug-in.

```html
<div class="trm-card trm-scroll-animation comment-container">
	<div id="tcomment"></div>
</div>
```

Part Two:

Add Config twikoo CDN Config

```yaml
assets:
    plugin:
        twikoo: //cdn.jsdelivr.net/npm/twikoo@1.6.7/dist/twikoo.all.min.js
```

In `layout/_third-party/plugin.ejs`, load the plug-in according to the configuration. Comment on the configuration load plug-in only at the beginning of the page and add the `data-swup-reload-script` identifier to the initialization block.

`data-swup-reload-script` indicates that the current code block will be reexecuted in Pjax.

```js
<% if(page.comments) { %>
  <% let comment = theme.comment%>
  <% if(comment.twikoo.enable) { %>
      <%- js({src:theme.assets.plugin.twikoo,'data-swup-reload-script': true}) %>
      <script data-swup-reload-script>
          const twikooConfig = <%- JSON.stringify(theme.comment.twikoo) %>;
          twikooConfig.el = '#tcomment';
          twikoo.init(twikooConfig);
      </script>
  <% } %>
<% } %>
```

The `layout/comment.ejs` file is a template for the comment page and does not need to be modified.

If you integrate a three-party comment plug-in, you are welcome to submit a [Pull Request](https://github.com/MaLuns/hexo-theme-async/pulls) to improve topic robustness.

### Add comment plug-ins using custom templates

You can also customize the template without modifying the source code. See [here](/guide/config.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A8%A1%E6%9D%BF-layout)。 for custom templates.

::: tip
In the case of custom templates, you only need to handle the initialization of comments, such as the comment plug-in location and which page displays will behave consistently according to the configuration, which is handled by the theme.
:::

## Search

### Engine search

Jump to search engines to search your site content
You can search for the content you want to search at `site:www.imalun.com`

🌰：<https://www.google.com/search?q=site:www.imalun.com%20白云苍狗>

For search engine configuration:

-   `href`: search engine address.
-   `domain`: Your domain name address.

Set `type` to `engine`。

```yaml {3}
search:
    enable: true
    type: engine
    href: "https://www.google.com/search?q=site:"
    # href: "https://www.baidu.com/s?wd=site:"
    # href: "https://www.bing.com/search?q=site:"
    domain: www.imalun.com
```

### Local search

You need to install the [hexo-generator-searchdb](https://github.com/next-theme/hexo-generator-searchdb) first and refer to the configuration documentation.

```bash
npm install hexo-generator-searchdb
```

For local search configuration:

-   `preload`: Whether to preload the search.
-   `trigger`：By default, search is triggered when enter or click. Set `auto` to `input` to trigger search.

You only need to change `type` to `local`。

```yaml {3}
search:
    enable: true
    type: local
```

## SEO

### Baidu automatic push

Set this to true to enable Baidu Auto Push.

> That is, every time the page is visited, it will automatically submit the page link to Baidu. (Beneficial to Baidu's SEO)

```yaml
baidu_push: true
```
