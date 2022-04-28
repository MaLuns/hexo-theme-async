<h1 align="center">hexo-theme-async</h1>

<p align="center">
  <a title="Github Version" target="_blank" href="https://github.com/MaLuns/hexo-theme-async">
    <img src="https://img.shields.io/github/package-json/v/MaLuns/hexo-theme-async/master?color=%231ab1ad&amp;label=master" alt="master version">
  </a>
  <a title="Npm Version" target="_blank" href="https://www.npmjs.com/package/hexo-theme-async">
    <img src="https://img.shields.io/npm/v/hexo-theme-async?color=%09%23bf00ff" alt="https://img.shields.io/npm/v/hexo-theme-async?color=%09%23bf00ff">
  </a>
  <a title="Hexo Version" target="_blank" href="https://hexo.io/zh-cn/">
    <img src="https://img.shields.io/badge/hexo-5.0+-0e83c" alt="hexo version">
  </a>
  <a title="license" target="_blank" href="https://github.com/MaLuns/hexo-theme-async/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/MaLuns/hexo-theme-async?color=FF5531" alt="license">
  </a>
</p>

<p align="center">
  🇬🇧 English | 
  <a title="Chinese" href="README_zh-CN.md"> 🇨🇳 中文简体 </a> 
</p>

<p align="center">
  <img width="80%" src="https://s1.328888.xyz/2022/04/25/8dRAS.png" alt="8dRAS.png" border="0" />
</p>

## Installation

``` bash
cd hexo
npm install --save hexo-renderer-less hexo-renderer-ejs hexo-wordcount
cd themes
git clone https://github.com/MaLuns/hexo-theme-async.git
```
Then change your setting in .theme_config.yml.



You can also use the NPM package.

``` bash
cd hexo
npm install --save hexo-theme-async hexo-renderer-less hexo-renderer-ejs hexo-wordcount
```

You can override the theme._config.yml configuration in _config.yml.

## Demo
You can review demo at my [personal blog](https://www.imalun.com) in chinese.

## Config
``` yml
# user
user:
  name: ThemeAsync
  first_name: Theme
  last_name: Async
  logo: The logo link
  email: Your email
  domain: Your domain name
  avatar: Your avatar
  describe: A short description
  ruleText: Your friend chain rules
  birthDay: 04/10/2022 17:00:00 
  copyrightYear: 2022

# logo
favicon:
  icon16: favicon 
  icon32: favicon
  appleTouchIcon: Apple touch icon
  webmanifest: Web App Manifest
  visibilitychange: false
  hidden: The logo link
  show_text: (/≧▽≦/)Yi! Good again!
  hide_text: (●—●)Oh, it's falling apart!

# menu
top_bars:
    - title: home
      url: /
    - title: archives
      url: /archives/
    - title: links
      url: /links/
    - title: about
      url: /about/

# page banner 
banner:
  index:
    type: img
    bgurl: 
    bannerTitle: 
    bannerText: Hi my new friend!
    videoUrl: 
  archive:
    type: img
    bgurl: 
    bannerTitle: 
    bannerText: The article archive
  links:
    type: img
    bgurl: 
    bannerTitle: 
    bannerText: A link to a friend's website
  about:
    type: img
    bgurl: 
    bannerTitle: 
    bannerText: About me

# sidebar
sidebar:
  typedTextPrefix: I`m
  typedText: [ 'Web Developer' ]
  info: 
    - key: sidebar.residence
      val: residence
    - key: sidebar.city
      val: city
    - key: sidebar.age
      val: age
  social:
    - icon: fab fa-github
      url: https://github.com
    - icon: iconfont cg-gitee
      url: https://gitee.com
    - icon: iconfont cg-weibo
      url: https://weibo.com/

# about page
about:
  title: 
  introduction: 
  blog: 
  privacy: 

# Friend's website
links:
  - name:  # site name
    url:   # site url
    image: # avatar
    desc: 

# Page Visit Statistics
webAnalytics:  
  enable: false 
  baidu:   # Baidu key
  google:  # Tracking ID for Google statistics
  tencent: # Tencent statistics
    sid:
    cid:

# Comment on the plug-in
comment:
  enable: false
  bComments:
    v: 0.0.12
    env: 
  twikoo:
    envId:
    region: 
    path: window.location.pathname

# Service Worker
sw: false
```

## Contribute
Your contribution is very welcome. You can build it together in the following ways :smiley:

- Use Issue to report bugs or consult.
- Submit Pull Request to improve hexo-theme-async code.