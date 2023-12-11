const { merge } = require('../utils');
const Layout = require('./layout');

/**
 * 合并语言
 * @param {*} hexo
 * @param {*} languages
 */
const mergeLanguages = (hexo, languages) => {
	const { language } = hexo.config;
	const { i18n } = hexo.theme;

	const mergeLang = lang => {
		i18n.set(lang, merge(i18n.get([lang]), languages[lang]));
	};

	if (Array.isArray(language)) {
		for (const lang of language) mergeLang(lang);
	} else {
		mergeLang(language);
	}
};

/**
 * 合并数据
 * @param {*} hexo
 * @param {*} datas
 * @param {*} key
 */
const mergeDatas = (hexo, datas, key) => {
	if (Array.isArray(hexo.theme.config[key])) hexo.theme.config[key].concat(datas);
	else hexo.theme.config[key] = datas;
};

/**
 * 处理 Less 配置
 * @param {*} hexo
 */
const processLess = hexo => {
	const {
		theme,
		config: { highlight, prismjs },
	} = hexo;

	const less = merge(theme.config.less || {}, {
		options: {
			globalVars: {
				commentType: 'none',
				isSearch: false,
				isReadmode: false,
				isAside: false,
				isReward: false,
				highlightEnable: false,
				highlightLineNumber: false,
				prismjsEnable: false,
				prismjsLineNumber: false,
				highlightTheme: true,
				highlightTitleStyle: 'default',
				highlightHeightLimit: false,
				noticeOutdateStyle: 'none',
				highlightCodeWordWrap: false,
			},
		},
	});

	// 评论插件
	const comment = theme.config.comment;
	for (const key in comment) {
		if (Object.hasOwnProperty.call(comment, key)) {
			const c = comment[key];
			if (c.enable) {
				less.options.globalVars.commentType = key;
			}
		}
	}

	// 本地查询插件
	if (theme.config.search && theme.config.search.enable) less.options.globalVars.isSearch = true;

	// 阅读模式
	if (theme.config.rightside) {
		if (theme.config.rightside.readmode) less.options.globalVars.isReadmode = true;
		if (theme.config.rightside.aside) less.options.globalVars.isAside = true;
	}

	// 打赏
	if (theme.config.reward.enable) less.options.globalVars.isReward = true;

	// 代码高亮
	less.options.globalVars.highlightEnable = (highlight && highlight.enable) || hexo.config.syntax_highlighter == 'highlight.js';
	less.options.globalVars.highlightLineNumber = highlight && highlight.line_number;
	less.options.globalVars.prismjsEnable = (prismjs && prismjs.enable) || hexo.config.syntax_highlighter == 'prismjs';
	less.options.globalVars.prismjsLineNumber = prismjs && prismjs.line_number;
	less.options.globalVars.highlightTheme = theme.config.highlight.theme;
	less.options.globalVars.highlightTitleStyle = theme.config.highlight.title;
	less.options.globalVars.highlightHeightLimit = theme.config.highlight.height_limit;
	less.options.globalVars.highlightCodeWordWrap = theme.config.highlight.code_word_wrap;

	// 过期提醒
	less.options.globalVars.noticeOutdateStyle = theme.config.notice_outdate.style;

	theme.config.less = less;
};

/**
 * 注入模板
 * @param {*} hexo
 */
const processLayout = hexo => Layout(hexo);

module.exports = function (hexo) {
	const data = hexo.locals.get('data');

	// Load template
	processLayout(hexo);

	// merge languages
	if (data.languages) mergeLanguages(hexo, data.languages);

	// merge links
	if (data.links && Array.isArray(data.links)) mergeDatas(hexo, data.links, 'links');

	// merge projects
	if (data.projects && Array.isArray(data.projects)) mergeDatas(hexo, data.projects, 'projects');

	// merge less
	processLess(hexo);
};
