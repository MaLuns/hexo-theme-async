# 主题配置

## 配置文件 async.yml

约定 ＞ 配置

::: danger
请在 `_config.async.yml` 中定义您所需要的配置，其余将自动使用主题的默认配置。

如未特殊说明，皆默认在 `_config.async.yml` 文件中配置。

请最好**不要**对**主题的任何文件**进行修改，除非您确认您拥有一定的开发能力或此后将不会对主题进行升级。
:::

## 语言 Language

本主题内置了中英文两种语言，`zh-Hans` 和 `en`。

> 站点的语言需要自己在 Hexo 目录下的 `_config.yml` 中设置。

```yaml
language: zh-Hans
```

### 个性化语言包

在 Hexo 工作目录下新建 `source/_data/languages.yml`。（若 `source/_data` 目录不存在，请新建。）

采用约定大于配置的方式，您仅需在 `languages.yml` 中自定义您想要覆盖的语言，其余将自动与主题默认配置合并。（这样做也更方便日后的升级）

配置方式参考下例：

> 各语言对应属性和内容见 [languages | hexo-theme-async](https://github.com/MaLuns/hexo-theme-async/blob/master/packages/hexo-theme-async/languages/)，覆盖对应项即可。

::: details 内置语言包结构示例

```yaml-vue
{{zhHans}}
```

:::

```yaml
# 将要覆盖的语言
en:
  site:
    title: Site Information

zh-Hans:
  site:
    title: 本站信息
# 您也可以扩展其他语言
```

如果仅使用中文语言，除 `zh-Hans` 项均可删除。

## 主题模式 ThemeMode

- `default`：设置主题默认模式
  - `style-light`：亮色模式
  - `style-dark`：暗色模式
  - `auto`：跟随系统选择
- `switch`：如果为 false，将不会出现主题切换按钮，只加载设置默认主题模式。

::: code-group

```yaml{3} [修改示例]
theme:
  switch: true
  default: style-dark
```

```yaml-vue [主题默认配置]
{{ getConfig('theme') }}
```

:::

## 网站图标 Favicon

用于 logo、icon、PWA 安装图标配置。

- `logo`：顶部 logo
- `dark_logo`：顶部 logo，暗黑模式时显示
- `icon16`：icon 16\*16
- `icon32`：icon 32\*32
- `appleTouchIcon`：iOS 添加到桌面时显示图标
- `webmanifest`：应用程序清单文件
- `visibilitychange`：是否在离开窗口时切换标题显示
- `hidden`：离开窗口时显示图标
- `showText`：激活窗口时显示文字
- `hideText`：离开窗口显示文字

::: code-group

```yaml [修改示例]
favicon:
  logo: favicon-32x32.png
  icon16: favicon-16x16.png
  icon32: favicon-32x32.png
  appleTouchIcon: apple-touch-icon.png
  webmanifest: /site.webmanifest
  visibilitychange: true
  hidden: failure.ico
  showText: (/≧▽≦/)咦！又好了！
  hideText: (●—●)喔哟，崩溃啦！
```

```yaml-vue [主题默认配置]
{{ getConfig('favicon') }}
```

:::

## 插件 Plugins

主题内置插件配置。

- `internal_provider`：主题 JS 的 CDN 配置，可选 `local`、`unpkg`、`jsdelivr`
  - `local`: 不使用 CDN
  - `unpkg`: 使用 unpkg
  - `jsdelivr`: 使用 jsdelivr
- `third_party_provider`：三方插件 JS 的 CDN 配置，可选 `unpkg`、`jsdelivr`

::: code-group

```yaml{2} [修改示例]
assets:
  internal_provider: unpkg # local | unpkg | jsdelivr
  third_party_provider: unpkg # unpkg | jsdelivr
```

```yaml-vue [主题默认配置]
{{ getConfig('assets') }}
```

:::

除了使用 unpkg、jsdelivr 外，也可以自定义其他 CDN 源。

```yaml{2}
assets:
  third_party_provider: https://npm.elemecdn.com
```

也可以单独给某个插件配置 CDN 源。

```yaml{5}
assets:
  internal_provider: local
  third_party_provider: unpkg
  plugin:
    swup: https://npm.elemecdn.com/swup@2.0.19/dist/swup.min.js
```

如果您想将主题使用三方插件下载到本地，可以执行 `hexo plugin` 命令下载到本地（需要主题版本 2.0.4+）。插件默认下载到 `source/plugins` 目录，需要将配置指向对应目录：

```yaml{2}
assets:
  third_party_provider: plugins # 指向 plugins 目录
```

::: details 主题使用三方插件列表

```yaml-vue
{{plugins}}
```

:::

## 加速静态资源 CDN

Content Delivery Network，统一加载网络资源，有利于提高网页加载速度。

当您需要添加三方插件来个性您的博客时，您应该优先使用 CDN 加载文件。

JavaScript 资源类型说明：

- `head`: 插入到 head，其他三种默认时插入到 body 结尾的。
- `base`: 立即加载并执行。
- `async`: 异步加载，加载完成后立即执行。
- `defer`: 异步加载资源，但最后执行。

::: code-group

```yaml{5} [修改示例]
cdn:
  css:
  js:
    head:
    base: [demo.js]
    async:
    defer:
```

```yaml-vue [主题默认配置]
{{ getConfig('cdn') }}
```

:::

## 字体图标 Icon

本主题默认使用 Font Awesome 5 图标。

> 默认支持的图标列表见 [默认图标](/about/icon.html)

如您想要使用其他图标，只需要在 `assets.icons` 中配置您的图标。

- `type`：图标类型 `font` `symbol`
- `css`： font-class 图标资源 url （有值或为空时，将覆盖或去除内置 Font Awesome 5 图标）
- `js`：多色图标资源 url

```yaml
assets:
  icons:
    type: font # font symbol
    css:
    js:
```

### [iconfont](https://www.iconfont.cn/)

阿里旗下，可定制自己所需图标集。国内速度良好。（推荐） [使用说明](https://www.iconfont.cn/help/detail?helptype=code)

```yaml {5}
assets:
  icons:
    type: font
    # 这里是您从 iconfont 处获得的图标链接。
    css: //at.alicdn.com/t/font_383361_cfn4m13f4v.css
    js:
```

多色图标使用方式：

```yaml {3,5}
assets:
  icons:
    type: symbol
    css:
    js: //at.alicdn.com/t/font_383361_cfn4m13f4v.js
```

::: warning
当您覆盖内置图标资源时，因为博客 UI 中一些固定的图标使用到了，所以您需要将 [固定图标](#自定义图标-icon) 进行修改。

单色图标 和 多色图标是可以同时使用的，但是博客 UI 的**固定图标**只能根据 `type` 决定使用哪一种。
:::

## 用户信息 User

用户基本信息，用于博主名称、头像、友链交换规则、站点运行计时等等。

- `name`：昵称，用于侧栏或其他区域标识
- `first_name`：名，用于顶部将姓和名分别显示
- `last_name`：姓，
- `email`：邮箱
- `domain`：域名
- `avatar`：头像
- `dark_avatar`：头像，黑暗主题时显示
- `describe`：网站简介
- `ruleText`：友链交换规则
- ~~`birthDay`：博客计时开始时间 v1.1.7 弃用~~
- ~~`copyrightYear`：版权日期 v1.1.7 弃用~~

::: code-group

```yaml [修改示例]
user:
  name: 白云苍狗
  first_name: 苍狗
  last_name: 白云
  email: admin@imalun.com
  domain: https://www.imalun.com
  avatar: /img/avatar.jpg
  describe: 网站简介。
  ruleText: 暂不接受个人博客以外的友链申请，确保您的网站内容积极向上，文章至少30篇，原创70%以上，部署HTTPS。
```

```yaml-vue [主题默认配置]
{{ getConfig('user') }}
```

:::

## 导航栏 TopBars

顶部导航的 logo 在 [favicon](#favicon) 中配置，主题切换按钮在 [主题模式](#主题模式) 中配置。

- `title`：标题
- `url`：路径，如果设置了二级菜单后，不需要已经一级菜单触发跳转可将其设置为 `'#'`
- `noswup`：不使用局部刷新
- `target`：打开链接方式，和 a 标签属性一致
- `children`：二级菜单

::: code-group

```yaml{4-6,9} [修改示例]
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

```yaml-vue [主题默认配置]
{{ getConfig('top_bars') }}
```

:::

## 侧栏 Sidebar

### 社交图标

默认内置 Font-Awesome Brand 图标，可根据您的需求添加，您可以通过在头部引入自定义图标资源来获取更多图标。

- `name`：链接名称
- `icon`：图标 class
- `url`：链接

::: code-group

```yaml [修改示例]
sidebar:
  social: # 社交地址
    - name: github
      icon: fab fa-github
      url: https://github.com
    - name: gitee
      icon: iconfont cg-gitee
      url: https://gitee.com
```

```yaml-vue [主题默认配置]
{{ getConfig('sidebar') }}
```

:::

如果您不想放置任何链接，仅需在 `sidebar` 中设置：

```yaml
sidebar:
  social:
```

### 打字动画

- `typedTextPrefix`：为固定前缀
- `typedText`：为打字效果切换条目，可设置多条，按顺序切换。

```yaml
sidebar:
  typedTextPrefix: I`m
  typedText: ["Web Developer"]
```

### 侧栏信息

侧栏信息是一个数组，里面元素 key-val 形式的。

```yaml
sidebar:
  info: # 个人信息
    - key: 地址
      val: 火星
    - key: 年龄
      val: 18
```

## 横幅 Banner

每个页面横幅都可以自定义不同背景图、标语等，当您需要视频背景的时候，您的视频格式需要为 MP4、WebM 、Ogg 等格式。

- `use_cover`：文章详情页 banner 是否使用文章封面图，默认 false
- `default`：默认配置
  - `type`：横幅类型 img、slideshow、video
  - `bgurl`：背景图地址，如果 type 是 slideshow，必须为数组。如果 type 是 img 时，可为字符串或数组，如果数组长度为 2 则会根据主题自动切换。
  - `bannerTitle`：横幅上标题
  - `bannerText`：横幅描述
  - `position`： 同 CSS object-position
  - `fit`：同 CSS object-fit
- `index`：首页 (属性字段和上面保持一致)
  - `videoUrl`：视频地址 (仅首页有)
- `archive`：分类页 (属性字段和上面保持一致)
- `links`：友链页 (属性字段和上面保持一致)
- `comment`：评论页 (属性字段和上面保持一致)
- `about`：关于 (属性字段和上面保持一致)

::: code-group

```yaml{4} [修改示例]
banner:
  index:
    type: img
    bgurl: https://pic1.zhimg.com/v2-b3c2c6745b9421a13a3c4706b19223b3_r.jpg?source=1940ef5c
    bannerTitle: 树深时见鹿，<br>溪午不闻钟。
    bannerText: Hi my new friend!
```

```yaml-vue [主题默认配置]
{{ getConfig('banner') }}
```

:::

## 页脚 Footer

此配置在 `v1.1.7+` 新增，以前版本在 [用户信息-user](#用户信息-user) 配置。

页脚所有配置预览：

```yaml
footer:
  powered:
    enable: true
  beian:
    enable: false
    icp:
  copyrightYear:
  live_time:
    enable: false
    prefix: footer.tips
    start_time: 04/10/2022 17:00:00
  custom_text:
```

### 起始年份

```yaml
footer:
  copyrightYear: 2020
```

### 驱动

自豪地显示当前使用的博客框架 Hexo 与主题 Async 的名字及版本。

如：`由 Hexo 驱动 v5.4.2 | 主题 - Async v1.1.7`

让更多人知道 Hexo 与主题 Hexo-Theme-Async，这有利于开源社区进一步发展。

```yaml {3}
footer:
  powered:
    enable: true
```

### 备案

国内用户可以提供备案号，开启备案显示。

备案信息默认链接为：<https://beian.miit.gov.cn/>

- `enable`: 开启备案
- `icp`: 备案号

```yaml
footer:
  beian:
    enable: true
    icp: 苏ICP备xxxxxxxx号
```

### 运行时间

默认关闭。

`本博客已萌萌哒地运行 442 天`

- `enable`: 开启运行计时
- `prefix`: 计时文案，如果需要自定义，请覆盖语言文件里 footer.tips ，个性化语言 [参考这里](#语言-language)
- `start_time`: 计时开始时间，浏览器支持的日期格式即可

```yaml
footer:
  live_time:
    enable: false
    prefix: footer.tips
    start_time: 04/10/2022 17:00:00
```

### 自定义文本

`custom_text` 为自定义页脚，可以包含 HTML。
譬如有时使用其他服务商进行托管页面，或一些 ICP 之外的备案信息。

```yaml
footer:
  custom_text: Hosted by <a href="https://github.com" rel="noopener" target="_blank">Github Pages</a>
```

## 文章 Article

这里是一些关于文章相关配置合集。

### 打赏 Reward

开启后，将在每篇文章 `post` 末尾显示打赏按钮。

- `enable`: 开启打赏
- `comment`: 在打赏按钮下显示您想说的话
- `url`: 您的打赏链接（当您开启打赏链接时，将自动跳转您的外部链接而不是展开二维码）
- `methods`: 数组，打赏方式

#### 打赏二维码

- `name`: 打赏方式
- `path`: 图片路径

在 `_config.async.yml` 中进行覆盖。

::: code-group

```yaml{3-6} [修改示例]
reward:
  enable: true
  comment: I'm so cute. Please give me money.
  methods:
    - name: 支付宝
      path: 二维码地址
```

```yaml-vue [主题默认配置]
{{ getConfig('reward') }}
```

:::

您也可以在某篇文章的首部单独设置是否开启打赏。

```yaml
reward: true
# reward: false
```

### 文章目录

文章目录，默认是关闭的。开启后，根据您的 [Markdown](https://segmentfault.com/markdown) 自动生成目录。如果您想关闭指定文章的目录，您可以在文章页单独配置当前文章关闭。[参考这里](/guide/page.html#文章-posts)

- `enable`：是否开启
- `list_number`：是否显示编号
- `max_depth`：生成 TOC 的最大深度
- `min_depth`：生成 TOC 的最小深度
- `post_title`：文章中标题可以快速点击打开目录

::: code-group

```yaml{2,4} [修改示例]
toc:
  enable: true
  list_number: true
  post_title: false
  max_depth: 3
  min_depth: 1
```

```yaml-vue [主题默认配置]
{{ getConfig('toc') }}
```

:::

### 图片懒加载

默认开启，将会为 Markdown 的图片 img 加上 loading="lazy" 属性。

```yaml
lazyload:
  enable: true
```

### 归档页

默认下归档页时间轴卡片显示了标题和摘要信息，如果设置为 `less` 将只显示标题。

- `type`: 显示方式，可选 `more` || `less`

::: code-group

```yaml [修改示例]
archive:
  type: less
```

```yaml-vue [主题默认配置]
{{ getConfig('archive') }}
```

:::

### 版权信息

设置您的文章的分享版权

> [关于许可协议](https://creativecommons.org/licenses/)
> 默认使用 署名-非商业性使用-相同方式共享 4.0，即 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh)。

- `license`：设置证书 (by | by-nc | by-nc-nd | by-nc-sa | by-nd | by-sa | zero)
- `language`：设置语言 (deed.zh | deed.en | deed.ja ｜ ...)
- `post`：在每篇文章末尾显示
- `clipboard`：是否在复制文章时，在剪贴板中追加版权信息（默认关闭）

::: code-group

```yaml{5} [修改示例]
creative_commons:
  license: by-nc-sa
  language: deed.zh
  post: false
  clipboard: true
```

```yaml-vue [主题默认配置]
{{ getConfig('creative_commons') }}
```

:::

> 您的 `url` 请在 Hexo 工作目录下的 `_config.yml` 中设置。
> [配置｜ Hexo](https://hexo.io/zh-cn/docs/configuration#%E7%BD%91%E5%9D%80)

```yaml
# URL
# # If your site is put in a subdirectory, set url as 'https://yoursite.com/child' and root as '/child/'
url: https://www.imalun.com
```

### 自定义封面图

当您没有设置文章封面图时，将会显示主题内置的封面图，您可以通过修改配置来替换默认行为。

- `default`: 封面默认显示的图片，类型为 `string` || `array`
- `type`: 封面显示类型，可选 `img` || `date` || `random`

::: code-group

```yaml [修改示例]
cover:
  default: /img/block.jpg
  type: img
```

```yaml-vue [主题默认配置]
{{ getConfig('cover') }}
```

:::

### 上下篇文章

- `enable`: 是否开启
- `type`: 卡片类型，可选 `large` || `small`

::: code-group

```yaml{3} [修改示例]
post_pagination:
  enable: true
  type: small
```

```yaml-vue [主题默认配置]
{{ getConfig('post_pagination') }}
```

:::

### 文章过期提醒

您可以给文章添加过期提醒。

- `enable`: 是否开启，默认关闭
- `style`: 卡片类型，可选 `simple` || `flat`
- `limit_day`: 超过多少天未更新提醒
- `position`: 显示在文章位置，可选 `top` || `bottom`

::: code-group

```yaml{2} [修改示例]
notice_outdate:
  enable: true
  style: flat
  limit_day: 365
  position: top
```

```yaml-vue [主题默认配置]
{{ getConfig('notice_outdate') }}
```

:::

### 文章破图时默认图片

您可以添加图片加载失败时显示默认图片。

- `flink`: 友链头像破图时显示默认图片
- `post_page`: 文章中图片破图时显示默认图片

::: code-group

```yaml{2,3} [修改示例]
error_img:
  flink: /404.gif
  post_page: /404.jpg
```

```yaml-vue [主题默认配置]
{{ getConfig('error_img') }}
```

:::

## 其他配置 Other

这里是一些关于页面中杂项配置合集。

### 分类卡片

首页中显示的分类卡片。

默认情况下，会显示分类里文章最多的两个，您可以通过修改配置来替换默认行为。

- `enable`: 是否开启
- `len`: 需要显示分类数量，默认为 2 个
- `list`: 如果您需要固定显示分类，可以通过这个字段配置

::: code-group

```yaml{4} [修改示例]
categorie_card:
  enable: true
  len: 2
  list: ["分类1", "分类2"]
```

```yaml-vue [主题默认配置]
{{ getConfig('categorie_card') }}
```

:::

### 固定按钮块

右下角悬浮按钮块。

- `readmode`: 阅读模式按钮
- `aside`: 单双栏切换按钮

::: code-group

```yaml{3} [修改示例]
rightside:
  readmode: true
  aside: true
```

```yaml-vue [主题默认配置]
{{ getConfig('rightside') }}
```

:::

### 日期格式化 Date Format

用于配置主题中使用日期的格式。

- `post_card`：文章卡片的格式
- `post_info`：文章详情页里的格式
- `archive`：归档分类页的格式
  - `type`： 文章日期取值类型，`date`(创建日期) | `updated` (修改日期)
  - `date`：日期格式
  - `time`：时间格式

::: code-group

```yaml [修改示例]
datetime_foramt:
  post_card:
    date: YY/MM/DD
    time: HH:mm
  post_info:
    type: updated
    date: MM/DD
    time: HH:mm
  archive:
    date: MM/DD
    time: HH:mm
```

```yaml-vue [主题默认配置]
{{ getConfig('datetime_foramt') }}
```

:::

### 代码高亮 Highlight

代码块中的所有功能只适用于 Hexo 自带的代码渲染，如果使用第三方的渲染器，不一定会有效

- `theme`：是否使用内置代码高亮配色
- `title`：代码块标题样式，`mac`、`default`
- `copy`：是否可以一键复制，默认开启
- `lang`：是否显示代码块语言，默认显示
- `code_word_wrap`：是否强制换行，默认关闭，开启后需关闭代码行号
- `height_limit`：设置代码块高低

::: code-group

```yaml{5,7} [修改示例]
highlight:
  theme: true
  title: default
  copy: true
  lang: false
  code_word_wrap: true
  height_limit: 200 # 超出时，显示折叠按钮
```

```yaml-vue [主题默认配置]
{{ getConfig('highlight') }}
```

:::

通过 CSS 变量来覆盖默认色

```css
:root {
	/* 代码块背景色、前景色 */
	--highlight-background: #f6f8fa;
	--highlight-foreground: #4d5a60;
	/* 行号 */
	--highlight-gutter-color: #90a4ae;
	--highlight-gutter-bg-color: #f1f1f1;
	/* 工具栏 */
	--highlight-tools-color: #646464;
	--highlight-tools-bg-color: #e6ebf1;
	/* 滚动条 */
	--highlight-scrollbar: #d7d7d7;

	/* 代码 */
	--highlight-addition: #e32323;
	--highlight-deletion: #bf42bf;
	--highlight-comment: rgba(149, 165, 166, 0.8);

	--highlight-yellow: #ffb62c;
	--highlight-purple: #7c4dff;
	--highlight-aqua: #39adb5;
	--highlight-red: #e53935;
	--highlight-orange: #f76d47;
	--highlight-green: #91b859;
	--highlight-blue: #6182b8;
}
```

您也可以将 `theme: false`，然后引入 `highlight.js` 和 `PrismJS` 的主题文件，来自定义代码块高亮。

```yaml
highlight:
  theme: false
```

## 自定义图标 Icon

博客中存在一些固定的图标，譬如主题切换图标、分类图标等。

可以通过配置 `icons` 修改：

```yaml
icons:
  # 主题切换图标
  sun: far fa-sun
  moon: far fa-moon
  # 首页视频播放
  play: fas fa-play
  # 邮箱
  email: far fa-envelope
  # 分类进入图标
  next: fas fa-arrow-right
  # 文章详情 日期
  calendar: far fa-calendar-alt
  # 文章详情 时间
  clock: far fa-clock
  # 文章详情 作者
  user: far fa-user
  # 返回顶部 v1.1.3+
  back_top: fas fa-arrow-up
  # 查询 v1.1.5+
  search: fas fa-search
  # 关闭 v1.1.5+
  close: fas fa-times
  # 打赏 v1.1.7+
  reward: fas fa-hand-holding-usd
  # 用户信息和文章目录切换 v1.2.10+
  user_tag: fas fa-user-alt
  toc_tag: fas fa-th-list
  # 右下角固定按钮 v1.2.11+
  read: fas fa-book-reader
  arrows: fas fa-arrows-alt-h
  # 代码高亮折叠 v2.0.0+
  double_arrows: fas fa-angle-double-down
  # 代码复制
  copy: fas fa-copy
```

<link rel="stylesheet" href="/font-awesome.min.css">
<icon-list title="主题使用图标预览" prefix="" :icons="themeIcons"></icon-list>

## 自定义样式 Style

相比 `head` 引入，您可以直接编写 `less` 文件，并使用主题已有的变量，且将和主题样式文件一起编译。

::: danger
在 `1.2.x + ` 修改主题切换实现方式，由原来多份样式文件调整为 CSS 变量形式。所以自定义样式也有些许变化。
:::

### `1.2.x` 版本

- 新建 `source/_data/style/index.less`，开始编写您的自定义样式了。

```txt {5}
┌── blog
│   └── source
│       └── _data
│           └── style
│               ├── index.less
│   └── themes
```

`:root` 下为白色主题，`:root.dart` 下为暗黑色主题，

修改主题色示例：

```less source/_data/style/index.less
.var-primary(@primary: #afb42b; @primary-weak: #c0ca33) {
	--primary: @primary;
	--primary-70: fade(@primary, 70%);
	--primary-50: fade(@primary, 50%);
	--primary-30: fade(@primary, 30%);
	--primary-weak: @primary-weak;
	--primary-weak-50: fade(@primary-weak, 50%);
}

:root {
	.var-primary(#5a5df0, #697be2);

	&.dark {
		.var-primary(#a4ce60, #82df7a);
	}
}
```

跟随操作系统选择主题示例：

```less source/_data/style/index.less
@media (prefers-color-scheme: dark) {
	:root {
		.dark();
	}
}
```

### `1.1.x` 版本

- 新建 source/\_data/style/dark.less、source/\_data/style/light.less，开始编写您的自定义样式了。他们分别默认会合并到 `dark`、`light` 两种模式中去。
- 如果需要覆盖变量可以添加 source/\_data/style/dark.variables.less、source/\_data/style/light.variables.less，进行覆盖。

```txt {4,5,6,7,8}
┌── blog
│   └── source
│       └── _data
│           └── style
│               ├── dark.less
│               ├── light.less
│               ├── dark.variables.less
│               └── light.variables.less
│   └── themes
```

修改主题色示例：

```less source/_data/style/dark.less
// source/_data/style/dark.less
@primary: #6062ce;
@primary-weak: #7a89df;
```

```less source/_data/style/light.less
// source/_data/style/light.less
@primary: #6062ce;
@primary-weak: #7a89df;
```

## 自定义模板 Layout

主题允许您自定义模板来替换主题模板，此功能需要您的版本 v2.0.0+ 。

- `path`: 指定自定义模板目录（默认情况下不要修改）

```yaml
layout:
  path: layout
```

内置模板列表：

```yaml
layout:
  path: layout
  # 整体布局结构模板
  main: _partial/main
  # 顶部菜单栏模板
  header: _partial/header
  # 顶部横幅模板
  banner: _partial/banner
  # 侧栏模板
  sidebar: _partial/sidebar/index
  # 页脚模板
  footer: _partial/footer
  # 文章信息模板
  post_info: _partial/post/post-info
  # 文章内容模板
  post_content: _partial/post/post-content
  # 文章信息里打赏模板
  reward: _partial/post/reward
  # 文章详情版权信息模板
  post_copyright: _partial/post/post-copyright
  # 文章详情上下篇文章模板
  post_next_prev: _partial/post/post-next-prev
  # 文章卡片信息模板
  post_card: _partial/post/post-card
  # 文章卡片信息模板
  post_card_mini: _partial/post/post-card-mini
  # 顶部菜单-logo部分
  header_logo: _widget/header-logo
  # 顶部菜单-菜单部分
  header_menu: _widget/header-menu
  # 顶部菜单-主题切换部分
  header_theme: _widget/header-theme
  # 顶部菜单-查询部分
  header_search: _widget/header-search
  # 分类卡片模板
  categorie: _widget/categorie
  # 分页模板
  paginator: _widget/paginator
  # 返回顶部模板
  back_to_top: _widget/back-to-top
  # 固定按钮模板
  fixed_btn: _widget/fixed-btn
  # 关于页面配置卡片
  about_card: _widget/about-card
  # 侧栏
  sidebar_user: _partial/sidebar/card/user
  sidebar_social: _partial/sidebar/card/social
  sidebar_info: _partial/sidebar/card/info
  sidebar_email: _partial/sidebar/card/email
  # 评论插件模板
  comment: _third-party/comment/index
  # 页面切换动画模板
  page_loading: _partial/preloader/page-preloader
  # 主题切换动画模板
  mode_change: _partial/preloader/change-mode-preloader
  # 内置几个页面模板
  page_about: _partial/page/about
  page_archive: _partial/page/archive
  page_category: _partial/page/category
  page_index: _partial/page/index
  page_links: _partial/page/links
  page_post: _partial/page/post
  page_tag: _partial/page/tag
```

用覆盖 footer 来举个例子：

不修改 `layout.path` 时，您的目录结构如下，并添加 `footer.ejs`

```txt {2,3}
┌── blog
│   └── layout
│          └── footer.ejs
│   └── scaffolds
│   └── source
│   └── themes
```

上面 `footer.ejs` 的目录是 `layout/footer.ejs` 则为 `async/footer`， 如果 `footer.ejs` 的目录是 `layout/demo/footer.ejs` 则为 `async/demo/footer`， 必须已 `async/` 作为根（以免和主题冲突）。

编写好 `footer.ejs` 后，修改配置如下：

```yaml
layout:
  footer: async/footer
```

可以前往 [演示站点](https://hexo-theme-async.imalun.com/demosite/) 查看效果，首页 footer 和 页面切换已是自定义效果了。

::: tip
您在 `footer.ejs` 可以访问到所有配置，全局变量，和辅助函数等，和主题模板一致。

除了使用 `ejs` 以外，您可以使用 hexo 支持的任意渲染器。

比如使用 pug ，您只需要安装 `hexo-render-pug` 后即可使用。
:::

## 渐进式应用 PWA

开始 PWA 只需要设置 sw 为 true 即可，本主题已添加 Server Worker 相关操作 。

```yaml
sw: true
```

::: warning
使用 PWA 要求

- 站点必须为 HTTPS。
- 添加一个清单文件（manifest)，直接在 `source` 下新增。
  :::

清单文件 结构

```json
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

## 更多配置

您可以直接查看 [\_config.yml ｜ hexo-theme-async](https://github.com/MaLuns/hexo-theme-async/blob/master/packages/hexo-theme-async/_config.yml) 文件及相关注释。

::: details 完整配置列表信息.

```yaml-vue
{{ config }}
```

:::

<script setup>
import config from "../../packages/hexo-theme-async/_config.yml?raw"
import plugins from "../../packages/hexo-theme-async/plugins.yml?raw"
import zhHans from "../../packages/hexo-theme-async/languages/zh-Hans.yml?raw"
const configs = config.split('\n')
const themeIcons = []
let startIndx = null
for (let index = 0; index < configs.length; index++) {
		let item = configs[index]
		if (startIndx !== null && !item.startsWith(" ")) {
				break
		}
		if (startIndx !== null && !item.trim().startsWith('#')) {
				themeIcons.push(item.split(':')[1].trim())
		}
		if (item === 'icons:') {
				startIndx = index + 1
		}
}

const getConfig = (key) => {
	const keyConfig = []
	for (let index = 0; index < configs.length; index++) {
		let item = configs[index]
		if (keyConfig.length) {
			if (!item.startsWith(" ")) {
				break
			}
			keyConfig.push(item)
		}
		if (item.trimEnd() === `${key}:`) {
				keyConfig.push(item)
		}
	}
	return keyConfig.join('\n')
}
</script>
