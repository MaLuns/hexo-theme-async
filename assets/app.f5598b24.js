import{s as o,a6 as i,a7 as p,a8 as u,a9 as c,aa as l,ab as d,ac as f,ad as m,ae as h,af as A,V as g,d as P,u as v,j as y,y as w,ag as C,ah as R,ai as _,aj as b}from"./chunks/framework.79ee6444.js";import{t as E}from"./chunks/theme.07fda9e4.js";const j={...E};function r(e){if(e.extends){const a=r(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=r(j),D=P({name:"VitePressApp",setup(){const{site:e}=v();return y(()=>{w(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),C(),R(),_(),s.setup&&s.setup(),()=>b(s.Layout)}});async function T(){const e=O(),a=x();a.provide(p,e);const t=u(e.route);return a.provide(c,t),a.component("Content",l),a.component("ClientOnly",d),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:f}),{app:a,router:e,data:t}}function x(){return m(D)}function O(){let e=o,a;return h(t=>{let n=A(t);return n?(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),o&&(e=!1),g(()=>import(n),[])):null},s.NotFound)}o&&T().then(({app:e,router:a,data:t})=>{a.go().then(()=>{i(a.route,t.site),e.mount("#app")})});export{T as createApp};