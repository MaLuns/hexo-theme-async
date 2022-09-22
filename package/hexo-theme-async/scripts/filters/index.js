hexo.extend.filter.register('after_post_render', (data) => {
    // img lazyload
    if (hexo.theme.config.lazyload && hexo.theme.config.lazyload.enable) {
        data.content = data.content.replace(/<img(.+?)(\/{0,1})>/gi, (str, p1) => {
            return str.replace(p1, `${p1} loading="lazy"`)
        })
    }
    return data
})