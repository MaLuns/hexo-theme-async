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

## 评论
::: warning
因为主题滚动插件原因，需要监听评论区域 DOM 变动，用来更新插件滚动监听信息，所以导致对兼容三方插件变得比较繁琐。本人使用评论插件有限，所以做了兼容处理比较少。
:::

- `enable`: 默认关闭
- `bComments`: bComments.js 配置项

```yaml
comment:
  enable: false
  bComments:
    v: 0.0.12
    env: 
```
