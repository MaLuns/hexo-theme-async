const path = require('path');
const { existsSync, mkdirsSync, symlink } = require('hexo-fs');
const log = require('hexo-log')();

const filePath = __dirname;
const sourcePath = path.resolve(filePath, '../packages/hexo-theme-async');
const targetPath = path.resolve(filePath, '../demo/themes/async');
const themePath = path.resolve(targetPath, '../');

if (!existsSync(themePath)) {
	mkdirsSync(themePath);
}

if (!existsSync(targetPath)) {
	symlink(sourcePath, targetPath, 'dir').catch(() => {
		log.i('软链接创建失败,请手动为 packages/hexo-theme-async 目录创建软链接到 demo/themes/async');
		if (process.platform === 'win32') {
			log.i(`命令: mklink /j ${targetPath} ${sourcePath}`);
		} else {
			log.i(`命令: ln -s ${sourcePath} ${targetPath}`);
		}
	});
}
