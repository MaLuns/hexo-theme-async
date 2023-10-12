const path = require('path');
const https = require('https');
const fs = require('hexo-fs');
const { regExp, isPlainObject } = require('../utils');

const baseURL = 'https://unpkg.com';

hexo.extend.console.register('plugin', 'Download third-party plugin to local', function () {
	const thirdPartySrc = hexo.render.renderSync({ path: path.join(hexo.theme_dir, '/plugins.yml'), engine: 'yaml' });
	const pluginPath = path.join(hexo.theme_dir, '/source/plugins');
	if (fs.existsSync(pluginPath)) {
		fs.emptyDirSync(pluginPath);
	} else {
		fs.mkdirsSync(pluginPath);
	}

	const downFile = (url, file) => {
		const stream = fs.ensureWriteStreamSync(file, { autoClose: true });

		https.get(url, function (res) {
			if (res.statusCode === 302) {
				stream.end();
				downFile(baseURL + res.headers.location, file);
				return;
			}
			res.on('data', data => stream.write(data));
			res.on('end', () => hexo.log.info(`Download complete: ${url}`));
		});
	};

	const down = data => {
		if (isPlainObject(data)) {
			let keys = Object.keys(data);
			keys.forEach(key => {
				down(data[key]);
			});
		} else if (Array.isArray(data)) {
			data.forEach(item => {
				down(item);
			});
		} else {
			if (!regExp.http.test(data)) {
				downFile(baseURL + data, path.join(pluginPath, data));
			}
		}
	};

	hexo.log.info(`----  Start downloading third-party plugin  ----`);
	down(thirdPartySrc);
});
