import{_ as y}from"./InfoToast.b1d62089.js";import{_ as I,h as u,x as S,o as i,c,H as V,k as e,n as h,a as m,t as d,l as p,a3 as v,a4 as x,a8 as C,F as k,D as B}from"./framework.80ded364.js";const L=["id"],b=["id"],D={class:"icon-list"},N=["onClick"],T={__name:"IconList",props:{title:String,prefix:String,icons:Array,h2:Boolean},setup(t){const _=t;let r=u(_.icons);const s=u(!0),l=u(""),f=u();function g(){s.value=!s.value}function $(o){navigator.clipboard.writeText(`<i class="${_.prefix} ${o}"></i>`),f.value.show(`<${o}> 复制成功！`)}return S(l,o=>{r.value=_.icons.filter(a=>a.includes(o))}),(o,a)=>{const w=y;return i(),c(k,null,[V(w,{ref_key:"toast",ref:f},null,512),t.h2?(i(),c("h2",{key:1,class:"title",id:t.title},[e("span",{onClick:g},[e("i",{class:h(`fas fa-angle-${s.value?"down":"right"}`)},null,2),m("   "+d(t.title)+" ("+d(p(r).length)+") ",1)]),v(e("input",{class:"search-input","onUpdate:modelValue":a[1]||(a[1]=n=>l.value=n),placeholder:"Search Icon"},null,512),[[x,l.value]])],8,b)):(i(),c("div",{key:0,class:"title",id:t.title},[e("span",{onClick:g},[e("i",{class:h(`fas fa-angle-${s.value?"down":"right"}`)},null,2),m("   "+d(t.title)+" ("+d(p(r).length)+") ",1)]),v(e("input",{class:"search-input","onUpdate:modelValue":a[0]||(a[0]=n=>l.value=n),placeholder:"Search Icon"},null,512),[[x,l.value]])],8,L)),v(e("ul",D,[(i(!0),c(k,null,B(p(r),n=>(i(),c("li",{onClick:F=>$(n)},[e("i",{class:h(`${t.prefix} ${n}`)},null,2)],8,N))),256))],512),[[C,s.value]])],64)}}},A=I(T,[["__scopeId","data-v-9a7d65b1"]]);export{A as _};
