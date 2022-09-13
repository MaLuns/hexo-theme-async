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
 * 合并数据
 * @param {*} hexo 
 * @param {*} datas 
 * @param {*} key 
 */
const mergeDatas = (hexo, datas, key) => {
    if (Array.isArray(hexo.theme.config[key]))
        hexo.theme.config[key].concat(datas)
    else
        hexo.theme.config[key] = datas
}

module.exports = function (hexo) {
    const data = hexo.locals.get('data')

    // merge languages
    if (data.languages)
        mergeLanguages(hexo, data.languages)

    // merge links
    if (data.links && Array.isArray(data.links))
        mergeDatas(hexo, data.links, 'links')

    // merge projects
    if (data.projects && Array.isArray(data.projects))
        mergeDatas(hexo, data.projects, 'projects')
}