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
  🇨🇳 中文简体  |  
  <a title="English" href="README.md">🇬🇧 English</a>
</p>

<p align="center">
  <img width="80%" src="https://s1.328888.xyz/2022/04/25/8dRAS.png" alt="8dRAS.png" border="0" />
</p>

## 安装
### 克隆本仓库到 themes 目录下
``` bash
# 安装 less、ejs、wordcount等插件
cd hexo
npm install --save hexo-renderer-less hexo-renderer-ejs hexo-wordcount
cd themes
git clone https://gitee.com/ml13/hexo-theme-async.git
```
然后在 theme 中 \_config.yml 中更改设置。

### 使用 npm 安装
``` bash
# 安装 hexo-theme-async、less、ejs、wordcount等插件
cd hexo
npm install --save hexo-theme-async hexo-renderer-less hexo-renderer-ejs hexo-wordcount
```
您可以覆盖 theme._config.yml 中配置，可以参考 [Hexo Docs](https://hexo.io/zh-cn/docs/configuration#%E4%BD%BF%E7%94%A8%E4%BB%A3%E6%9B%BF%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)

## 演示

您可以在我的 [个人博客](https://www.imalun.com) 查看演示。

## 配置

``` yml
# 站点信息
user:
  name: 博主名称
  first_name: 姓 # 用于顶部导航使用
  last_name: 名
  logo: 站点loog # 用于顶部导航显示
  email: 邮箱
  domain: 域名 # 用于友链页面
  avatar: 头像
  describe: 描述
  ruleText: 友链交换规则
  birthDay: 站点运行起始时间 # 用于底部计算时长
  copyrightYear: 2022

# logo
favicon:
  icon16: 网站 favicon 
  icon32: 网站 favicon
  appleTouchIcon: Apple touch icon
  webmanifest: Web App Manifest
  visibilitychange: false
  hidden: The logo link
  show_text: (/≧▽≦/)Yi! Good again!
  hide_text: (●—●)Oh, it's falling apart!

# 顶部菜单
top_bars:
  - title: home
    url: /
    # children # 添加二级菜单
    # noswup # 打开新的窗口
  - title: archives
    url: /archives/
  - title: links
    url: /links/
  - title: about
    url: /about/

# 页面顶部横幅
banner:
  # 首页
  index:
    type: img # 横幅类型
    bgurl:  # 背景图地址，如果 type 是 slideshow，需要为数组
    bannerTitle:  # 横幅上标题
    bannerText: Hi my new friend! # 横幅描述
    videoUrl: 
  # 归档页
  archive: 
    type: img
    bgurl: 
    bannerTitle: 
    bannerText: The article archive
  # 友链页
  links: 
    type: img
    bgurl: 
    bannerTitle: 
    bannerText: A link to a friend's website
  # 关于页
  about: 
    type: img
    bgurl: 
    bannerTitle: 
    bannerText: About me

# 侧栏
sidebar:
  typedTextPrefix: I`m           # 打字机效果前缀
  typedText: [ 'Web Developer' ] # 打字机文字，需要为数组
  info: # 个人信息 
    - key: sidebar.residence # 标题
      val: residence         # 内容
    - key: sidebar.city
      val: city
    - key: sidebar.age
      val: age
  social:  # 社交地址
    - icon: fab fa-github      # 图标 以内置 Font-Awesome Brand 图标
      url: https://github.com  # 地址
    - icon: iconfont cg-gitee
      url: https://gitee.com
    - icon: iconfont cg-weibo
      url: https://weibo.com/

# 个人页  如果 about/index.md 有内容则优先使用自定义内容，否则使用配置项内容
about:
  title:        # 标题
  introduction: # 个人简单描述
  blog:         # 博客信息
  privacy:      # 隐私权说明    

# 友链
links:
  - name: 白云苍狗 # 名称
    url: //www.imalun.com/ # 地址
    image: //www.imalun.com/images/avatar.jpg # 头像
    desc: 醒，亦在人间；梦，亦在人间 # 描述

# 网页访问统计
webAnalytics:  
  enable: false # 默认为false，启用网页统计改为true
  baidu:   # 百度统计的Key
  google:  # Google统计的Tracking ID
  tencent: # 腾讯统计的H5 App id
    sid:
    cid:

# 评论插件
comment:
  enable: false
  bComments:
    v: 0.0.12
    env: 
  twikoo:
    envId:
    region: 
    path: window.location.pathname

# 主题配置 
theme: 
  switch: true  # 是否可以切换，false 页面将不会显示切换按钮
  default: style-light # 设置默认主题模式，可选 style-light style-dark

# 开启 Service Worker
sw: false
```

## 常见问题

**友链页、关于页为啥没有，如何添加？**

友链页、关于页属于自定义页面，需要自己手动添加，可以通过下面命令添加页面。
```bash
hexo new page links
hexo new page about
```
然后会在博客目录下的 /source 新增出现 links 文件夹和 about 文件夹，
然后每个文件夹里会有一个 index.md 文件，打开并对应补充布局，使模板生效
```
layout: links
layout: about
```

**文章封面图怎么添加？**

在文章的 Front-matter 添加 photos 字段。
```
---
title: Hello World
photos: [图片路径]
---
```

## 参与贡献
非常欢迎你的贡献，你可以通过以下方式一起共建 :smiley:：

- 遇到 Bug 通过提交 [Issue](https://github.com/MaLuns/hexo-theme-async/issues) 报告。
- 有建议和疑问欢迎前往 [Discussions](https://github.com/MaLuns/hexo-theme-async/discussions) 讨论。
- 提交 Pull Request 改进 hexo-theme-async 的代码。
