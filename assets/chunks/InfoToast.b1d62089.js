import{_ as l,h as a,o as n,c,r,n as u,a as p,t as f}from"./framework.80ded364.js";const i={__name:"InfoToast",setup(m,{expose:_}){const o=a(""),e=a(!1);let t;return _({show:s=>{o.value=s,e.value=!0,clearTimeout(t),t=setTimeout(()=>{e.value=!1},3e3)},close:()=>{e.value=!1}}),(s,h)=>(n(),c("div",{id:"toast",class:u(["toast",[e.value?"show":""]])},[r(s.$slots,"default",{},()=>[p(f(o.value),1)],!0)],2))}},T=l(i,[["__scopeId","data-v-7ea7f385"]]);export{T as _};
