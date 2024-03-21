/**
 * 弹幕滚动
 */
class DanMuKu {
	box = null; // 弹幕容器
	boxSize = {
		width: 0, // 容器宽度
		height: 0, // 容器高度
	};

	rows = 0; // 行数
	dataList: Array<Array<DanMuData>> = []; // 弹幕数据 二维数组
	indexs: number[] = []; // 最新弹幕下标
	idMap = {}; // 记录已出现 id

	avatar = false; // 是否显示头像
	speed = 20; // 弹幕每秒滚动距离
	height = 36; // 弹幕高度
	gapWidth = 20; // 弹幕前后间隔
	gapHeight = 20; // 弹幕上下间隔
	delayRange = 5000; // 延时范围
	align = 'center'; // 轨道纵轴对齐方式

	animates = new Map(); // 动画执行元素
	stageAnimates = new Map();
	timeouts = new Map();

	constructor(options: DanMuOptions) {
		this.update(options);
	}

	/**
	 * 计算区域比
	 */
	_divisor(mode: DanMuMode) {
		let divisor = 0.5;
		switch (mode) {
			case 'half':
				divisor = 0.5;
				break;
			case 'top':
				divisor = 1 / 3;
				break;
			case 'full':
				divisor = 1;
				break;
			default:
				break;
		}
		return divisor;
	}

	/**
	 * 初始化生成弹道
	 */
	_initBarrageList() {
		if (!this.box.querySelector(`.barrage-list`)) {
			const barrage = document.createElement('div');
			barrage.className = 'barrage-list';
			barrage.setAttribute('style', `gap:${this.gapHeight}px;justify-content: ${this.align};display: flex;height: 100%;flex-direction: column;overflow: hidden;`);

			for (let i = 0; i < this.rows; i++) {
				const item = document.createElement('div');
				item.className = `barrage-list-${i}`;
				item.setAttribute('style', `height:${this.height}px;position:relative;`);
				barrage.appendChild(item);
				this.dataList[i] = [];
			}
			this.box.appendChild(barrage);
		}
	}

	_pushOne(data: DanMuData) {
		const lens = this.dataList.map(item => item.length);
		const min = Math.min(...lens);
		const index = lens.findIndex(i => i === min);
		this.dataList[index].push(data);
	}

	_pushList(data: DanMuData[]) {
		const list = this._sliceRowList(this.rows, data);
		list.forEach((item, index) => {
			if (this.dataList[index]) {
				this.dataList[index] = this.dataList[index].concat(...item);
			} else {
				this.dataList[index] = item;
			}
		});
	}

	_sliceRowList(rows: number, list: DanMuData[]) {
		const sliceList = [];
		const perNum = Math.round(list.length / rows);
		for (let i = 0; i < rows; i++) {
			let arr = [];
			if (i === rows - 1) {
				arr = list.slice(i * perNum);
			} else {
				i === 0 ? (arr = list.slice(0, perNum)) : (arr = list.slice(i * perNum, (i + 1) * perNum));
			}
			sliceList.push(arr);
		}
		return sliceList;
	}

	/**
	 * 创建弹幕，并执行动画
	 * @param {*} item 弹幕数据
	 * @param {*} barrageIndex 弹幕轨道下标
	 * @param {*} dataIndex 弹幕数据下标
	 * @returns
	 */
	_dispatchItem(item: DanMuData, barrageIndex: number, dataIndex: number) {
		if (!item || this.idMap[item.id]) {
			return;
		}

		this.idMap[item.id] = item.id;

		const parent = this.box.querySelector(`.barrage-list-${barrageIndex}`);
		let danmuEl = document.createElement('div');
		danmuEl.className = 'danmu-item';
		danmuEl.setAttribute(
			'style',
			` height:${this.height}px; padding: ${
				this.avatar ? `4px 8px 4px 4px` : '4px 8px'
			}; display:inline-flex; position: absolute; right: 0; background-color: var(--trm-danmu-bg-color,#fff); color: var(--trm-danmu-color,#000); border-radius: 32px; align-items: center; transform: translateX(100%);`,
		);
		danmuEl.innerHTML = `
					${this.avatar ? `<img class="danmu-avatar" style="display: inline-block;width:${this.height - 8}px;height:${this.height - 8}px;border-radius:50%;margin-right:6px;" src="${item.avatar}">` : ''}
					<div class="danmu-text" style="text-wrap:nowrap;overflow:hidden;text-overflow:ellipsis;">${item.text}</div>`;
		parent.appendChild(danmuEl);

		const { width } = danmuEl.getBoundingClientRect();
		danmuEl.style.width = `${width}px`;

		// 计算动画所需时间
		const allTime = ((this.boxSize.width + width) / this.speed) * 1000;
		const pastTime = ((width + this.gapWidth) / (this.boxSize.width + width)) * allTime;

		if (dataIndex < this.dataList[barrageIndex].length) {
			const animate = danmuEl.animate({ transform: ['translateX(100%)', `translateX(-${this.gapWidth}px)`] }, { duration: pastTime });

			animate.onfinish = () => {
				this.stageAnimates.delete(animate);
				this.indexs[barrageIndex] = dataIndex + 1;
				this._dispatchItem(this.dataList[barrageIndex][dataIndex + 1], barrageIndex, dataIndex + 1);
			};

			this.stageAnimates.set(animate, animate);
		}

		const animate = danmuEl.animate({ transform: ['translateX(100%)', `translateX(-${this.boxSize.width}px)`] }, { duration: allTime, fill: 'forwards' });

		animate.onfinish = () => {
			this.animates.delete(animate);
			danmuEl.remove();
			danmuEl = null;
		};

		this.animates.set(animate, animate);
	}

