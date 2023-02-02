# 使用指南
本主题为 Hexo 主题，请确保您已了解 Hexo 的基本使用方式。更多信息请参见 [Hexo 官网](https://hexo.io/)。

有任何关于本主题的缺陷报告与功能建议，可以发起 [Issues](https://github.com/MaLuns/hexo-theme-async/issues)。

如果您有其他相关的想法与问题，可前往 [Discussions](https://github.com/MaLuns/hexo-theme-async/discussions)。

也可前往 [QQ 群](https://jq.qq.com/?_wv=1027&k=0hEe5D0U)，进行反馈。

## 快速开始 Get started

::: warning 渲染器
如果您没有 `ejs` 与 `less` 的渲染器，请先安装：
[hexo-renderer-ejs](https://github.com/hexojs/hexo-renderer-ejs) 和 [hexo-renderer-less](https://github.com/hexojs/hexo-renderer-less)。
::: 

``` bash
npm install --save hexo-renderer-less hexo-renderer-ejs
```
或者
``` bash
yarn add -D hexo-renderer-less hexo-renderer-ejs
```

## 安装主题 Install

- 通过 npm 安装 （推荐）

![npm (tag)](https://img.shields.io/npm/v/hexo-theme-async/latest?color=red&label=hexo-theme-async%40latest&logo=npm&style=for-the-badge)

进入您的 Hexo 博客根目录，执行：

```bash
npm i hexo-theme-async@latest
```

- 通过克隆本仓库安装（不推荐）

::: danger
不推荐直接使用这种方式安装，直接拉取不会显示主题版本号（你也可以手动补齐 package.json 的 version），会导致 bug 版本定位和后续升级比较麻烦。只有当你需要修改源码文件，且不在需要升级时才可通过这种方式安装。
::: 

::: details v2.0.0 后版本
从 v2.0.0 开始不在支持拉取后直接使用。新版本的脚本使用 TypeScript 进行重构，项目中不在提供打包压缩后的脚本。

如果您只想修改模板，您可以前往 [Github Releases](https://github.com/MaLuns/hexo-theme-async/releases) 的 Assets 下载打包文件 `hexo-theme-async` 。

如果您仍然想要使用该方式，请 clone 项目后，手动执行 yarn && yarn run lib:build 以构建压缩后的脚本。
::: 

::: details v1.1.0 至 v2.0.0 版本

从 v1.1.0 后，由于项目结构调整，不再需要整个仓库文件了。clone 项目后，只需要将 `package/hexo-theme-async` 复制到 `themes/async` 目录下即可。

您的项目结构应该是这样
```text {4,7}
┌── blog                     
│   ├── source
│   └── themes
│       ├── async // 克隆到此处
│   
│   ├── _config.yml
│   ├── _config.async.yml // 增加配置文件
```
:::

-  通过 npm 安装预览版

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

你可以在 `_config.async.yml` 中仅定义（当然，全部覆盖也是可以的）

```yaml
theme: 
  default: style-dark
```
:::

更多主题配置 [请看这里](./config)