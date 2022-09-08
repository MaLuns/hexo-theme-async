const fs = require('fs')

if (process.env.RELEASE_VERSION) {
    console.log(process.env.RELEASE_VERSION);
    const pkg = require('../package/hexo-theme-async/package.json')
    pkg.version = process.env.RELEASE_VERSION
    fs.writeFileSync('../package/hexo-theme-async/package.json', JSON.stringify(pkg, null, 4), 'utf-8')
}

