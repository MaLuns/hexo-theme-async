/* eslint-disable no-undef */
(() => {
	// eslint-disable-next-line no-undef
	console.log(
		`%c 📌 添加自定义脚本 %c 这里啥也没有，测试自定义脚本执行`,
		'color: white; background: #0078E7; padding:5px 0;margin: 0 0 2px 0;border-radius: 4px 0 0 4px;',
		'padding: 4px;border:1px solid #0078E7;border-radius: 0 4px 4px 0; background: linear-gradient(70deg, #e3f9eb, #d1dbff);',
	);

	danMu(() =>
		[
			'举杯邀明月，对影成三人',
			'会当凌绝顶，一览众山小',
			'云想衣裳花想容，春风拂槛露华浓',
			'二十四桥明月夜，玉人何处教吹箫？',
			'月落乌啼霜满天，江枫渔火对愁眠。',
			'两岸猿声啼不住，轻舟已过万重山。',
			'泠泠七弦上，静听松风寒。',
			'举杯邀明月，对影成三人',
			'会当凌绝顶，一览众山小',
			'云想衣裳花想容，春风拂槛露华浓',
			'二十四桥明月夜，玉人何处教吹箫？',
			'月落乌啼霜满天，江枫渔火对愁眠。',
			'两岸猿声啼不住，轻舟已过万重山。',
			'泠泠七弦上，静听松风寒。',
		].map((text, id) => ({ id, text, avatar: '/demosite/img/avatar.jpg' })),
	);
})();
