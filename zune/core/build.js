export default(async(e,t)=>{let a=t=>{for(let s in t)Object.prototype.hasOwnProperty.call(t,s)&&("object"==typeof t[s]&&null!==t[s]?a(t[s]):isStr(t[s])&&t[s].startsWith("@@")&&(t[s]=e.it.$(t[s].slice(2),!0)))},s=async(e,t,a)=>{await component[e](t,a),l(t,a.await)},l=(e,t)=>{let l=$("[data-use] ?");if(t.length)t.forEach(t=>{let a=null;l.forEach(e=>{if(e.dataset.use.replace(/\s/g,"").split(",").includes(t)){let s=e.dataset.name||"use";(a=isObj(a)?a:{})[s]=isArr(a[s])?[...a[s],e]:a[s]?[a[s],e]:e}}),component[t](e,a)});else for(let r in a(t),t)t.hasOwnProperty(r)&&(l.forEach(e=>{if(e.dataset.use.replace(/\s/g,"").split(",").includes(r)){let a=e.dataset.name||"use";t[r]=isObj(t[r])?t[r]:{},t[r][a]=isArr(t[r][a])?[...t[r][a],e]:t[r][a]?[t[r][a],e]:e}}),isObj(t[r])&&t[r].hasOwnProperty("await")?s(r,e,t[r]):component[r](e,t[r]));return!0};return!!len(t=toBuild(t))&&l(e,t)});