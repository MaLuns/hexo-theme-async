# 第三方支持

所有配置默认在 `_config.async.yml` 文件下进行。

与额外依赖库支持的区别，此处主要为使用第三方服务商提供的服务实现。
## 访问统计
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

- `enable`: 默认关闭
- `bComments`: bComments.js 配置项，b-comments 是什么 [参考这里](https://github.com/MaLuns/bcommentjs)

```yaml
comment:
  enable: false
  bComments:
    v: 0.0.12
    env: 
```
若果您需要集成一些三方评论插件，您可以通过修改下列 layout 文件进行集成。

第一部分：

你需要 修改 `layout/_widget/comment.ejs`（评论插件模板，所有使用评论页面都引用了这个文件） 文件，有关三方评论插件使用的 HTML 相关代码可以在这个文件编写。`layout/comment.ejs` 文件为留言页面模板，一般不需要额外修改。

第二部分：

添加三方评论插件 CDN 文件，您可以[参考这里](/guide/config.html#cdn)。CDN 默认是全量加载的。
如果您希望评论插件是动态加载的，您需要添加配置：
```yaml
assets:
  plugin:
     [插件名称]: 
        css: 你的插件 css
        js: 你的插件 js
```
并在 `layout/_third-party/plugin.ejs` 里，编写您动态加载插件代码。

~~第三部分：~~

~~通过上面步骤发现加载出您的评论插件后，您可能会发现，有评论页面，滚动条出现异常并不能滚动到底。是因为评论区域数据是动态的，滚动插件没更新高度导致的。您可以[参考这里](https://github.com/MaLuns/hexo-theme-async/blob/415eba005dffe1e42b10c7b9c104e901542a9dc7/source/js/main.js)代码的 InitLocomotiveScroll 函数。~~

如果您集成了三方评论插件，欢迎您提交 Pull Request 。


## 搜索

### 引擎搜索

跳转搜索引擎搜索你的网站内容

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