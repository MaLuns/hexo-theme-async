# 主题配置

## 配置文件 async.yml

约定 ＞ 配置

::: danger
请在 `_config.async.yml` 中定义您所需要的配置，其余将自动使用主题的默认配置。

如未特殊说明，皆默认在 `_config.async.yml` 文件中配置。

请最好**不要**对**主题的任何文件**进行修改，除非你确认你拥有一定的开发能力或此后将不会对主题进行升级。
:::

## 语言 Language
本主题内置了中英文两种语言，`zh-Hans` 和 `en`。

> 站点的语言需要自己在 Hexo 目录下的 `_config.yml` 中设置。

```yaml
language: zh-Hans
```

## 主题模式 ThemeMode
`default` 设置主题默认模式
- `style-light`: 亮色模式
- `style-dark`: 暗色模式

`switch` 如果为 false，将不会出现主题切换按钮，只加载设置默认主题模式。
``` yaml
theme: 
  switch: true 
  default: style-light 
```

## 图标 Logo
用于 logo、icon、WPA安装图标配置。

- `logo`: 顶部 logo
- `icon16`: icon 16*16
- `icon32`: icon 32*32
- `appleTouchIcon`: iOS 添加到桌面是图标
- `webmanifest`: 应用程序清单文件
- `visibilitychange`: 是否在离开窗口时切换标题显示
- `hidden`: 离开窗口时显示图标
- `show_text`: 激活窗口时显示文字
- `hide_text`: 离开窗口显示文字

``` yaml
favicon:
  logo: favicon-32x32.png
  icon16: favicon-16x16.png 
  icon32: favicon-32x32.png
  appleTouchIcon: apple-touch-icon.png
  webmanifest: /site.webmanifest
  visibilitychange: true
  hidden: failure.ico
  show_text: (/≧▽≦/)咦！又好了！
  hide_text: (●—●)喔哟，崩溃啦！
```

## 用户信息 User

用户基本信息，用于博主名称、头像、友链交换规则、站点运行计时等等。
 
- `name`: 昵称，用于侧栏或其他区域标识
- `first_name`: 名，用于顶部将姓和名分别显示
- `last_name`: 姓，
- `email`: 邮箱
- `domain`: 域名
- `avatar`: 头像
- `describe`: 网站简介
- `ruleText`: 友链交换规则
- `birthDay`: 博客计时开始时间
- `copyrightYear`: 版权日期

``` yaml
user:
  name: 白云苍狗
  first_name: 苍狗
  last_name: 白云
  email: admin@imalun.com
  domain: https://www.imalun.com
  avatar: /img/avatar.jpg
  describe: 网站简介。
  ruleText: 暂不接受个人博客以外的友链申请，确保您的网站内容积极向上，文章至少30篇，原创70%以上，部署HTTPS。
  birthDay: 04/10/2022 17:00:00 
  copyrightYear: 2022
```

## 导航栏 TopBars

顶部导航的 logo 在 [favicon](#favicon) 中配置，主题切换按钮在 [主题模式](#主题模式) 中配置

- `title`: 标题
- `url`: 路径
- `noswup`: 不使用局部刷新
- `target`: 打开链接方式，和 a 标签一致
- `children`: 二级菜单 
``` yaml
top_bars:
  - title: home
    url: /
    children:
      - title: archives2
        url: /archives2/
  - title: archives
    url: /archives/
    noswup: true
```

## 侧栏 Sidebar

### 社交图标
以内置 Font-Awesome Brand 图标，也可以使用 iconfont。

- `icon`: 图标 Class
- `url`: 链接

``` yaml
sidebar:
  social:  # 社交地址
    - icon: fab fa-github   
      url: https://github.com 
    - icon: iconfont cg-gitee
      url: https://gitee.com
```

### 打字动画
- `typedTextPrefix`: 为固定前缀
- `typedText`: 为打字效果切换条目，可设置多条，按顺序切换。
``` yaml
sidebar:
  typedTextPrefix: I`m
  typedText: [ 'Web Developer' ]
```

### 侧栏信息
侧栏信息是一个数组，里面元素 key-val 形式的。

``` yaml
sidebar:
  info: # 个人信息 
    - key: 地址 
      val: 火星       
    - key: 年龄
      val: 18 
```

## 横幅 Banner
每个页面横幅都可以自定义不同背景图、标语等

- `default`: 默认配置
    - `type`: 横幅类型 img、slideshow、video
    - `bgurl`: 背景图地址，如果 type 是 slideshow，需要为数组
    - `bannerTitle`: 横幅上标题
    - `bannerText`: 横幅描述
- `index`: 首页 (属性字段和上面保持一致)
    - `videoUrl`: 视频地址
- `archive`: 分类页
- `links`: 友链页
- `comment`: 评论页
- `about`: 关于

``` yaml
banner:
  index:
    type: img
    bgurl: https://pic1.zhimg.com/v2-b3c2c6745b9421a13a3c4706b19223b3_r.jpg?source=1940ef5c
    bannerTitle: 树深时见鹿，<br>溪午不闻钟。
    bannerText: Hi my new friend!
    videoUrl: 
```

## 渐进式应用 PWA

开始 PWA 只需要设置 sw 为 true 即可，本主题已添加 Server Worker 相关操作 。

``` yaml
sw: true
```
::: warning
使用 PWA 要求
- 站点必须为 HTTPS。
- 添加一个清单文件（manifest),
:::

清单文件 结构
``` json
{
    "name": "白云苍狗",
    "short_name": "白云苍狗",
    "description": "描述",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        // ...
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#fff",
    "background_color": "#fff",
    "display": "standalone",
    "start_url": "/"
}
```