const n=`# Open Graph protocol
open_graph: true

# User info
user:
  name: ThemeAsync
  first_name: Theme
  last_name: Async
  email: 
  domain: 站点域名
  avatar: /img/avatar.jpg
  describe: 网站简介。
  rule_text: 暂不接受个人博客以外的友链申请，确保您的网站内容积极向上，文章至少30篇，原创70%以上，部署HTTPS。

# Configure the icon information of the site
favicon:
  logo: /img/favicon.svg
  icon16: /img/favicon.svg
  icon32: /img/favicon.svg
  apple_touch_icon: 
  webmanifest:
  visibilitychange: false
  hidden: /failure.ico # Displays an icon when not visible
  show_text: favicon.show_text
  hide_text: favicon.hide_text

# Theme resource files or plug-ins
assets:
  # The cdn configuration of the js inside the theme
  internal_provider: local
  # cdn configuration of third-party js
  third_party_provider: unpkg
  # The plug-in used by the theme
  plugin:
    hexo_theme_async:
      rowcss: css/plugins/bootstrap.row.css
      typing: js/plugins/typing.js
      search: js/plugins/local_search.js
			danmu: js/plugins/danmu.js
      main: js/main.js
  # Icon configuration
  icons: 
    type: font # font symbol
    css:  css/plugins/font-awesome.min.css
    js:

# CDN User - defined plug-in
cdn:
  css: 
  js:
    head:
    base: 
    async: 
    defer: 

# The icon used by the theme
icons:
  # Theme switch icon
  sun: far fa-sun
  moon: far fa-moon
  # Home video play
  play: fas fa-play
  # email icon
  email: far fa-envelope
  # Category entry icon
  next: fas fa-arrow-right
  # Date of article details
  calendar: far fa-calendar-alt
  # Article details time
  clock: far fa-clock
  # Author of article details
  user: far fa-user
  # Return to the top icon
  back_top: fas fa-arrow-up
  # close icon
  close: fas fa-times
  # search icon
  search: fas fa-search
  # reward icon
  reward: fas fa-hand-holding-usd
  # User information and article directory switch
  user_tag: fas fa-user-alt
  toc_tag: fas fa-th-list
  # Secure the button in the lower right corner
  read: fas fa-book-reader
  arrows: fas fa-arrows-alt-h
  # Code highlight fold icon
  double_arrows: fas fa-angle-double-down
  # Code copy icon
  copy: fas fa-copy

# Top navigation menu
top_bars:
  - title: menu.home
    url: /
  - title: menu.archives
    url: /archives/

# Banner settings
banner:
  use_cover: false
	danmu: 
		enable: false
		el: .trm-banner
  default:
    type: img
    bgurl: /img/banner.png
    banner_text: Hi my new friend!
    position: top
    fit: cover
  index:
    banner_title: 树深时见鹿，<br>溪午不闻钟。
    banner_text: Hi my new friend!
    video_url: 
  archive:
    banner_title: 云间连下榻，<br>天上接行杯。
    banner_text: The article archive
  links:
    banner_title: 莫愁前路无知己，<br>天下谁人不识君。
    banner_text: A link to a friend's website
  comment:
    banner_title: 醉后不知天在水，<br>满船清梦压星河。
    banner_text: The magic tree hole
  about:
    banner_title: 醉后不知天在水，<br>满船清梦压星河。
    banner_text: About me

# Sidebar settings
sidebar:
  typed_text_prefix: I\`m
  typed_text: 
  info: 
    - key: sidebar.residence
      val: Mars
  social:
    - name: Github
      icon: fab fa-github
      url: https://github.com

# About page settings
about:
	insert: none # before | after | none
  title: 如果一切都是镜花水月，那就让这万物走向终结。如果一切皆是命中注定，那就让这世界消失殆尽。
  introduction: 大家好，我是 <strong>Async</strong>，很高兴您能在浩瀚如烟的互联网世界里发现这个博客，更感谢您能够饶有兴致地浏览这个页面。建立这个 Blog 是出于兴趣爱好，我将在此分会分享一些学习笔记，可能还会分享少许图片、视频以及其他有趣东西的链接。
  blog: 
    <ul class="trm-list">
      <li>程序：Hexo </li>
      <li>主题：Hexo-theme-async </li>
    </ul>
  privacy: 
    本网站不会追踪访客行为，且不要求访客提供任何敏感信息（比如真实姓名、身份证号码、手机号等），因而也不存在任何隐私泄漏问题。访客参与评论，必须遵守法律法规和基本道德规范，文明礼貌。严禁发布任何有关淫秽、反动、暴力、博彩、恐吓、低俗的内容或违法信息，在尊重言论自由的同时请保持和平与理性。请勿对他人采取不友好的评论或其它过激行为。

# Footer settings
footer:
  # Hexo link (Powered by Hexo).
  powered:
    enable: true
  # Beian icp information for Chinese users. In China, every legal website should have a beian icp in website footer.
  # https://beian.miit.gov.cn/
  beian:
    enable: false
    icp: 
  # Copyright date
  copyright_year:
  # 
  live_time:
    enable: false
    prefix: footer.tips
    start_time: 04/10/2022 17:00:00
  #
  custom_text:

# Here is a collection of articles related to configuration.
#### Article configuration start ###
# Reward (Donate)
# If enable true, reward would be displayed in every posts and pages by default.
# You can show or hide reward in a specific page throuth \`reward: true | false\` in Front Matter.
reward:
  enable: false
  comment: reward.comment
  # url:
  methods:

# Article table of contents
toc:
  enable: false
  list_number: true
  post_title: true
  max_depth: 3
  min_depth: 1

# Archive page
archive:
  type: more # less more

# Creative Commons 4.0 International License.
# https://creativecommons.org/licenses/
# Available values of license: by | by-nc | by-nc-nd | by-nc-sa | by-nd | by-sa | zero
# You can set a language value if you prefer a translated version of CC license.
# CC licenses are available in 39 languages, where you can find the specific and correct abbreviation you need.
# Valid values of language: deed.zh, deed.en, deed.ja, etc.
creative_commons:
  license: by-nc-sa
  language: deed.zh
  post: false
  clipboard: false

# Customize the cover image
cover:
  default: /img/block.jpg
  type: img # img || date || random

# The previous and the next article
post_pagination: 
  enable: true 
  type: large # large || small

# img loading="lazy"
lazyload:
  enable: true

# Displays outdated notice for a post (文章过期提醒)
notice_outdate:
  enable: false
  style: flat # style: simple/flat
  limit_day: 365 # When will it be shown
  position: top # position: top/bottom
#### Article configuration end ###

# Page Visit Statistics
web_analytics:  
  enable: false 
  baidu:   # Baidu key
  google:  # Tracking ID for Google statistics
  tencent: # Tencent statistics
    sid:
    cid:

# comment
comment:
  bComments:
    enable: false
    env: # 腾讯云环境id
  twikoo:
    enable: false
    envId:   # 腾讯云环境id
  # region: # 环境地域，默认为 ap-shanghai，如果您的环境地域不是上海，需传此参数
  # option: # 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
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
      dark: transparent_dark

# Theme mode 
theme: 
  switch: true 
  default: style-light # style-light style-dark

# Service Worker
sw: false

# Post wordcount
# https://github.com/willin/hexo-wordcount
wordcount:
  enable: false
  count: true
  time: true

# That is it only render those page which has \`katex: true\` in Front-matter.
# math fomula
# https://katex.org/
katex:
  copy_tex: true
  global: false
  # Options are for katex rendering options: https://katex.org/docs/options.html
  # In page katex options are also possible and will be merged
  options: {}

# Blog search
search:
  enable: false
  type: engine #local engine
  href: 'https://www.google.com/search?q=site:'
  # href: "https://www.baidu.com/s?wd=site:"
  # href: "https://www.bing.com/search?q=site:"
  domain: 

# Think of swup as being pjax on steroids. The concepts are similar to those used in barba.js or other transition libraries.
# https://swup.js.org/
# Whether swup is enabled
swup: false

# Datetime formatting
datetime_foramt:
  post_card:
    type: date # date || updated
    date: YY/MM/DD
    time: HH:mm
    cover_date: DD
    cover_date2: YYYY/MM
  post_info:
    type: date
    date: MM/DD
    time: HH:mm
  archive:
    type: date
    date: MM/DD
    time: HH:mm

# Home page category card configuration
categorie_card:
  enable: true
  len: 2
  list:

# Lower right button
rightside:
  readmode: true
  aside: false

# Replace Broken Images 
error_img:
  flink: /img/friend_404.gif
  post_page: /img/404.jpg

# Code highlighting configuration
highlight:
  theme: true # 
  title: default # mac | default
  copy: true # copy button
  lang: true # show the code language
  code_word_wrap: fasle #
  height_limit: false # unit: px

# Customize the template path
layout:
  path: layout
  # layout
  main:  _partial/main
  header: _partial/header
  banner: _partial/banner
  sidebar: _partial/sidebar/index
  footer: _partial/footer
  # post
  post_info: _partial/post/post-info
  post_content: _partial/post/post-content
  reward: _partial/post/reward
  post_copyright: _partial/post/post-copyright
  post_next_prev: _partial/post/post-next-prev
  post_card: _partial/post/post-card
  post_card_mini: _partial/post/post-card-mini
  # widget
  header_logo: _widget/header-logo
  header_menu: _widget/header-menu
  header_theme: _widget/header-theme
  header_search: _widget/header-search
  categorie: _widget/categorie
  paginator: _widget/paginator
  fixed_btn: _widget/fixed-btn
  post_toc: _widget/post-toc
	about_card: _widget/about-card
	search: _widget/search
  sidebar_user: _partial/sidebar/card/user
  sidebar_social: _partial/sidebar/card/social
  sidebar_info: _partial/sidebar/card/info
  sidebar_email: _partial/sidebar/card/email
  # third-party
  comment: _third-party/comment/index
  analytics: _third-party/web-analytics
  # animation
  page_loading: _partial/preloader/page-preloader
  mode_change:  _partial/preloader/change-mode-preloader
  # page
  page_about: _partial/page/about
  page_archive: _partial/page/archive
  page_category: _partial/page/category
  page_index: _partial/page/index
  page_links: _partial/page/links
  page_post: _partial/page/post
  page_tag: _partial/page/tag
	# other
	script: _partial/script
	head: _partial/head

not_found: 
	path: /
	name: not_found.name
	text: not_found.text`;export{n as c};
