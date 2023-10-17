const demosite = require('../docs/.vitepress/assets/sites.json');
const https = require('https');
const fs = require('fs');
const path = require('path');

const generateDemoSiteHtml = data => {
	let str = `<!-- demo-start -->
<table>
  <tr align="center">`;
	data.forEach((item, index) => {
		if (index % 8 === 0 && index > 0) {
			str += `
    </tr>
    <tr align="center">`;
		}
		str += `
        <td>
            <a href="${item.url}" target="_blank">
                <img width="80px" src="${item.avatar}" />
                <br />
                <sub title="${item.desc}">${item.name}</sub>
            </a>
        </td>`;
	});
	str += `
      </tr>
</table>
<!-- demo-end -->`;
	return str;
};

const updateReadme = sites => {
	const paths = [path.resolve(__dirname, '../README.md'), path.resolve(__dirname, '../README_zh-CN.md')];
	paths.forEach(item => {
		let readme = fs.readFileSync(item, 'utf-8');
		readme = readme.replace(/<!-- demo-start -->(.)+?<!-- demo-end -->/gms, () => generateDemoSiteHtml(sites));
		fs.writeFileSync(item, readme, 'utf-8');
	});
};

const check = data => {
	return new Promise(resolve => {
		const req = https.get(data.url, function (res) {
			let html = '';
			res.setEncoding('utf-8');
			if (res.statusCode >= 200 && res.statusCode < 300) {
				res.on('data', function (data) {
					html += data;
				});
				res.on('end', () => {
					if (!/ASYNC_CONFIG/.test(html)) {
						console.log('校验失败: ', data.url);
						data.type = -2;
					} else {
						console.log('校验通过: ', data.url);
						delete data.type;
					}
				});
			} else {
				console.log('站点无法访问: ', data.url);
				data.type = -1;
			}
		});
		req.on('close', () => {
			resolve();
		});
		req.on('error', () => {
			console.log('站点无法访问: ', data.url);
			data.type = -1;
			resolve();
		});
	});
};

const checkDemoSites = () =>
	Promise.allSettled(demosite.map(item => check(item))).then(() => {
		updateReadme(demosite.filter(item => item.type === undefined));
		const filepath = path.resolve(__dirname, '../docs/.vitepress/assets/sites.json');
		fs.writeFileSync(filepath, JSON.stringify(demosite, null, 4));
	});

checkDemoSites();
