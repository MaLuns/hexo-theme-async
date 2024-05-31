export default {
	extends: ["@commitlint/config-conventional"],
	parserPreset: {
		parserOpts: {
			headerPattern:
			/^(?::\w*:|(?:\u{1F900}-\u{1F9FF})|(?:\ud83c[\udf00-\udfff])|(?:\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u27BF]|[\u1F000-\u1F6FF]|[\u1F1E0-\u1F1FF]|[\u1F200-\u1F2FF]|[\u1F300-\u1F5FF]|[\u1F680-\u1F6FF]|[\u1F700-\u1F77F]|[\u1F800-\u1F8FF]|[\u1F900-\u1F9FF]|[\u1FA00-\u1FA6F]|[\u{2600}-\u{27BF}]|[\u{1F000}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}])\s(?<type>\w*)(?:\((?<scope>.*)\))?!?:\s(?<subject>(?:(?!#).)*(?:(?!\s).))(?:\s\(?(?<ticket>#\d*)\)?)?$/u,
			headerCorrespondence: ["type", "scope", "subject", "ticket"],
		},
	},
	rules: {
		"type-case": [2, "always", "lower-case"],
		"type-empty": [2, "never"],
		"type-enum": [
			2,
			"always",
			[
				"feat", // 增加新功能
				"fix", // 修复 bug
				"update", // 更新功能
				"docs", // 文档相关的改动
				"style", // 仅仅主题样式变动
				"format", // 代码格式化, 仅仅改版代码风格, 比如空格缩进等待
				"refactor", // 代码重构, 没有新增功能或修复bug
				"perf", // 代码优化, 比如提升性能或体验
				"revert", // 撤销，版本回退
				"test", // 添加或修改测试
				"build", // 构造工具或者相关依赖的改动
				"chore", // 改版构建流程或者增加新的依赖或工具
				"ci", // CI 配置，脚本文件等改动
			],
		],
		"subject-case": [0],
	},
};
