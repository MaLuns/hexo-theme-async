# 使用指南

本主题为 Hexo 主题，请确保您已了解 Hexo 的基本使用方式。更多信息请参见 [Hexo 官网](https://hexo.io/)。

有任何关于本主题的缺陷报告与功能建议，可以发起 [Issues](https://github.com/MaLuns/hexo-theme-async/issues)。

如果您有其他相关的想法与问题，可前往 [Discussions](https://github.com/MaLuns/hexo-theme-async/discussions)。

<!-- 也可前往 [QQ 群](https://jq.qq.com/?_wv=1027&k=0hEe5D0U)，进行反馈。 -->

::: danger 提醒

-   安装问题

本插件为 Hexo 主题插件，如果您想使用这款主题模板，请确保您对 Hexo 有一些基本了解。关于 Hexo 初始化不成功、Npm 安装失败等问题，一般与主题无关，请检查自己网络环境，合理利用搜索引擎解决。

-   配置问题

**本文档已经覆盖了，本主题使用的 99% 配置**。遇到问题时，**请优先翻阅文档**，参考文档里的说明。如果使用中发现文档中有解释存在歧义地方，可以通过上面多种渠道进行反馈，也可以提交 PR 进行完善。
:::

开始前，请确保您的 Hexo 初始化工作已经准备完成，请参考 [Hexo 安装](https://hexo.io/zh-cn/docs/)。本主题依赖于 **Node 14.x** 以上版本，请注意您本地 **Node** 环境。

## 快速开始 Get started

::: warning 渲染器
如果您没有 `ejs` 与 `less` 的渲染器，请先安装：
[hexo-renderer-ejs](https://github.com/hexojs/hexo-renderer-ejs) 和 [hexo-renderer-less](https://github.com/hexojs/hexo-renderer-less)。
:::

```bash
npm install --save hexo-renderer-less hexo-renderer-ejs
```

或者

```bash
yarn add -D hexo-renderer-less hexo-renderer-ejs
```

## 安装主题 Install

-   通过 npm 安装 （推荐）

![npm (tag)](https://img.shields.io/npm/v/hexo-theme-async/latest?color=red&label=hexo-theme-async%40latest&logo=npm&style=for-the-badge)

进入您的 Hexo 博客根目录，执行：

```bash
npm i hexo-theme-async@latest
```

-   通过克隆本仓库安装（不推荐）

::: danger
不推荐直接使用这种方式安装，会导致 bug 版本定位和后续升级比较麻烦。如果您需要自定义样式和页面模块，可以优先使用 [自定义样式](./config.html#自定义样式-style) 和 [自定义模板](./config.html#自定义模板-layout) 配置来个性话您的博客，如果以上方式无法满足您的需求时，且不在需要升级时可选择通过这种方式安装。
:::

::: details v2.0.0 后版本
从 v2.0.0 开始不在支持拉取后直接使用。新版本的脚本使用 TypeScript 进行重构，项目中不在提供打包压缩后的脚本。

如果您只想修改模板，您可以前往 [Github Releases](https://github.com/MaLuns/hexo-theme-async/releases) 的 Assets 下载打包文件 `hexo-theme-async` 。

如果您仍然想要使用该方式，请 clone 项目后，手动执行 yarn && yarn run lib:build 以构建压缩后的脚本。
:::

::: details v1.1.0 至 v2.0.0 版本

从 v1.1.0 后，由于项目结构调整，不再需要整个仓库文件了。clone 项目后，只需要将 `packages/hexo-theme-async` 复制到 `themes/async` 目录下即可。

您的项目结构应该是这样

```txt {4,7}
┌── blog
│   ├── source
│   └── themes
│       ├── async // 克隆到此处
│
│   ├── _config.yml
│   ├── _config.async.yml // 增加配置文件
```

:::

-   通过 npm 安装预览版

![npm (tag)](https://img.shields.io/npm/v/hexo-theme-async/beta?color=red&label=hexo-theme-async%40beta&logo=npm&style=for-the-badge)

进入您的 Hexo 博客根目录，执行：

```bash
npm i hexo-theme-async@beta
```

::: warning
预览版本仅在主版本更新时使用，预览版还处于功能开发和 bug 修复阶段。如果您想提前尝试新功能，可以安装它，顺便能帮忙找找 Bug 🤣
:::

## 启用主题 Use

修改 Hexo 站点配置文件 `_config.yml`。

```yaml
# 将主题设置为 hexo-theme-async
theme: async
```

## 配置主题 Config

在 Hexo 工作目录下新建 `_config.async.yml`（ Hexo 5.0.0 + 起提供），您仅需在 `_config.async.yml` 中自定义您想要覆盖的配置，其余将自动与主题默认配置合并。

如果您是通过克隆代码到本地方式安装主题，也优先推荐使用这种方式，而不是去修的主题目录下的 `_config.yml` 文件。（这样做也更方便日后的升级）

::: tip

如：

主题模式的完整配置如下

```yaml
theme:
    switch: true
    default: style-light # style-light style-dark
```

您可以在 `_config.async.yml` 中仅定义（当然，全部覆盖也是可以的）需要覆盖配置

```yaml
theme:
    default: style-dark
```

:::

更多主题配置 [请看这里](./config)

## 安装演示视频 Demo Video

-   安装
    -   [npm 安装演示](https://www.bilibili.com/video/BV1Cs4y1J7vv/)
    -   [下载到 themes 目录演示](https://www.bilibili.com/video/BV1mg4y137Zi/)
-   配置
    -   [常用配置演示](https://www.bilibili.com/video/BV1cm4y1z7tQ/)
    -   [主题自定义图标、自定义代码高亮演示](https://www.bilibili.com/video/BV1Da4y1M7UF/)
    -   [随机封面、友链页、相册页面配置演示](https://www.bilibili.com/video/BV1cs4y1m7RT/)
-   运行源码
    -   [hexo-theme-async 源码运行演示](https://www.bilibili.com/video/BV19L41127LH/)
-   在线体验
    -   [stackblitz](https://stackblitz.com/edit/node-tshsxq?embed=1&file=README.md)

安装示例视频，更多视频前往[这里](https://space.bilibili.com/12763040/channel/seriesdetail?sid=3170241)

<iframe src="//player.bilibili.com/player.html?aid=951750989&bvid=BV1Cs4y1J7vv&cid=1077514563&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="500"> </iframe>
