import{_ as y,h as r,o as i,c as u,r as I,n as p,a as x,t as v,x as S,H as T,k as a,l as g,a3 as m,a4 as w,a5 as V,F as k,D as b}from"./framework.d3e5bc77.js";const C={__name:"InfoToast",setup(t,{expose:_}){const n=r(""),e=r(!1);let s;return _({show:d=>{n.value=d,e.value=!0,clearTimeout(s),s=setTimeout(()=>{e.value=!1},3e3)},close:()=>{e.value=!1}}),(d,l)=>(i(),u("div",{id:"toast",class:p(["toast",[e.value?"show":""]])},[I(d.$slots,"default",{},()=>[x(v(n.value),1)],!0)],2))}},B=y(C,[["__scopeId","data-v-fe13b949"]]);const L=["id"],D=["id"],N={class:"icon-list"},F=["onClick"],U={__name:"IconList",props:{title:String,prefix:String,icons:Array,h2:Boolean},setup(t){const _=t;let n=r(_.icons);const e=r(!0),s=r(""),f=r();function h(){e.value=!e.value}function d(l){navigator.clipboard.writeText(`<i class="${_.prefix} ${l}"></i>`),f.value.show(`<${l}> 复制成功！`)}return S(s,l=>{n.value=_.icons.filter(o=>o.includes(l))}),(l,o)=>{const $=B;return i(),u(k,null,[T($,{ref_key:"toast",ref:f},null,512),t.h2?(i(),u("h2",{key:1,class:"title",id:t.title},[a("span",{onClick:h},[a("i",{class:p(`fas fa-angle-${e.value?"down":"right"}`)},null,2),x("   "+v(t.title)+" ("+v(g(n).length)+") ",1)]),m(a("input",{class:"search-input","onUpdate:modelValue":o[1]||(o[1]=c=>s.value=c),placeholder:"Search Icon"},null,512),[[w,s.value]])],8,D)):(i(),u("div",{key:0,class:"title",id:t.title},[a("span",{onClick:h},[a("i",{class:p(`fas fa-angle-${e.value?"down":"right"}`)},null,2),x("   "+v(t.title)+" ("+v(g(n).length)+") ",1)]),m(a("input",{class:"search-input","onUpdate:modelValue":o[0]||(o[0]=c=>s.value=c),placeholder:"Search Icon"},null,512),[[w,s.value]])],8,L)),m(a("ul",N,[(i(!0),u(k,null,b(g(n),c=>(i(),u("li",{onClick:z=>d(c)},[a("i",{class:p(`${t.prefix} ${c}`)},null,2)],8,F))),256))],512),[[V,e.value]])],64)}}},E=y(U,[["__scopeId","data-v-9a7d65b1"]]);export{E as _,B as a};