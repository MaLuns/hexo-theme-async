const demosite = require('../docs/.vitepress/assets/sites.json')
const fs = require('fs')
const path = require('path')

const getDemoSiteHtml = () => {
    let str = `<!-- demo-start -->
<table>
  <tr align="center">`
    demosite.forEach((item, index) => {
        if (index % 8 === 0 && index > 0) {
            str += `
    </tr>
    <tr align="center">`
        }
        str += `
        <td>
            <a href="${item.url}" target="_blank">
                <img width="80px" src="${item.avatar}" />
                <br />
                <sub title="${item.desc}">${item.name}</sub>
            </a>
        </td>`
    })
    str += `
      </tr>
</table>
<!-- demo-end -->`
    return str;
}

const paths = [path.resolve(__dirname, '../README.md'), path.resolve(__dirname, '../README_zh-CN.md')]
paths.forEach(item => {
    let readme = fs.readFileSync(item, 'utf-8')
    readme = readme.replace(/<!-- demo-start -->(.)+?<!-- demo-end -->/gms, getDemoSiteHtml)
    fs.writeFileSync(item, readme, 'utf-8')
})

