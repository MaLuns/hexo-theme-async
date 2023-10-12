const { escapeBackslash } = require('../utils');
const { resolve } = require('path');
const { statSync, readdirSync, readFileSync, watch, existsSync } = require('hexo-fs');
const { magenta } = require('picocolors');

class Layout {
	init = false;
	watcher = null;

	constructor(hexo) {
		this.hexo = hexo;

		const { theme } = hexo;
		const layout_dir = (this.layout_dir = escapeBackslash(resolve(hexo.base_dir, theme.config.layout.path)));
		if (!existsSync(layout_dir)) return;
		const stats = statSync(layout_dir);
		this.init = stats.isDirectory();

		if (this.init) {
			this.loadDir(layout_dir);
			const { alias } = hexo.extend.console;
			if (alias[hexo.env.cmd] === 'server') {
				this.watch();
				hexo.log.debug('Watch layou path: %s', magenta(layout_dir));
			}
		}
	}

	isWatching() {
		return Boolean(this.watcher);
	}

	unwatch() {
		if (!this.isWatching()) return;

		this.watcher.close();
		this.watcher = null;
	}

	watch() {
		if (this.isWatching()) {
			return this.hexo.log.warn('Watcher has already started.');
		}

		watch(this.layout_dir, {
			persistent: true,
			awaitWriteFinish: {
				stabilityThreshold: 200,
			},
		}).then(watcher => {
			this.watcher = watcher;

			watcher.on('add', path => this.setView(escapeBackslash(path)));
			watcher.on('change', path => this.setView(escapeBackslash(path)));
			watcher.on('unlink', path => this.removeView(escapeBackslash(path)));
			watcher.on('addDir', path => this.loadDir(escapeBackslash(path)));
		});
	}

	setView(fullpath) {
		const path = 'async' + fullpath.replace(this.layout_dir, '');
		this.hexo.theme.setView(path, readFileSync(fullpath, { encoding: 'utf8' }));
		// 修正原文件路径
		const view = this.hexo.theme.getView(path);
		view.source = fullpath;
		view._precompile();
	}

	removeView(fullpath) {
		const path = 'async' + fullpath.replace(this.layout_dir, '');
		this.hexo.theme.removeView(path);
	}

	loadDir(base) {
		let dirs = readdirSync(base);
		dirs.forEach(path => {
			const fullpath = escapeBackslash(resolve(base, path));
			const stats = statSync(fullpath);
			if (stats.isDirectory()) {
				this.loadDir(fullpath);
			} else if (stats.isFile()) {
				this.setView(fullpath);
			}
		});
	}
}

module.exports = (function () {
	let instance;
	return function (hexo) {
		if (!instance) instance = new Layout(hexo);
		return instance;
	};
})();
