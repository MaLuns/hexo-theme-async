# Theme Configuration

## Configuration File

Convention > Configuration

::: danger
Define the configuration you need in `_config.async.yml`, and the rest will automatically use the theme's default configuration.

Unless otherwise specified, the default configuration is in the `_config.async.yml` file.

It is best not to change any files of the theme unless you are sure that you have some development capability or that you will not upgrade the theme thereafter.
:::

## Language

This theme is available in both Chinese and English, zh-Hans and en.

> The language of the site needs to be set itself in `_config.yml` under the Hexo directory.

```yaml
language: zh-Hans
```

### Personalized language package

Create a new `source/_data/languages.yml` in the Hexo working directory. (If the `source/_data` directory does not exist, create one.)

With convention over configuration, you only need to customize the languages you want to cover in `languages.yml`, and the rest is automatically merged with the theme default configuration. (It also makes it easier to upgrade later.)

For details, see the following example:

> See the corresponding language attributes and content [languages | hexo-theme-async](https://github.com/MaLuns/hexo-theme-async/blob/master/packages/hexo-theme-async/languages/), covering the corresponding item.

```yaml
# Language to be covered
en:
    site:
        title: Site Information

zh-Hans:
    site:
        title: 本站信息

# You can also extend other languages
```

If only Chinese language is used, all entries except `zh-Hans` can be deleted.

## Theme mode

-   `default`: Set the theme default mode
    -   `style-light`: Light mode
    -   `style-dark`: Dark mode
    -   `auto`: Follow the system selection
-   `switch`: If false, the theme switch button will not appear and only load the default theme mode.

```yaml
theme:
    switch: true
    default: style-light
```

## Favicon

Used to configure logo, icon, and PWA installation ICONS.

-   `logo`: Top logo
-   `dark_logo`: Top logo, displayed in dark mode
-   `icon16`：icon 16\*16
-   `icon32`：icon 32\*32
-   `appleTouchIcon`: Displays icons when iOS is added to the desktop
-   `webmanifest`: Application manifest file
-   `visibilitychange`: Whether to switch title display when leaving the window
-   `hidden`: Displays the icon when leaving the window
-   `showText`: Displays text when activating the window
-   `hideText`: Leaves the window to display text

```yaml
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

## Plugins

Theme built-in plug-in configuration.

-   `internal_provider`: CDN of the theme JS. This parameter is optional `local`、`unpkg`、`jsdelivr`
    -   `local`: The CDN is not used
    -   `unpkg`: Use unpkg
    -   `jsdelivr`: Use jsdelivr
-   `third_party_provider`: CDN configuration of the three-party plug-in JS, optional `unpkg`、`jsdelivr`

```yaml
assets:
    internal_provider: local # local | unpkg | jsdelivr
    third_party_provider: unpkg # unpkg | jsdelivr
```

In addition to using unpkg, jsdelivr, you can customize other CDN as well.

```yaml
assets:
    third_party_provider: https://npm.elemecdn.com
```

You can also configure a CDN source for a plug-in.

```yaml
assets:
    internal_provider: local
    third_party_provider: unpkg
    plugin:
        swup: https://npm.elemecdn.com/swup@2.0.19/dist/swup.min.js
```

If you want to download a theme locally using a three-party plug-in, you can do so by executing the `hexo plugin` command (theme version 2.0.4+ is required). Then modify the configuration:

```yaml
assets:
    third_party_provider: plugins
```

## CDN

Content Delivery Network, unified loading network resources, conducive to improving the loading speed of web pages.

When you need to add third-party plug-ins to personalize your blog, you should prioritize using CDN to load files.

JavaScript resource type description:

-   `head`: Insert into the head, and the other three at the end of the body by default.
-   `base`: Load and execute immediately.
-   `async`: Load asynchronously and execute immediately after the loading is complete.
-   `defer`: Load resources asynchronously, but execute last.

```yaml
cdn:
    css:
    js:
        head:
        base:
        async:
        defer:
```

## Font Icon

The default for this theme is the Font Awesome 5 icon.

> See Default ICONS for a list of supported ICONS by [default](/about/icon.html)

If you want to use other icons, just configure your icon in `assets.icons`.

-   `type`: Icon type `font` `symbol`
-   `css`: font-class icon resource url (overrides or removes the built-in Font Awesome 5 icon if it has a value or is empty)
-   `js`: Multi-color icon resource url

```yaml
assets:
    icons:
        type: font # font symbol
        css:
        js:
```

### [iconfont](https://www.iconfont.cn/)

Under Alibaba, you can customize your own icon set. Good domestic speed. (Recommended) [Instructions for use](https://www.iconfont.cn/help/detail?helptype=code)

```yaml {5}
assets:
    icons:
        type: font
        #  Here is the icon link you got from iconfont.
        css: //at.alicdn.com/t/font_383361_cfn4m13f4v.css
        js:
```

Multi-color icon use mode:

```yaml {3,5}
assets:
    icons:
        type: symbol
        css:
        js: //at.alicdn.com/t/font_383361_cfn4m13f4v.js
```

::: warning
When you overwrite the built-in icon resources, you need to change the fixed ICONS because some [fixed icons](#自定义图标-icon) in the blog UI are used.

Monochrome and multicolor icons can be used together, but the blog UI fixed ICONS can only be used depending on `type`.
:::

## User info

Basic user information, used for blogger name, profile picture, link exchange rules, site runtime, and so on.

-   `name`: Nickname used for sidebar or other area identification
-   `first_name`: Name, used at the top to display the first and last names separately
-   `last_name`: Surname
-   `email`: Email address
-   `domain`: domain name
-   `avatar`: avatar
-   `dark_avatar`: Avatar, dark theme display
-   `describe`: Website Introduction
-   `ruleText`: buddy link exchange rule
-   ~~`birthDay`： Blog timing start time v1.1.7 deprecated~~
-   ~~`copyrightYear`：Copyright date v1.1.7 deprecated~~

```yaml
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

## Navigation bar

The logo for the top navigation is configured in [favicon](#favicon) and the theme toggle button is configured in [Theme mode](#theme-mode).

-   `title`: Title
-   `url`: path. If the level-2 menu is set, you can set it to `'#'`
-   `noswup`: Do not use local refresh
-   `target`: Link opening mode, which is consistent with the attribute of label a
-   `children`: Secondary menu

```yaml
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

## Sidebar

### Social icon

The default built-in Font-Awesome Brand icon can be added according to your needs, and you can get more ICONS by introducing custom icon resources in the header.

-   `name`: Link name
-   `icon`: Icon class
-   `url`: Link

```yaml
sidebar:
    social: # Social Address
        - name: github
          icon: fab fa-github
          url: https://github.com
        - name: gitee
          icon: iconfont cg-gitee
          url: https://gitee.com
```

If you do not want to place any links, simply set the following in the `sidebar`:

```yaml
sidebar:
    social:
```

### Typing animation

-   `typedTextPrefix`: indicates a fixed prefix
-   `typedText`: To switch entries for typing effect, multiple entries can be set and switched in order.

```yaml
sidebar:
    typedTextPrefix: I`m
    typedText: ["Web Developer"]
```

### Sidebar info

The sidebar information is an array of key-val elements.

```yaml
sidebar:
    info:
        - key: address
          val: Mars
        - key: age
          val: 18
```

## Banner

Each page banner can be customized with different background images, slogans, etc. When you need video background, your video format should be MP4, WebM, Ogg, etc.

-   `default`: Default configuration
    -   `type`: Banner types img、slideshow、video
    -   `bgurl`: Background image address, if type is slideshow, must be an array. If type is img, it can be a string or an array. If the array length is 2, it will be switched automatically according to the theme.
    -   `bannerTitle`: Banner title
    -   `bannerText`: Banner description
    -   `position`: same as CSS object-position
    -   `fit`: Same as CSS object-fit
-   `index`: Home page (property fields remain the same as above)
    -   `videoUrl`: Video address (available on home page only)
-   `archive`: Category page
-   `links`: Friend link page
-   `comment`: Comment page
-   `about`About page

```yaml
banner:
    index:
        type: img
        bgurl: https://pic1.zhimg.com/v2-b3c2c6745b9421a13a3c4706b19223b3_r.jpg?source=1940ef5c
        bannerTitle: 树深时见鹿，<br>溪午不闻钟。
        bannerText: Hi my new friend!
```

## Footer

This configuration was added in `v1.1.7+`. In previous versions, it was configured in [user info](#user-info).

### Starting year

```yaml
footer:
    copyrightYear: 2020
```

### Powered

Proudly displays the names and versions of the currently used blog framework Hexo and theme Async.

Such as: `driven by Hexo v5.4.2 | theme - Async v1.1.7`

Let more people know Hexo and the Theme hexo-theme-async, which is good for the open source community further development.

```yaml {3}
footer:
    powered:
        enable: true
```

### Running time

This function is disabled by default.

`本博客已萌萌哒地运行 442 天`

-   `enable`: Enable the runtime
-   `prefix` : Timing copy, if you need to customize, please override the language file footer.tips, personalized language [refer to here](#language)
-   `start_time`: Time the start time in any date format supported by the browser

```yaml
footer:
    live_time:
        enable: false
        prefix: footer.tips
        start_time: 04/10/2022 17:00:00
```

### Custom text

`custom_text` is a custom footer that can contain HTML. For example, sometimes use other service providers for hosting pages, or some ICP outside of the record information.

```yaml
footer:
    custom_text: Hosted by <a href="https://github.com" rel="noopener" target="_blank">Github Pages</a>
```

## Article

Here is a collection of articles related to configuration.

### Reward

When enabled, a tip button will be displayed at the end of each `post`.

-   `enable`: Start tipping
-   `comment`: Show what you want to say under the Tip button
-   `url`: Your tip link (When you open the tip link, it automatically redirects to your external link instead of expanding the QR code)
-   `methods`: Array, tip method

#### Reward QR code

-   `name`: Reward name
-   `path`: picture path

Override in` _config.async.yml`.

```yaml
reward:
    enable: true
    comment: I'm so cute. Please give me money.
    methods:
        - name: Alipay
          path: Qr code address
```

You can also set whether to enable tipping separately at the beginning of an article.

```yaml
reward: true
# reward: false
```

### Article toc

Article tocs, which is closed by default. When enabled, the directory is automatically generated based on your [Markdown](https://segmentfault.com/markdown) . If you want to close the directory for a specified article, you can configure the current article to close separately on the article page. Refer to [here](/guide/page.html#文章-posts)

-   `enable`: Whether to enable
-   `list_number`: Indicates whether to display the number
-   `max_depth`: Indicates the maximum depth of the TOC
-   `min_depth`: Indicates the minimum depth to generate the TOC

```yaml
toc:
    enable: true
    list_number: true
    max_depth: 3
    min_depth: 1
```

### 图片懒加载

Enabled by default, will add loading="lazy" attribute to Markdown image img.

```yaml
lazyload:
    enable: true
```

### Archive page

By default, the archive page timeline card displays the title and summary information. If set to `less`, only the title is displayed.

-   `type`: Display mode. This parameter is optional `more` || `less`

```yaml
archive:
    type: more # less more
```

### Copyright info

Set the sharing copyright of your article

> [About the license agreement](https://creativecommons.org/licenses/)
> default uses attribution - Non-commercial - Same way Share [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh)。

-   `license`: set certificate (by | by-nc | by-nc-nd | by-nc-sa | by-nd | by-sa | zero)
-   `language`: set language (deed.zh | deed.en | deed.ja ｜ ...)
-   `post`: displayed at the end of each article
-   `clipboard`: Whether to append copyright information to Clipboard when copying articles (default off)

```yaml
creative_commons:
    license: by-nc-sa
    language: deed.zh
    post: false
    clipboard: false
```

> Your `url` is set in `_config.yml` under the Hexo working directory.
> [Config ｜ Hexo](https://hexo.io/zh-cn/docs/configuration#%E7%BD%91%E5%9D%80)

```yaml
# URL
# # If your site is put in a subdirectory, set url as 'https://yoursite.com/child' and root as '/child/'
url: https://www.imalun.com
```

### Customize the cover image

When you do not set an article cover image, the theme's built-in cover image is displayed, and you can change the configuration to replace the default behavior.

-   `default`: Indicates the default image displayed on the cover. The type is `string` || `array`
-   `type`: Cover display type (optional) `img` || `date` || `random`

```yaml
cover:
    default: /img/block.jpg
    type: img
```

### Upper and lower articles

-   `enable`: Whether to enable
-   `type`: Card type, optional `large` || `small`

```yaml
post_pagination:
    enable: true
    type: large # large || small
```

### Article expiration reminder

You can add expiration reminders to articles.

-   `enable`: Whether to enable it. It is disabled by default
-   `style`: Card type, optional `simple` || `flat`
-   `limit_day`: How many days have passed without updating alerts
-   `position`: Displayed in the article location, optional `top` || `bottom`

```yaml
notice_outdate:
    enable: true
    style: flat
    limit_day: 365
    position: top
```

### The article is broken when the default picture

You can add pictures to display default pictures when loading fails.

-   `flink`: The default picture is displayed when the friend's profile picture is broken
-   `post_page`: The default picture is displayed when the picture in the article is broken

```yaml
error_img:
    flink: /img/friend_404.gif
    post_page: /img/404.jpg
```

## Other config

Here is a collection of miscellaneous configurations on the page.

### Categorie card

The category card displayed on the home page.

By default, the two most articles in the category are displayed, and you can change the configuration to replace the default behavior.

-   `enable`: Whether to enable
-   `len`: Indicates the number of categories to be displayed. The default value is 2
-   `list`: If you need fixed display categories, you can configure them through this field

```yaml
categorie_card:
    enable: true
    len: 2
    list: ["Category 1", "Category 2"]
```

### Fixed button block

Lower right corner suspension button block.

-   `readmode`: Read Mode button
-   `aside`: Single or double column switch button

```yaml
rightside:
    readmode: true
    aside: false
```

### Date Format

Used to configure the format of the date used in the theme.

-   `post_card`：Format of the article card
-   `post_info`: Format in the detail page of the article
-   `archive`: Format of the archive category page

```yaml
datetime_foramt:
    post_card:
        date: YY/MM/DD
        time: HH:mm
    post_info:
        date: MM/DD
        time: HH:mm
    archive:
        date: MM/DD
        time: HH:mm
```

### Code Highlight

All features in the code block apply only to the code render that comes with Hexo, and may not work if a third party renderer is used

-   `theme`：Whether to use built-in code to highlight the color scheme
-   `title`：block title style，`mac`、`default`
-   `copy`：Specifies whether one-click replication is enabled. This parameter is enabled by default
-   `lang`：Whether to display the code block language. It is displayed by default
-   `code_word_wrap`：Whether to force newlines. This parameter is disabled by default. After this parameter is enabled, the code line number must be disabled
-   `height_limit`：Sets the code block height

```yaml
highlight:
    theme: true
    title: default
    copy: true
    lang: true
    code_word_wrap: fasle
    height_limit: 200 #  When exceeded, the fold button is displayed
```

Override the default color with CSS variables

```css
:root {
	/* Block background color, foreground color */
	--highlight-background: #f6f8fa;
	--highlight-foreground: #4d5a60;
	/* Line number */
	--highlight-gutter-color: #90a4ae;
	--highlight-gutter-bg-color: #f1f1f1;
	/* Toolbar */
	--highlight-tools-color: #646464;
	--highlight-tools-bg-color: #e6ebf1;
	/* Scroll bar */
	--highlight-scrollbar: #d7d7d7;

	/* Code */
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

You can also use `theme: false` and then introduce `highlight.js` and `PrismJS` theme files that come from defining code blocks to highlight.

```yaml
highlight:
    theme: false
```

## Custom Icon

There are some fixed icons in the blog, such as theme switching icon, category icon and so on.

You can change this by configuring `icons`:

```yaml
icons:
    # Theme switch icon
    sun: far fa-sun
    moon: far fa-moon
    # Home video play
    play: fas fa-play
    # Email
    email: far fa-envelope
    # Category entry icon
    next: fas fa-arrow-right
    # Article details date
    calendar: far fa-calendar-alt
    # Article details time
    clock: far fa-clock
    Article details author
    user: far fa-user
    # Return to top v1.1.3+
    back_top: fas fa-arrow-up
    Query v1.1.5+
    search: fas fa-search
    # Disable v1.1.5+
    close: fas fa-times
    # Tip v1.1.7+
    reward: fas fa-hand-holding-usd
    # User Info and article directory switch v1.2.10+
    user_tag: fas fa-user-alt
    toc_tag: fas fa-th-list
    # Lower right corner fixed button v1.2.11+
    read: fas fa-book-reader
    arrows: fas fa-arrows-alt-h
```

## Custom Style

Instead of the `head` import, you can write `less` files directly and use the variables that the theme already has, which will be compiled with the theme style files.

::: danger
In `1.2.x +`, the implementation method of theme switching was changed from multiple style files to CSS variable form. So custom styles have changed a little bit.
:::

### `1.2.x` version

-   Newly built `source/_data/style/index.less` to start writing your custom styles.

```txt {5}
┌── blog
│   └── source
│       └── _data
│           └── style
│               ├── index.less
│   └── themes
```

White theme under `:root`, dark theme under `:root.dart`,

Example of modifying the theme color:

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

Follow the operating system to select a theme example:

```less source/_data/style/index.less
@media (prefers-color-scheme: dark) {
	:root {
		.dark();
	}
}
```

### `1.1.x` version

-   Newly built` source/_data/style/dark.less`,`source/_data/style/light.less` To start writing your custom styles. They will merge todark,lightGo between the two modes.
-   You can add variables if you need to override them `source/_data/style/dark.variables.less`,`source/_data/style/light.variables.less`, overwrite.

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

Example of modifying the theme color:

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

## Customize the template Layout

Themes allow you to customize templates to replace theme templates. This feature requires your version `v2.0.0+`.

-   `path`: Specify the custom template directory (not modified by default)

```yaml
layout:
    path: layout
```

List of built-in templates:

```yaml
layout:
    path: layout
    # Overall layout structure template
    main: _partial/main
    # Top menu bar template
    header: _partial/header
    # Top banner template
    banner: _partial/banner
    # Sidebar template
    sidebar: _partial/sidebar/index
    # Footer template
    footer: _partial/footer
    # Article information template
    post_info: _partial/post/post-info
    # Article content template
    post_content: _partial/post/post-content
    # Tip template in article information
    reward: _partial/post/reward
    # Copyright information template for article details
    post_copyright: _partial/post/post-copyright
    # Template for each article
    post_next_prev: _partial/post/post-next-prev
    # Article card information template
    post_card: _partial/post/post-card
    # Article card information template
    post_card_mini: _partial/post/post-card-mini
    # Top Menu -logo section
    header_logo: _widget/header_logo
    # Top Menu - Menu section
    header_menu: _widget/header_menu
    # Top Menu - Theme switching section
    header_theme: _widget/header_theme
    # Top Menu - Query section
    header_search: _widget/header_search
    # Sort card template
    categorie: _widget/categorie
    # Paging template
    paginator: _widget/paginator
    # Return to top template
    back_to_top: _widget/back-to-top
    # Fixed button template
    fixed_btn: _widget/fixed-btn
    # Sidebar
    sidebar_user: _partial/sidebar/card/user
    sidebar_social: _partial/sidebar/card/social
    sidebar_info: _partial/sidebar/card/info
    sidebar_email: _partial/sidebar/card/email
    # Comment plugin template
    comment: _third-party/comment/index
    # Page switch animation template
    page_loading: _partial/preloader/page-preloader
    # Theme switch animation template
    mode_change: _partial/preloader/change-mode-preloader
    # Built-in several page templates
    page_about: _partial/page/about
    page_archive: _partial/page/archive
    page_category: _partial/page/category
    page_index: _partial/page/index
    page_links: _partial/page/links
    page_post: _partial/page/post
    page_tag: _partial/page/tag
```

An example would be overriding footer:

Without changing `layout.path`, you have the following directory structure and add `footer.ejs`

```txt {2,3}
┌── blog
│   └── layout
│          └── footer.ejs
│   └── scaffolds
│   └── source
│   └── themes
```

After writing `footer.ejs`, modify the configuration as follows:

directory is `layout/footer.ejs` is `async/footer.ejs`,directory is l`ayout/demo/footer.ejs` is `async/demo/footer`.

Must have `async/` as the root (to avoid conflicts with the theme).

```yaml
layout:
    footer: async/footer
```

You can go to the [demo site](https://hexo-theme-async.imalun.com/demo/) to see the effect, home page footer and page switching is a custom effect.

::: tip
You can access all configurations, global variables, and helper functions in `footer.ejs`, just like the theme template.

In addition to using `ejs`, you can use any renderer supported by hexo.

For example, with pug, you only need to install `hexo-render-pug` to use it.
:::

## PWA

To start PWA, you only need to set sw to true. Server Worker related operations have been added in this topic.

```yaml
sw: true
```

::: warning
Use PWA requirements

-   The site must be HTTPS.
-   Add a manifest file directly in `source` New.

:::

Manifest file structure

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

## More configuration

You can directly see [\_config.yml ｜ hexo-theme-async](https://github.com/MaLuns/hexo-theme-async/blob/master/packages/hexo-theme-async/_config.yml) file and related comments.

```yaml-vue
{{ config }}
```

<script setup>
import config from "../../../packages/hexo-theme-async/_config.yml?raw"
</script>