	/**
	 * 开始滚动弹幕
	 */
	_run() {
		const len = this.dataList.length;
		for (let barrageIndex = 0; barrageIndex < len; barrageIndex++) {
			const row = this.dataList[barrageIndex];
			let dataIndex = this.indexs[barrageIndex];

			if (!dataIndex && dataIndex !== 0) {
				dataIndex = this.indexs[barrageIndex] = 0;
			}

			if (row[dataIndex]) {
				const timeout = setTimeout(() => {
					this._dispatchItem(row[dataIndex], barrageIndex, dataIndex);
					this.timeouts.delete(timeout);
				}, Math.random() * this.delayRange);
				this.timeouts.set(timeout, timeout);
			}
		}
	}

	/**
	 * 暂停滚动
	 */
	pause() {
		this.animates.forEach(item => item.pause());
		this.stageAnimates.forEach(item => item.pause());
		return this;
	}

	/**
	 * 开始滚动
	 */
	play() {
		this.animates.forEach(item => item.play());
		this.stageAnimates.forEach(item => item.play());
		return this;
	}

	/**
	 * 取消动画
	 */
	cancel() {
		this.animates.forEach(item => item.cancel());
		this.stageAnimates.forEach(item => item.cancel());
		this.timeouts.forEach(item => clearTimeout(item));
		this.animates.clear();
		this.stageAnimates.clear();
		this.timeouts.clear();
		return this;
	}

	/**
	 * 重置弹幕
	 */
	reset() {
		this.dataList = [];
		this.indexs = [];
		this.idMap = {};
		this.cancel();
		if (this.box.querySelector('.barrage-list')) {
			this.box.removeChild(this.box.querySelector('.barrage-list'));
		}
		return this;
	}

	/**
	 * 更新配置
	 */
	update(options: DanMuOptions) {
		const box = document.querySelector(options.el);
		if (box) {
			const size = box.getBoundingClientRect();
			this.box = box;
			this.boxSize = size;
			this.speed = options.speed ?? this.speed;
			this.gapWidth = options.gapWidth ?? this.gapWidth;
			this.gapHeight = options.gapHeight ?? this.gapHeight;
			this.avatar = options.avatar ?? this.avatar;
			this.height = options.height ?? this.height;
			this.delayRange = options.delayRange ?? this.delayRange;
			this.align = options.align ?? this.align;
			this.rows = parseInt(((size.height * this._divisor(options.mode ?? 'half')) / (this.height + this.gapHeight)).toString());
			this.reset();
		} else {
			throw new Error(`未找到容器 ${options.el}`);
		}
		return this;
	}

	/**
	 * 添加弹幕数据
	 * @param {*} data
	 */
	pushData(data: DanMuData | DanMuData[]) {
		this._initBarrageList();
		switch (Object.prototype.toString.apply(data)) {
			case '[object Object]':
				this._pushOne(data as DanMuData);
				break;
			case '[object Array]':
				this._pushList(data as DanMuData[]);
				break;
		}
		this._run();
		return this;
	}
}

const danmuku = new DanMuKu(window.ASYNC_CONFIG.danmu);

window.danMu = async (fun: DanMuFun) => {
	danmuku.update(window.ASYNC_CONFIG.danmu).pushData(await fun());

	if (window.ASYNC_CONFIG.swup) {
		document.addEventListener('swup:contentReplaced', async function () {
			danmuku.update(window.ASYNC_CONFIG.danmu).pushData(await fun());
		});
	}
};
