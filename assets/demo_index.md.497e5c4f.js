import{_ as d,o as t,c as s,k as c,t as b,p as g,m as v,h as x,F as i,D as p,l,H as h,e as y,Q as S}from"./chunks/framework.79ee6444.js";import{s as u}from"./chunks/sites.4f3ef59c.js";const k=e=>(g("data-v-2b443cab"),e=e(),v(),e),D=["href"],$=["src"],I=k(()=>c("br",null,null,-1)),T=["title"],w={__name:"DemoSite",props:{site:{type:Object,default:()=>({name:"白云苍狗",url:"https://www.imalun.com",avatar:"https://www.imalun.com/img/avatar.jpg",desc:"主题默认示例"})}},setup(e){return(o,a)=>(t(),s("a",{class:"site-link",href:e.site.url,target:"_blank"},[c("img",{src:e.site.avatar},null,8,$),I,c("sub",{title:e.site.desc},b(e.site.name),9,T)],8,D))}},N=d(w,[["__scopeId","data-v-2b443cab"]]);const P={align:"center"},V={__name:"DemoSites",setup(e){const o=u.filter(_=>!_.type),a=x(6);return(_,f)=>{const m=N;return t(),s("table",P,[(t(!0),s(i,null,p(Math.ceil(l(o).length/a.value),n=>(t(),s("tr",{key:n,align:"center"},[(t(!0),s(i,null,p(a.value,r=>(t(),s(i,null,[l(o)[(n-1)*a.value+r-1]?(t(),s("td",{key:r,class:"px-1 py-2"},[h(m,{site:l(u)[(n-1)*a.value+r-1]},null,8,["site"])])):y("",!0)],64))),256))]))),128))])}}},j=d(V,[["__scopeId","data-v-988dd3ce"]]),O=JSON.parse('{"title":"示例站点","description":"","frontmatter":{},"headers":[],"relativePath":"demo/index.md","filePath":"demo/index.md","lastUpdated":1694851603000}'),q={name:"demo/index.md"},A=S('<h1 id="示例站点" tabindex="-1">示例站点 <a class="header-anchor" href="#示例站点" aria-label="Permalink to &quot;示例站点&quot;">​</a></h1><p><img src="https://img.shields.io/npm/dm/hexo-theme-async?color=red&amp;label=hexo-theme-async%40latest&amp;logo=npm&amp;style=for-the-badge" alt="npm (tag)"></p><p>如果您已经使用了本主题，欢迎前往 <a href="https://github.com/MaLuns/hexo-theme-async/discussions/7" target="_blank" rel="noreferrer">Demo Sites | 示例站点 | Discussions</a> 留下您的站点，我将会将其添加到下方的示例站点中。</p><hr><blockquote><p>也可以直接修改 <a href="https://github.com/MaLuns/hexo-theme-async/blob/dev/docs/.vitepress/assets/sites.json" target="_blank" rel="noreferrer">sites.json</a> 创建 PR。</p></blockquote>',5),B=c("hr",null,null,-1);function C(e,o,a,_,f,m){const n=j;return t(),s("div",null,[A,h(n),B])}const R=d(q,[["render",C]]);export{O as __pageData,R as default};