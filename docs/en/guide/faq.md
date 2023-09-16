# FAQ

::: tip

-   <Badge text="dev" vertical="middle"/> stands for development only. The default example site uses the dev branch, so unreleased features may appear.

:::

If you have any bug reports or feature suggestions on this theme, you can initiate [Issues](https://github.com/MaLuns/hexo-theme-async/issues).

If you have other related ideas and questions, head over to [Discussions](https://github.com/MaLuns/hexo-theme-async/discussions).

## Self-examine common problem solutions

Check if the file or warehouse name is right.

Check if the url under `_config.yml` in the `Hexo` working directory is set correctly. (This part is automatically generated when Hexo is initialized)

```yaml
# If your site is put in a subdirectory
# set url as 'https://yoursite.com/child' and root as '/child/'
url: https://www.imalun.com
root: /
```

Check whether the theme configurations are done in the `_config.async.yml` file and has been saved. Check whether the following steps have been performed:

-   `hexo clean`:clear the local cache
-   `hexo g`:generate a new static file
-   `hexo s`:local viewing effect (if normal, use `hexo d` to redeploy)

Check whether the local browser cache is forcibly refreshed (Windows: Ctrl + F5, Mac: Shift + Cmd + R).

Check whether it is the latest version.

Please open an [ISSUE](https://github.com/MaLuns/hexo-theme-async/issues) for questions related to the theme and use [Discussions](https://github.com/MaLuns/hexo-theme-async/discussions) for other discussions and presentations.

## Does the configuration item not take effect?

Check the version of the installation theme, and then check the update log for changes. Refer to the configuration instructions in the documentation to ensure that the configuration is correct.

## The About page is not displayed?

Check for conflicts with other plugins, resolve them, and write your About page in the md file instead of using the configuration.
