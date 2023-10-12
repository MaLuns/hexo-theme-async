import { utils } from '../utils';

const arrayify = list => Array.prototype.slice.call(list);

class SwupScriptsPlugin {
	name = 'ScriptPlugin';
	isSwupPlugin = true;

	defaultOptions = {
		selectors: 'script[data-swup-reload-script]',
	};

	swup: any;
	options: { selectors: string };

	constructor(options = {}) {
		this.options = {
			...this.defaultOptions,
			...options,
		};
	}

	mount() {
		this.swup.on('contentReplaced', this.getScriptAndInsert);
	}

	unmount() {
		this.swup.off('contentReplaced', this.getScriptAndInsert);
	}

	// 动态插件脚本
	getScriptAndInsert = () => {
		const nextHeadChildren = this.getNextScriptChildren();
		if (nextHeadChildren.length) {
			const run = async (newScripts: Array<HTMLScriptElement>) => {
				const scripts = Array.from(document.scripts);

				for (let index = 0; index < newScripts.length; index++) {
					const script = newScripts[index];
					if (script.src) {
						// 如果已经加载 、并且不需要重新执行的 则跳过
						if (scripts.findIndex(s => s.src === script.src && !s.dataset.reset) < 0) {
							await this.loadScript(script);
						}
					} else {
						utils.runScriptBlock(script);
					}
				}
			};

			run(nextHeadChildren);
		}
	};

	// 加载脚本
	loadScript(item: HTMLScriptElement) {
		return new Promise<void>((resolve, reject) => {
			const element = document.createElement('script');
			for (const { name, value } of arrayify(item.attributes)) {
				element.setAttribute(name, value);
			}
			element.textContent = item.textContent;
			element.setAttribute('async', 'false');
			element.onload = () => {
				resolve();
				if (document.body.contains(element)) {
					document.body.removeChild(element);
				}
			};
			element.onerror = reject;
			document.body.appendChild(element);
		});
	}

	// 提取 script
	getNextScriptChildren(): HTMLScriptElement[] {
		const pageContent = this.swup.cache.getCurrentPage().originalContent.replace('<body', '<div id="swupBody"').replace('</body>', '</div>');
		let element = document.createElement('div');
		element.innerHTML = pageContent;
		const children = <HTMLScriptElement[]>(<any>element.querySelector('#swupBody').querySelectorAll(this.options.selectors));

		// cleanup
		element.innerHTML = '';
		element = null;

		return children;
	}
}

export default SwupScriptsPlugin;
