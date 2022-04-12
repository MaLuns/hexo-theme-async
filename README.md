
# hexo-theme-async

![master version](https://img.shields.io/github/package-json/v/MaLuns/hexo-theme-async/master?color=%231ab1ad&label=master)
![https://img.shields.io/npm/v/hexo-theme-async?color=%09%23bf00ff](https://img.shields.io/npm/v/hexo-theme-async?color=%09%23bf00ff)
![hexo version](https://img.shields.io/badge/hexo-5.0+-0e83c)
![license](https://img.shields.io/github/license/MaLuns/hexo-theme-async?color=FF5531)

## Installation

``` bash
cd hexo
npm install --save hexo-renderer-less hexo-renderer-ejs
cd themes
git clone git@github.com:MaLuns/hexo-theme-async.git
```
Then change your setting in .theme_config.yml.



You can also use the NPM package.

``` bash
cd hexo
npm install --save hexo-theme-async
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

# logo
favicon:
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

# Service Worker
sw: false
```
