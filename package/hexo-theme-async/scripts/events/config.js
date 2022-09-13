const { merge } = require('../utils')

/**
 * 合并语言
 * @param {*} hexo
 * @param {*} languages
 */
const mergeLanguages = (hexo, languages) => {
    const { language } = hexo.config
    const { i18n } = hexo.theme

    const mergeLang = (lang) => {
        i18n.set(lang, merge(i18n.get([lang]), languages[lang]))
    }

    if (Array.isArray(language)) {
        for (const lang of language)
            mergeLang(lang)
    }
    else {
        mergeLang(language)
    }
}

/**
 * 合并友联
 * @param {*} hexo 
 * @param {*} links 
 */
const mergeLinks = (hexo, links) => {
    if (Array.isArray(hexo.theme.config.links))
        hexo.theme.config.links.concat(links)
    else
        hexo.theme.config.links = links

}

module.exports = function (hexo) {
    const data = hexo.locals.get('data')

    // merge languages
    if (data.languages)
        mergeLanguages(hexo, data.languages)

    // merge links
    if (data.links && Array.isArray(data.links))
        mergeLinks(hexo, data.links)
}