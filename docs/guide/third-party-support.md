# 第三方支持

所有配置默认在 `_config.async.yml` 文件下进行。

与额外依赖库支持的区别，此处主要为使用第三方服务商提供的服务实现。

## 分析统计
默认内置了 百度、谷歌、腾讯三个种。

- `enable`: 是否开启
- `baidu`: 百度统计的Key
- `google`: Google统计的Tracking ID
- `tencent`: 腾讯统计的H5 App id
    - `sid`:
    - `cid`:

``` yaml
webAnalytics:  
  enable: false
  baidu:   
  google:  
  tencent: 
    sid:
    cid:
```
以百度统计为例：
``` yaml
webAnalytics:  
  enable: true
  baidu:  百度统计Key
```

## 评论
::: warning
~~因为主题滚动插件原因，需要监听评论区域 DOM 变动，用来更新插件滚动监听信息，所以导致对兼容三方插件变得比较繁琐~~ (在 v1.1.3 进行修复)。本人使用评论插件有限，所以做了兼容处理比较少。
:::
### bComments
b-comments 是什么 [参考这里](https://github.com/MaLuns/bcommentjs)

- `enable`: 默认关闭
- `env`:腾讯云环境ID 

```yaml
comment:
  bComments:
    enable: true
    env: 腾讯云环境ID
```

### Twikoo

一个简洁、安全、免费的静态网站评论系统，基于[腾讯云开发](https://curl.qcloud.com/KnnJtUom)。

> 后端部署请参见[官方文档](https://twikoo.js.org/)。
> [快速上手](https://twikoo.js.org/quick-start.html)

```yaml
comment:
  twikoo:
    enable: true
    envId: xxxxxxxxxxxxxxx # 腾讯云环境id
    region: # 环境地域，默认为 ap-shanghai，如果您的环境地域不是上海，需传此参数
    option: # 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
```


### Giscus

[Giscus](https://github.com/laymonage/giscus) 是由 GitHub Discussions 提供支持的评论系统。
让访问者通过 GitHub 在您的网站上留下评论和反应！
受到 [utterances](https://utteranc.es/) 的极大启发。

> Giscus （基于 Discussions）相比 utterances（基于 Issue）权限更加细分，且可指定回复。更像一个评论系统。

配置信息字段对应参考 [Giscus Docs](https://giscus.app/zh-CN)

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

### 集成其他评论插件

若果您需要集成一些三方评论插件，您可以通过修改下列 layout 文件进行集成。

::: tip
增加三方评论插件，一般来说只需要按照三方插件添加对应 `js`、`css` 文件，在 `layout/_third-party/comment/` 添加对应初始化代码，处理好主题切换样式就可以了。
:::

以 Twikoo 为例：

第一部分：

您需要`layout/_third-party/comment/twikoo.ejs` 文件，在里面编写评论插件使用的 HTML 相关代码。

``` html 
<div class="trm-card trm-scroll-animation comment-container">
    <div id="tcomment"></div>
</div>
```

第二部分：

添加配置 twikoo CDN 配置

```yaml
assets:
  plugin:
     twikoo: //cdn.jsdelivr.net/npm/twikoo@1.6.7/dist/twikoo.all.min.js
```
在 `layout/_third-party/plugin.ejs` 里，根据配置加载插件。仅在页面开始评论配置加载插件，并在初始化代码块上添加 `data-swup-reload-script` 标识。

`data-swup-reload-script` 表示在 Pjax 里会重新执行当前代码块。

``` js
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

`layout/comment.ejs` 文件为留言页面模板，一般不需要额外修改。

如果您集成了三方评论插件，欢迎您提交 [Pull Request](https://github.com/MaLuns/hexo-theme-async/pulls) ，完善主题健壮性。

### 使用自定义模板添加评论插件

在不修改源码情况下，您也可以通过自定义模板来。关于自定义模板可以参考 [这里](/guide/config.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A8%A1%E6%9D%BF-layout)。

::: tip
在自定义模板情况下，您只需要处理评论的初始化相关情况就可以了，比如评论插件位置和哪些页面显示将根据配置保持一致行为，主题会处理这部分操作。
:::

## 搜索

### 引擎搜索

跳转搜索引擎搜索您的网站内容

可通过 `site:www.imalun.com 想要搜索的内容` 进行搜索

🌰：<https://www.google.com/search?q=site:www.imalun.com%20白云苍狗>

针对搜索引擎配置：
- `href`：搜索引擎地址。
- `domain`：您的域名地址。

设置 `type` 为 `engine`。
```yaml {3}
search:
  enable: true
  type: engine
  href: 'https://www.google.com/search?q=site:'
  # href: "https://www.baidu.com/s?wd=site:"
  # href: "https://www.bing.com/search?q=site:"
  domain: www.imalun.com
```

### 本地搜索

您需要先安装 [hexo-generator-searchdb](https://github.com/next-theme/hexo-generator-searchdb)，并参考配置文档。

```bash
npm install hexo-generator-searchdb
```

针对本地搜索配置：
- `preload`：是否预加载搜索。
- `trigger`：默认回车或点击时触发搜索，设置为 `auto` 时 `input` 触发搜索。

只需要修改 `type` 为 `local`。

```yaml {3}
search:
  enable: true
  type: local
```

## SEO

### 百度自动推送

自动推送#
将其设置为 true，以开启百度自动推送。

> 即每次页面被访问时，将自动向百度提交该页面链接。（有利于百度的 SEO）

``` yaml
baidu_push: true
```