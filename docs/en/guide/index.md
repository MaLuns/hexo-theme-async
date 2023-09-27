# Usage guide

This is a Hexo theme. so make sure you understand the basic uses of Hexo. For more information, see [Hexo's website](https://hexo.io/).

If you have any bug reports or feature suggestions on this theme, you can initiate [Issues](https://github.com/MaLuns/hexo-theme-async/issues).

If you have other related ideas and questions, head over to [Discussions](https://github.com/MaLuns/hexo-theme-async/discussions).

## Get started

::: warning renderer
If you don't have renderers for ejs and less, install [hexo-renderer-ejs](https://github.com/hexojs/hexo-renderer-ejs) and [hexo-renderer-less](https://github.com/hexojs/hexo-renderer-less) first.
:::

```bash
npm install --save hexo-renderer-less hexo-renderer-ejs
```

or

```bash
yarn add -D hexo-renderer-less hexo-renderer-ejs
```

## Install

- npm install (recommended)

![npm (tag)](https://img.shields.io/npm/v/hexo-theme-async/latest?color=red&label=hexo-theme-async%40latest&logo=npm&style=for-the-badge)

Go to your Hexo blog root and do:

```bash
npm i hexo-theme-async@latest
```

- Install through Clone repository (not recommended)

::: danger
It is not recommended to install the theme in this way. The theme version number will not be displayed by pulling the theme version (you can also manually complete the version of package.json), which will cause trouble in locating the bug version and subsequent upgrade. Install this way only if you need to modify the source files and no longer need to upgrade.
:::

::: details v2.0.0 or later

From v2.0.0 onwards, it is not used directly after pulling is supported. New versions of scripts are refactored in TypeScript; packaged and compressed scripts are no longer provided in projects.

If you only want to modify templates, you can head to the Assets of [Github Releases](https://github.com/MaLuns/hexo-theme-async/releases) to download the hexo-theme-async package file.

If you still want to use this method, clone the project and manually run `yarn` && `yarn run lib:build` to build the compressed script.
:::

::: details v1.1.0 to v2.0.0

Since v1.1.0, the entire repository file is no longer required due to project restructuring. After the clone project, just copy `packages/hexo-theme-async` to the `themes/async` directory.

Your project structure should look like this

```txt {4,7}
┌── blog
│   ├── source
│   └── themes
│       ├── async // Clone here
│
│   ├── _config.yml
│   ├── _config.async.yml // Add a configuration file
```

:::

- Install the preview via npm

![npm (tag)](https://img.shields.io/npm/v/hexo-theme-async/beta?color=red&label=hexo-theme-async%40beta&logo=npm&style=for-the-badge)

Go to your Hexo blog root and do:

```bash
npm i hexo-theme-async@beta
```

::: warning
The preview version is only used when the major version is updated. The preview version is still in the feature development and bug fixing phase. If you want to try out the new feature early, you can install it and help find bugs 🤣
:::

## Use theme

Modify the Hexo site configuration file `_config.yml`.

```yaml
# Set the theme to hexo-theme-async
theme: async
```

## Config

By creating a new `_config.async.yml` (available from Hexo 5.0.0 +) in the Hexo working directory, you only need to customize the configuration you want to override in `_config.async.yml`, and the rest will be automatically merged with the theme default configuration.

If you are installing the theme by cloning the code locally, it is also recommended to do so, rather than fixing the `_config.yml` file in the theme directory. (It also makes it easier to upgrade later.)

::: tip

Such as:

The complete configuration of the theme schema is as follows

```yaml
theme:
  switch: true
  default: style-light # style-light style-dark
```

You can define only in `_config.async.yml` (of course, it is possible to override all of them).

```yaml
theme:
  default: style-dark
```

:::

See [here](./config) for more theme configurations

## Demo Video

- installation
  - [npm installation demo](https://www.bilibili.com/video/BV1Cs4y1J7vv/)
  - [download the themes catalog demo](https://www.bilibili.com/video/BV1mg4y137Zi/)
- configuration
  - [common configuration demonstrations](https://www.bilibili.com/video/BV1cm4y1z7tQ/)
  - [theme custom icons custom code highlighting demonstration](https://www.bilibili.com/video/BV1Da4y1M7UF/)
  - [random cover link page album page configuration demonstration](https://www.bilibili.com/video/BV1cs4y1m7RT/)
- run the source code
  - [hexo theme async source code runs the demo](https://www.bilibili.com/video/BV19L41127LH/)
- online experience
  - [stackblitz](https://stackblitz.com/edit/node-tshsxq?embed=1&file=README.md)