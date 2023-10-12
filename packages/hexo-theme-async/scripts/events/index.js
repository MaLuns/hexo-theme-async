const pkg = require('../../package.json');

hexo.on('ready', () => {
	hexo.log.info(`Hexo-Theme-Async version ${pkg.version}. Guide: ${pkg.homepage}`);
});

hexo.on('generateBefore', () => {
	// Set version
	hexo.theme.config.version = pkg.version;

	// Merge config.
	require('./config')(hexo);
});
