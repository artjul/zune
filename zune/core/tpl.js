export default(async(t=null,e=null)=>{let l=t=>{let e=$(`[data-tpl="${t}"]:not(template) ?`);if(!e.length)return null;{let l=e.map(t=>t.$(":: ?").map(t=>({it:t,data:toBuild(t.dataset.set)||null}))),a=(t,e)=>({it:t,fields:e<l.length?l[e]:[]});return 1===e.length?a(e[0],0):e.map((t,e)=>a(t,e))}},a=()=>{let t=new Set,e={};for(let a in $("[data-tpl]:not(template) ?").map(a=>{let i=a.dataset.tpl.replace(/\s/g,"");if(!t.has(i)){let n=l(i);n&&(e[i]=n,t.add(i))}}),e)e.hasOwnProperty(a)&&isArr(e[a])&&(e[a]=e[a][0]||{});return hasObj(e)?e:null},i=t=>{let e=t.$("..{[data-tpl]}");if(!e)return null;let l=e.dataset.tpl.replace(/\s/g,""),a=e.$(":: ?"),i=a.findIndex(e=>e.contains(t)),n=-1!==i?a[i]:null;return{tpl:e,name:l,field:n,idx:i}},n=t=>t.length?t[0]:null,r=t=>t.length?1===t.length?t[0]:t:null,s=(t,e)=>t?e.filter(e=>e<t):[],d=(t,e)=>t?t.map((t,e)=>({val:t,idx:e})).filter(({val:t})=>Object.keys(e||[]).every(l=>isReg(e[l])?e[l].test(t.data[l]):toArr(e[l]).map(String).includes(String(t.data[l]).toLowerCase().trim()))).map(({idx:t})=>t):[],f=(t,e)=>(e=isNum(e)?[e]:e)&&hasArr(e)?s(t?t.length:0,e):d(t,e||[]),p=(t,e)=>{let l=[...t].filter((t,l)=>l!==e);return l[1]=isNum(l[1])?[l[1]]:l[1],l},u=t=>(t.shift(),t=t.filter(t=>isObj(t)),hasArr(t)?t:[{}]),o=(t,e=!1)=>{let l=$(`[data-tpl-alt="${t.it.dataset.tpl}"] ?`),a=e||hasArr(t.fields)?"true":"false",i=()=>{t.it.attr.toggle("inert","true"!==a),hasArr(l)&&l.attr.toggle("inert","true"===a)};coreData.duration?setTimeout(i,coreData.duration):i()},g={getTpl(t,e=!1){let a=l(t[0].replace(/\s/g,""));return a?(a=toArr(a),t.length>1&&a.forEach(e=>{if(hasArr(e.fields)){let l=f(e.fields,t[1]);e.fields=l.map(t=>e.fields[t]).filter(Boolean),e.fields=e.fields.length?e.fields:[]}}),e?r(a):n(a)):null},async addTpl(t,e=!1){t[0]=t[0].replace(/\s/g,"");let l=$(`template[data-name="${t[0].split(":")[0]}"]`),a=$(`[data-tpl="${t[0]}"]:not(template) ?`);if(!l||!hasArr(a))return null;let i=1===a.length?{it:a[0],fields:[]}:a.map(t=>({it:t,fields:[]}));if(!i)return null;i=toArr(i);let n=t.filter(t=>!isObj(t));n=hasArr(n)?n.pop():null,n=isNum(n)?n<0?"end":n:["begin","end"].includes(n)?n:"end",t=u(t),t="end"===n?t:t.reverse();let s=document.createElement("div");s.appendChild(l.content.cloneNode(!0)),1===s.$(":: ?").length&&(s=s.$("*"));let d=!1,f=[];for(let p of i){for(let g of(e&&(p.it.innerHTML=""),t)){g=isObj(g)?g:{};let h=s.cloneNode(!0);h.innerHTML=`<div>${h.innerHTML}</div>`.replace(/>([^<]+)</g,t=>t.replace(/\$\{([^}]+)\}/g,(t,e,l,a)=>l>0&&"\\"===a[l-1]?t:g.hasOwnProperty(e)?`<span data-set-txt-${e}>${g[e]}</span>`:"")).replace(/\\\$\{/g,"${").slice(5,-6);let c=h.$("?"),_=[];c.unshift(h),c.forEach(t=>{let e=t.attr.get();if(e){for(let l in e)if(e.hasOwnProperty(l)&&/\$\{.*\}/.test(e[l])){if("class"===l){let a=[];(e[l].split(" ").map(t=>t.trim())||[]).forEach(e=>{let l=e.match(/^\$\{(.*?)\}$/);l&&l[1]&&(a.includes(l[1])||a.push(l[1]),t.classList.remove(l[0]),g.hasOwnProperty(l[1])&&t.classList.add(g[l[1]]))}),t.setAttribute("data-set-cls",a.join(", "))}else if(!["data-set-attr","data-set-cls"].includes(l)){let i=e[l].match(/^\$\{(.*?)\}$/);if(i&&i[1]){let n=_.find(e=>e.it===t);n?n.data.push({name:i[1],attr:l}):_.push({it:t,data:[{name:i[1],attr:l}]})}}e[l].startsWith("\\${")&&t.setAttribute(l,`${e[l].slice(1)}`)}}}),_.length&&_.forEach(t=>{t.data?.length&&(t.data.forEach(({attr:e,name:l})=>t.it.setAttribute(e,g.hasOwnProperty(l)?isObj(g[l])?JSON.stringify(g[l]):g[l]:"")),t.it.setAttribute("data-set-attr",t.data.map(t=>`${String(t.name).replace(/"/g,"&quot;")}: '${(isObj(t.attr)?JSON.stringify(t.attr):String(t.attr)).replace(/"/g,"&quot;")}'`).join(", ")))}),h.dataset.set=Object.entries(g).map(([t,e])=>`${t}: '${(isObj(e)?JSON.stringify(e):String(e)).replace(/"/g,"&quot;")}'`).join(", ");let m=null;if("end"===n)m=await $.insert(p.it,h,n,!0);else{let w="begin"!==n?p.it.$(":: ?"):[],y="begin"===n?"begin":isNum(n)&&w.length>n?"before":"end";m=await $.insert("before"===y?w[n]:p.it,h,y,!0)}!d&&isElem(m)&&f.push({it:m,data:hasObj(g)?g:null})}o(p,!0),d=!0}return f.length&&init("tpl"),r(f)},removeTpl(t){let e=l(t[0].replace(/\s/g,""));return e?((e=toArr(e)).forEach(e=>{if(hasArr(e.fields)){let l=f(e.fields,t[1]??[]);l.forEach(t=>{if(e.fields[t]){let l=e.fields[t].it;coreData.duration?(l.attr.toggle("inert",!0),setTimeout(()=>l.remove(),coreData.duration)):l.remove(),e.fields[t]=null}}),e.fields=e.fields.filter(t=>hasObj(t)),e.fields=e.fields.length?e.fields:[],o(e,!1)}}),n(e)):null},setTpl(t){if(t.length<2||!isObj(t[1]))return null;let e=[];t[0]=t[0].replace(/\s/g,"");let a=l(t[0]);if(!a)return null;let i=!1;return(a=toArr(a)).forEach(l=>{if(hasArr(l.fields)){let a=f(l.fields,t[2]??[]);a.forEach(a=>{if(l.fields[a]){for(let n in t[1])t[1].hasOwnProperty(n)&&l.fields[a].it.$(`span[data-set-txt-${n}] ?`).forEach(e=>{e.$("..{[data-tpl]}")?.dataset.tpl===t[0]&&(e.innerHTML=t[1][n])});l.fields[a].it.$("[data-set-cls] ?").forEach(e=>{if(e.$("..{[data-tpl]}")?.dataset.tpl===t[0]){let i=e.getAttribute("data-set-cls");i&&(i.split(",").map(t=>t.trim())||[]).forEach(i=>{t[1].hasOwnProperty(i)&&(l.fields[a].data.hasOwnProperty(i)&&e.classList.remove(l.fields[a].data[i]),e.classList.add(t[1][i]))})}}),l.fields[a].it.$("[data-set-attr] ?").forEach(e=>{if(e.$("..{[data-tpl]}")?.dataset.tpl===t[0]){let l=e.getAttribute("data-set-attr");if(l&&isObj(l=toBuild(l)))for(let a in l)l.hasOwnProperty(a)&&t[1].hasOwnProperty(a)&&e.setAttribute(l[a],String(t[1][a]).replace(/"/g,"&quot;"))}}),l.fields[a].data=Object.assign(l.fields[a].data,t[1]),l.fields[a].it.dataset.set=Object.entries(l.fields[a].data).map(([t,e])=>`${t}: '${String(e).replace(/"/g,"&quot;")}'`).join(", "),i||e.push(l.fields[a])}})}i=!0}),e.length&&init("tpl"),e},replaceTpl:t=>g.addTpl(t,!0),swapTpl(t){if(t.length<3)return null;let e=toArr(g.getTpl(p(t,2),!0)),l=toArr(g.getTpl(p(t,1),!0)),a=e.map(t=>t?.fields?.[0]||null),i=l.map(t=>t?.fields?.[0]||null),n=Math.min(a?.length,i?.length);a.length=i.length=n;let r=null;return a.forEach((t,e)=>{t?.it&&i[e]?.it&&t.it!==i[e].it&&($.swap(t.it,i[e].it),null===r&&(r=[t,i[e]]))}),r},countTpl(t){if(t.length>1){let e=g.getTpl(t);return e?.fields?e.fields.length:0}{let l=$(`[data-tpl="${t[0]}"]:not(template)`);return isElem(l)?l.$(":: ?").length:0}},async componentTpl(t){if(t.length<=1)return null;let e=[...t];e.splice(1,1);let l=g.getTpl(e);if(!l)return null;l=toArr(l);let a={};await Promise.all(l.map(async e=>{if(hasArr(e.fields)){if(isObj(t[1]))for(let[l,i]of Object.entries(t[1])){let n=await component[l](e.fields,i);a[l]=n}else{let r=await component[t[1]](e.fields,null);a[t[1]]=r}}})),a.length&&init("tpl");let i=len(a);return i?1===i?Object.values(a)[0]:a:null}};return hasArr(e)?"pos"===t?isElem(e[0])?i(e[0]):null:!!(e[0]&&g.hasOwnProperty(`${t}Tpl`))&&await g[`${t}Tpl`](e):"get"===t&&a()});