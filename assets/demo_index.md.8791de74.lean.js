import{_ as d,o as t,c as s,k as c,t as f,p as b,m as g,h as v,F as i,D as p,l,H as u,e as x,Q as y}from"./chunks/framework.d3e5bc77.js";import{s as S}from"./chunks/sites.00126155.js";const k=e=>(b("data-v-a11db8bd"),e=e(),g(),e),D=["href"],$=["src"],I=k(()=>c("br",null,null,-1)),T=["title"],w={__name:"DemoSite",props:{site:{type:Object,default:()=>({name:"白云苍狗",url:"https://www.imalun.com",avatar:"https://www.imalun.com/img/avatar.jpg",desc:"主题默认示例"})}},setup(e){return(n,a)=>(t(),s("a",{class:"site-link",href:e.site.url,target:"_blank"},[c("img",{src:e.site.avatar},null,8,$),I,c("sub",{title:e.site.desc},f(e.site.name),9,T)],8,D))}},N=d(w,[["__scopeId","data-v-a11db8bd"]]);const P={align:"center"},V={__name:"DemoSites",setup(e){const n=S.filter(_=>!_.type),a=v(6);return(_,h)=>{const m=N;return t(),s("table",P,[(t(!0),s(i,null,p(Math.ceil(l(n).length/a.value),o=>(t(),s("tr",{key:o,align:"center"},[(t(!0),s(i,null,p(a.value,r=>(t(),s(i,null,[l(n)[(o-1)*a.value+r-1]?(t(),s("td",{key:r,class:"px-1 py-2"},[u(m,{site:l(n)[(o-1)*a.value+r-1]},null,8,["site"])])):x("",!0)],64))),256))]))),128))])}}},j=d(V,[["__scopeId","data-v-60cc3635"]]),O=JSON.parse('{"title":"示例站点","description":"","frontmatter":{},"headers":[],"relativePath":"demo/index.md","filePath":"demo/index.md","lastUpdated":1716433597000}'),q={name:"demo/index.md"},A=y("",5),B=c("hr",null,null,-1);function C(e,n,a,_,h,m){const o=j;return t(),s("div",null,[A,u(o),B])}const R=d(q,[["render",C]]);export{O as __pageData,R as default};