const isObject=t=>"[object Object]"===Object.prototype.toString.call(t)
/**
 * Check for valid JSON string
 * @param  {String}   str
 * @return {Boolean|Array|Object}
 */;const isJson=t=>{let e=!1;try{e=JSON.parse(t)}catch(t){return!1}return!(null===e||!Array.isArray(e)&&!isObject(e))&&e};
/**
 * Create DOM element node
 * @param  {String}   nodeName nodeName
 * @param  {Object}   attrs properties and attributes
 * @return {Object}
 */const createElement=(t,e)=>{const s=document.createElement(t);if(e&&"object"==typeof e)for(const t in e)"html"===t?s.innerHTML=e[t]:s.setAttribute(t,e[t]);return s};const flush=t=>{t instanceof NodeList?t.forEach((t=>flush(t))):t.innerHTML=""};
/**
 * Create button helper
 * @param  {String}   class
 * @param  {Number}   page
 * @param  {String}   text
 * @return {Object}
 */const button=(t,e,s)=>createElement("li",{class:t,html:`<a href="#" data-page="${e}">${s}</a>`});const sortItems=(t,e)=>{let s;let a;if(1===e){s=0;a=t.length}else if(-1===e){s=t.length-1;a=-1}for(let i=!0;i;){i=!1;for(let n=s;n!=a;n+=e)if(t[n+e]&&t[n].value>t[n+e].value){const s=t[n];const a=t[n+e];const l=s;t[n]=a;t[n+e]=l;i=!0}}return t};const truncate=(t,e,s,a,i)=>{a=a||2;let n;const l=2*a;let r=e-a;let h=e+a;const o=[];const d=[];e<4-a+l?h=3+l:e>s-(3-a+l)&&(r=s-(2+l));for(let e=1;e<=s;e++)if(1==e||e==s||e>=r&&e<=h){const s=t[e-1];s.classList.remove("active");o.push(s)}o.forEach((e=>{const s=e.children[0].getAttribute("data-page");if(n){const e=n.children[0].getAttribute("data-page");if(s-e==2)d.push(t[e]);else if(s-e!=1){const t=createElement("li",{class:"ellipsis",html:`<a href="#">${i}</a>`});d.push(t)}}d.push(e);n=e}));return d};
/**
 * Rows API
 * @param {Object} instance DataTable instance
 * @param {Array} rows
 */class Rows{constructor(t,e){this.dt=t;this.rows=e;return this}
/**
     * Build a new row
     * @param  {Array} row
     * @return {HTMLElement}
     */build(t){const e=createElement("tr");let s=this.dt.headings;s.length||(s=t.map((()=>"")));s.forEach(((s,a)=>{const i=createElement("td");t[a]&&t[a].length||(t[a]="");i.innerHTML=t[a];i.data=t[a];e.appendChild(i)}));return e}render(t){return t}
/**
     * Add new row
     * @param {Array} select
     */add(t){if(Array.isArray(t)){const e=this.dt;Array.isArray(t[0])?t.forEach((t=>{e.data.push(this.build(t))})):e.data.push(this.build(t));e.data.length&&(e.hasRows=true);this.update();e.columns().rebuild()}}
/**
     * Remove row(s)
     * @param  {Array|Number} select
     * @return {Void}
     */remove(t){const e=this.dt;if(Array.isArray(t)){t.sort(((t,e)=>e-t));t.forEach((t=>{e.data.splice(t,1)}))}else"all"==t?e.data=[]:e.data.splice(t,1);e.data.length||(e.hasRows=false);this.update();e.columns().rebuild()}update(){this.dt.data.forEach(((t,e)=>{t.dataIndex=e}))}
/**
     * Find index of row by searching for a value in a column
     * @param  {Number} columnIndex
     * @param  {String} value
     * @return {Number}
     */findRowIndex(t,e){return this.dt.data.findIndex((s=>s.children[t].innerText.toLowerCase().includes(String(e).toLowerCase())))}
/**
     * Find index, row, and column data by searching for a value in a column
     * @param  {Number} columnIndex
     * @param  {String} value
     * @return {Object}
     */findRow(t,e){const s=this.findRowIndex(t,e);if(s<0)return{index:-1,row:null,cols:[]};const a=this.dt.data[s];const i=[...a.cells].map((t=>t.innerHTML));return{index:s,row:a,cols:i}}
/**
     * Update a row with new data
     * @param  {Number} select
     * @param  {Array} data
     * @return {Void}
     */updateRow(t,e){const s=this.build(e);this.dt.data.splice(t,1,s);this.update();this.dt.columns().rebuild()}}
/**
 * Columns API
 * @param {Object} instance DataTable instance
 * @param {Mixed} columns  Column index or array of column indexes
 */class Columns{constructor(t){this.dt=t;return this}swap(t){if(t.length&&2===t.length){const e=[];this.dt.headings.forEach(((t,s)=>{e.push(s)}));const s=t[0];const a=t[1];const i=e[a];e[a]=e[s];e[s]=i;this.order(e)}}order(t){let e;let s;let a;let i;let n;let l;let r;const h=[[],[],[],[]];const o=this.dt;t.forEach(((t,a)=>{n=o.headings[t];l="false"!==n.getAttribute("data-sortable");e=n.cloneNode(true);e.originalCellIndex=a;e.sortable=l;h[0].push(e);if(!o.hiddenColumns.includes(t)){s=n.cloneNode(true);s.originalCellIndex=a;s.sortable=l;h[1].push(s)}}));o.data.forEach(((e,s)=>{a=e.cloneNode(false);i=e.cloneNode(false);a.dataIndex=i.dataIndex=s;null!==e.searchIndex&&void 0!==e.searchIndex&&(a.searchIndex=i.searchIndex=e.searchIndex);t.forEach((t=>{r=e.cells[t].cloneNode(true);r.data=e.cells[t].data;a.appendChild(r);if(!o.hiddenColumns.includes(t)){r=e.cells[t].cloneNode(true);r.data=e.cells[t].data;i.appendChild(r)}}));h[2].push(a);h[3].push(i)}));o.headings=h[0];o.activeHeadings=h[1];o.data=h[2];o.activeRows=h[3];o.update()}hide(t){if(t.length){const e=this.dt;t.forEach((t=>{e.hiddenColumns.includes(t)||e.hiddenColumns.push(t)}));this.rebuild()}}show(t){if(t.length){let e;const s=this.dt;t.forEach((t=>{e=s.hiddenColumns.indexOf(t);e>-1&&s.hiddenColumns.splice(e,1)}));this.rebuild()}}visible(t){let e;const s=this.dt;t=t||s.headings.map((t=>t.originalCellIndex));if(isNaN(t)){if(Array.isArray(t)){e=[];t.forEach((t=>{e.push(!s.hiddenColumns.includes(t))}))}}else e=!s.hiddenColumns.includes(t);return e}
/**
     * Add a new column
     * @param {Object} data
     */add(t){let e;const s=document.createElement("th");if(this.dt.headings.length){this.dt.hiddenHeader?s.innerHTML="":t.heading.nodeName?s.appendChild(t.heading):s.innerHTML=t.heading;this.dt.headings.push(s);this.dt.data.forEach(((s,a)=>{if(t.data[a]){e=document.createElement("td");t.data[a].nodeName?e.appendChild(t.data[a]):e.innerHTML=t.data[a];e.data=e.innerHTML;t.render&&(e.innerHTML=t.render.call(this,e.data,e,s));s.appendChild(e)}}));t.type&&s.setAttribute("data-type",t.type);t.format&&s.setAttribute("data-format",t.format);if(t.hasOwnProperty("sortable")){s.sortable=t.sortable;s.setAttribute("data-sortable",true===t.sortable?"true":"false")}this.rebuild();this.dt.renderHeader()}else{this.dt.insert({headings:[t.heading],data:t.data.map((t=>[t]))});this.rebuild()}}
/**
     * Remove column(s)
     * @param  {Array|Number} select
     * @return {Void}
     */remove(t){if(Array.isArray(t)){t.sort(((t,e)=>e-t));t.forEach((t=>this.remove(t)))}else{this.dt.headings.splice(t,1);this.dt.data.forEach((e=>{e.removeChild(e.cells[t])}))}this.rebuild()}
/**
     * Filter by column
     * @param  {int} column - The column no.
     * @param  {string} dir - asc or desc
     * @filter {array} filter - optional parameter with a list of strings
     * @return {void}
     */filter(t,e,s,a){const i=this.dt;i.filterState||(i.filterState={originalData:i.data});if(!i.filterState[t]){const e=[...a,()=>true];i.filterState[t]=function(){let t=0;return()=>e[t++%e.length]}()}const n=i.filterState[t]();const l=Array.from(i.filterState.originalData).filter((e=>{const s=e.cells[t];const a=s.hasAttribute("data-content")?s.getAttribute("data-content"):s.innerText;return"function"===typeof n?n(a):a===n}));i.data=l;if(i.data.length){this.rebuild();i.update()}else{i.clear();i.hasRows=false;i.setMessage(i.options.labels.noRows)}s||i.emit("datatable.sort",t,e)}
/**
     * Sort by column
     * @param  {int} column - The column no.
     * @param  {string} dir - asc or desc
     * @return {void}
     */sort(t,e,s){const a=this.dt;if(a.hasHeadings&&(t<0||t>a.headings.length))return false;const i=a.options.filters&&a.options.filters[a.headings[t].textContent];if(i&&0!==i.length){this.filter(t,e,s,i);return}a.sorting=true;s||a.emit("datatable.sorting",t,e);let n=a.data;const l=[];const r=[];let h=0;let o=0;const d=a.headings[t];const c=[];if("date"===d.getAttribute("data-type")){let t=false;const e=d.hasAttribute("data-format");e&&(t=d.getAttribute("data-format"));c.push(import("../_/18400405.js").then((({parseDate:e})=>s=>e(s,t))))}Promise.all(c).then((i=>{const c=i[0];Array.from(n).forEach((e=>{const s=e.cells[t];const a=s.hasAttribute("data-content")?s.getAttribute("data-content"):s.innerText;let i;i=c?c(a):"string"===typeof a?a.replace(/(\$|,|\s|%)/g,""):a;parseFloat(i)==i?r[o++]={value:Number(i),row:e}:l[h++]={value:"string"===typeof a?a.toLowerCase():a,row:e}}));e||(e=d.classList.contains("asc")?"desc":"asc");let p;let u;if("desc"==e){p=sortItems(l,-1);u=sortItems(r,-1);d.classList.remove("asc");d.classList.add("desc")}else{p=sortItems(r,1);u=sortItems(l,1);d.classList.remove("desc");d.classList.add("asc")}if(a.lastTh&&d!=a.lastTh){a.lastTh.classList.remove("desc");a.lastTh.classList.remove("asc")}a.lastTh=d;n=p.concat(u);a.data=[];const f=[];n.forEach(((t,e)=>{a.data.push(t.row);null!==t.row.searchIndex&&void 0!==t.row.searchIndex&&f.push(e)}));a.searchData=f;this.rebuild();a.update();s||a.emit("datatable.sort",t,e)}))}rebuild(){let t;let e;let s;let a;const i=this.dt;const n=[];i.activeRows=[];i.activeHeadings=[];i.headings.forEach(((t,e)=>{t.originalCellIndex=e;t.sortable="false"!==t.getAttribute("data-sortable");i.hiddenColumns.includes(e)||i.activeHeadings.push(t)}));i.data.forEach(((l,r)=>{t=l.cloneNode(false);e=l.cloneNode(false);t.dataIndex=e.dataIndex=r;null!==l.searchIndex&&void 0!==l.searchIndex&&(t.searchIndex=e.searchIndex=l.searchIndex);Array.from(l.cells).forEach((n=>{s=n.cloneNode(true);s.data=n.data;t.appendChild(s);if(!i.hiddenColumns.includes(s.cellIndex)){a=s.cloneNode(true);a.data=s.data;e.appendChild(a)}}));n.push(t);i.activeRows.push(e)}));i.data=n;i.update()}}const dataToTable=function(t){let e=false;let s=false;t=t||this.options.data;if(t.headings){e=createElement("thead");const s=createElement("tr");t.headings.forEach((t=>{const e=createElement("th",{html:t});s.appendChild(e)}));e.appendChild(s)}if(t.data&&t.data.length){s=createElement("tbody");t.data.forEach((e=>{if(t.headings&&t.headings.length!==e.length)throw new Error("The number of rows do not match the number of headings.");const a=createElement("tr");e.forEach((t=>{const e=createElement("td",{html:t});a.appendChild(e)}));s.appendChild(a)}))}if(e){null!==this.dom.tHead&&this.dom.removeChild(this.dom.tHead);this.dom.appendChild(e)}if(s){this.dom.tBodies.length&&this.dom.removeChild(this.dom.tBodies[0]);this.dom.appendChild(s)}};const t={sortable:true,searchable:true,paging:true,perPage:10,perPageSelect:[5,10,15,20,25],nextPrev:true,firstLast:false,prevText:"&lsaquo;",nextText:"&rsaquo;",firstText:"&laquo;",lastText:"&raquo;",ellipsisText:"&hellip;",ascText:"▴",descText:"▾",truncatePager:true,pagerDelta:2,scrollY:"",fixedColumns:true,fixedHeight:false,header:true,hiddenHeader:false,footer:false,labels:{placeholder:"Search...",perPage:"{select} entries per page",noRows:"No entries found",noResults:"No results match your search query",info:"Showing {start} to {end} of {rows} entries"},layout:{top:"{select}{search}",bottom:"{info}{pager}"}};class DataTable{constructor(e,s={}){const a="string"===typeof e?document.querySelector(e):e;this.options={...t,...s,layout:{...t.layout,...s.layout},labels:{...t.labels,...s.labels}};this.initialized=false;this.initialLayout=a.innerHTML;this.initialSortable=this.options.sortable;this.options.header||(this.options.sortable=false);null===a.tHead&&(!this.options.data||this.options.data&&!this.options.data.headings)&&(this.options.sortable=false);if(a.tBodies.length&&!a.tBodies[0].rows.length&&this.options.data&&!this.options.data.data)throw new Error("You seem to be using the data option, but you've not defined any rows.");this.dom=a;this.table=this.dom;this.listeners={onResize:t=>this.onResize(t)};this.init()}
/**
     * Add custom property or method to extend DataTable
     * @param  {String} prop    - Method name or property
     * @param  {Mixed} val      - Function or property value
     * @return {Void}
     */static extend(t,e){"function"===typeof e?DataTable.prototype[t]=e:DataTable[t]=e}
/**
     * Initialize the instance
     * @param  {Object} options
     * @return {Void}
     */init(t){if(this.initialized||this.dom.classList.contains("dataTable-table"))return false;Object.assign(this.options,t||{});this.currentPage=1;this.onFirstPage=true;this.hiddenColumns=[];this.columnRenderers=[];this.selectedColumns=[];this.render();setTimeout((()=>{this.emit("datatable.init");this.initialized=true;this.options.plugins&&Object.entries(this.options.plugins).forEach((([t,e])=>{if(this[t]&&"function"===typeof this[t]){this[t]=this[t](e,{createElement:createElement});e.enabled&&this[t].init&&"function"===typeof this[t].init&&this[t].init()}}))}),10)}
/**
     * Render the instance
     * @param  {String} type
     * @return {Void}
     */render(t){if(t){switch(t){case"page":this.renderPage();break;case"pager":this.renderPager();break;case"header":this.renderHeader();break}return false}const e=this.options;let s="";e.data&&dataToTable.call(this);this.body=this.dom.tBodies[0];this.head=this.dom.tHead;this.foot=this.dom.tFoot;if(!this.body){this.body=createElement("tbody");this.dom.appendChild(this.body)}this.hasRows=this.body.rows.length>0;if(!this.head){const t=createElement("thead");const s=createElement("tr");if(this.hasRows){Array.from(this.body.rows[0].cells).forEach((()=>{s.appendChild(createElement("th"))}));t.appendChild(s)}this.head=t;this.dom.insertBefore(this.head,this.body);this.hiddenHeader=e.hiddenHeader}this.headings=[];this.hasHeadings=this.head.rows.length>0;if(this.hasHeadings){this.header=this.head.rows[0];this.headings=[].slice.call(this.header.cells)}e.header||this.head&&this.dom.removeChild(this.dom.tHead);if(e.footer){if(this.head&&!this.foot){this.foot=createElement("tfoot",{html:this.head.innerHTML});this.dom.appendChild(this.foot)}}else this.foot&&this.dom.removeChild(this.dom.tFoot);this.wrapper=createElement("div",{class:"dataTable-wrapper dataTable-loading"});s+="<div class='dataTable-top'>";s+=e.layout.top;s+="</div>";e.scrollY.length?s+=`<div class='dataTable-container' style='height: ${e.scrollY}; overflow-Y: auto;'></div>`:s+="<div class='dataTable-container'></div>";s+="<div class='dataTable-bottom'>";s+=e.layout.bottom;s+="</div>";s=s.replace("{info}",e.paging?"<div class='dataTable-info'></div>":"");if(e.paging&&e.perPageSelect){let t="<div class='dataTable-dropdown'><label>";t+=e.labels.perPage;t+="</label></div>";const a=createElement("select",{class:"dataTable-selector"});e.perPageSelect.forEach((t=>{const s=t===e.perPage;const i=new Option(t,t,s,s);a.add(i)}));t=t.replace("{select}",a.outerHTML);s=s.replace("{select}",t)}else s=s.replace("{select}","");if(e.searchable){const t=`<div class='dataTable-search'><input class='dataTable-input' placeholder='${e.labels.placeholder}' type='text'></div>`;s=s.replace("{search}",t)}else s=s.replace("{search}","");this.hasHeadings&&this.render("header");this.dom.classList.add("dataTable-table");const a=createElement("nav",{class:"dataTable-pagination"});const i=createElement("ul",{class:"dataTable-pagination-list"});a.appendChild(i);s=s.replace(/\{pager\}/g,a.outerHTML);this.wrapper.innerHTML=s;this.container=this.wrapper.querySelector(".dataTable-container");this.pagers=this.wrapper.querySelectorAll(".dataTable-pagination-list");this.label=this.wrapper.querySelector(".dataTable-info");this.dom.parentNode.replaceChild(this.wrapper,this.dom);this.container.appendChild(this.dom);this.rect=this.dom.getBoundingClientRect();this.data=Array.from(this.body.rows);this.activeRows=this.data.slice();this.activeHeadings=this.headings.slice();this.update();this.setColumns();this.fixHeight();this.fixColumns();e.header||this.wrapper.classList.add("no-header");e.footer||this.wrapper.classList.add("no-footer");e.sortable&&this.wrapper.classList.add("sortable");e.searchable&&this.wrapper.classList.add("searchable");e.fixedHeight&&this.wrapper.classList.add("fixed-height");e.fixedColumns&&this.wrapper.classList.add("fixed-columns");this.bindEvents()}renderPage(){if(this.hasHeadings){flush(this.header);this.activeHeadings.forEach((t=>this.header.appendChild(t)))}if(this.hasRows&&this.totalPages){this.currentPage>this.totalPages&&(this.currentPage=1);const t=this.currentPage-1;const e=document.createDocumentFragment();this.pages[t].forEach((t=>e.appendChild(this.rows().render(t))));this.clear(e);this.onFirstPage=1===this.currentPage;this.onLastPage=this.currentPage===this.lastPage}else this.setMessage(this.options.labels.noRows);let t=0;let e=0;let s=0;let a;if(this.totalPages){t=this.currentPage-1;e=t*this.options.perPage;s=e+this.pages[t].length;e+=1;a=this.searching?this.searchData.length:this.data.length}if(this.label&&this.options.labels.info.length){const t=this.options.labels.info.replace("{start}",e).replace("{end}",s).replace("{page}",this.currentPage).replace("{pages}",this.totalPages).replace("{rows}",a);this.label.innerHTML=a?t:""}1==this.currentPage&&this.fixHeight()}renderPager(){flush(this.pagers);if(this.totalPages>1){const t="pager";const e=document.createDocumentFragment();const s=this.onFirstPage?1:this.currentPage-1;const a=this.onLastPage?this.totalPages:this.currentPage+1;this.options.firstLast&&e.appendChild(button(t,1,this.options.firstText));this.options.nextPrev&&!this.onFirstPage&&e.appendChild(button(t,s,this.options.prevText));let i=this.links;this.options.truncatePager&&(i=truncate(this.links,this.currentPage,this.pages.length,this.options.pagerDelta,this.options.ellipsisText));this.links[this.currentPage-1].classList.add("active");i.forEach((t=>{t.classList.remove("active");e.appendChild(t)}));this.links[this.currentPage-1].classList.add("active");this.options.nextPrev&&!this.onLastPage&&e.appendChild(button(t,a,this.options.nextText));this.options.firstLast&&e.appendChild(button(t,this.totalPages,this.options.lastText));this.pagers.forEach((t=>{t.appendChild(e.cloneNode(true))}))}}renderHeader(){this.labels=[];this.headings&&this.headings.length&&this.headings.forEach(((t,e)=>{this.labels[e]=t.textContent;t.firstElementChild&&t.firstElementChild.classList.contains("dataTable-sorter")&&(t.innerHTML=t.firstElementChild.innerHTML);t.sortable="false"!==t.getAttribute("data-sortable");t.originalCellIndex=e;if(this.options.sortable&&t.sortable){const e=createElement("a",{href:"#",class:"dataTable-sorter",html:t.innerHTML});t.innerHTML="";t.setAttribute("data-sortable","");t.appendChild(e)}}));this.fixColumns()}bindEvents(){const t=this.options;if(t.perPageSelect){const e=this.wrapper.querySelector(".dataTable-selector");e&&e.addEventListener("change",(()=>{t.perPage=parseInt(e.value,10);this.update();this.fixHeight();this.emit("datatable.perpage",t.perPage)}),false)}if(t.searchable){this.input=this.wrapper.querySelector(".dataTable-input");this.input&&this.input.addEventListener("keyup",(()=>this.search(this.input.value)),false)}this.wrapper.addEventListener("click",(e=>{const s=e.target.closest("a");if(s&&"a"===s.nodeName.toLowerCase())if(s.hasAttribute("data-page")){this.page(s.getAttribute("data-page"));e.preventDefault()}else if(t.sortable&&s.classList.contains("dataTable-sorter")&&"false"!=s.parentNode.getAttribute("data-sortable")){this.columns().sort(this.headings.indexOf(s.parentNode));e.preventDefault()}}),false);window.addEventListener("resize",this.listeners.onResize)}onResize(){this.rect=this.container.getBoundingClientRect();this.rect.width&&this.fixColumns()}setColumns(t){t||this.data.forEach((t=>{Array.from(t.cells).forEach((t=>{t.data=t.innerHTML}))}));this.options.columns&&this.headings.length&&this.options.columns.forEach((t=>{Array.isArray(t.select)||(t.select=[t.select]);if(t.hasOwnProperty("render")&&"function"===typeof t.render){this.selectedColumns=this.selectedColumns.concat(t.select);this.columnRenderers.push({columns:t.select,renderer:t.render})}t.select.forEach((e=>{const s=this.headings[e];t.type&&s.setAttribute("data-type",t.type);t.format&&s.setAttribute("data-format",t.format);t.hasOwnProperty("sortable")&&s.setAttribute("data-sortable",t.sortable);t.hasOwnProperty("hidden")&&false!==t.hidden&&this.columns().hide([e]);t.hasOwnProperty("sort")&&1===t.select.length&&this.columns().sort(t.select[0],t.sort,true)}))}));if(this.hasRows){this.data.forEach(((t,e)=>{t.dataIndex=e;Array.from(t.cells).forEach((t=>{t.data=t.innerHTML}))}));this.selectedColumns.length&&this.data.forEach((t=>{Array.from(t.cells).forEach(((e,s)=>{this.selectedColumns.includes(s)&&this.columnRenderers.forEach((a=>{a.columns.includes(s)&&(e.innerHTML=a.renderer.call(this,e.data,e,t))}))}))}));this.columns().rebuild()}this.render("header")}destroy(){this.dom.innerHTML=this.initialLayout;this.dom.classList.remove("dataTable-table");this.wrapper.parentNode.replaceChild(this.dom,this.wrapper);this.initialized=false;window.removeEventListener("resize",this.listeners.onResize)}update(){this.wrapper.classList.remove("dataTable-empty");this.paginate(this);this.render("page");this.links=[];let t=this.pages.length;while(t--){const e=t+1;this.links[t]=button(0===t?"active":"",e,e)}this.sorting=false;this.render("pager");this.rows().update();this.emit("datatable.update")}paginate(){const t=this.options.perPage;let e=this.activeRows;if(this.searching){e=[];this.searchData.forEach((t=>e.push(this.activeRows[t])))}this.options.paging?this.pages=e.map(((s,a)=>a%t===0?e.slice(a,a+t):null)).filter((t=>t)):this.pages=[e];this.totalPages=this.lastPage=this.pages.length;return this.totalPages}fixColumns(){if((this.options.scrollY.length||this.options.fixedColumns)&&this.activeHeadings&&this.activeHeadings.length){let t;let e=false;this.columnWidths=[];if(this.dom.tHead){if(this.options.scrollY.length){e=createElement("thead");e.appendChild(createElement("tr"));e.style.height="0px";this.headerTable&&(this.dom.tHead=this.headerTable.tHead)}this.activeHeadings.forEach((t=>{t.style.width=""}));this.activeHeadings.forEach(((t,s)=>{const a=t.offsetWidth;const i=a/this.rect.width*100;t.style.width=`${i}%`;this.columnWidths[s]=a;if(this.options.scrollY.length){const t=createElement("th");e.firstElementChild.appendChild(t);t.style.width=`${i}%`;t.style.paddingTop="0";t.style.paddingBottom="0";t.style.border="0"}}));if(this.options.scrollY.length){const t=this.dom.parentElement;if(!this.headerTable){this.headerTable=createElement("table",{class:"dataTable-table"});const e=createElement("div",{class:"dataTable-headercontainer"});e.appendChild(this.headerTable);t.parentElement.insertBefore(e,t)}const s=this.dom.tHead;this.dom.replaceChild(e,s);this.headerTable.tHead=s;this.headerTable.parentElement.style.paddingRight=`${this.headerTable.clientWidth-this.dom.clientWidth+parseInt(this.headerTable.parentElement.style.paddingRight||"0",10)}px`;t.scrollHeight>t.clientHeight&&(t.style.overflowY="scroll")}}else{t=[];e=createElement("thead");const s=createElement("tr");Array.from(this.dom.tBodies[0].rows[0].cells).forEach((()=>{const e=createElement("th");s.appendChild(e);t.push(e)}));e.appendChild(s);this.dom.insertBefore(e,this.body);const a=[];t.forEach(((t,e)=>{const s=t.offsetWidth;const i=s/this.rect.width*100;a.push(i);this.columnWidths[e]=s}));this.data.forEach((t=>{Array.from(t.cells).forEach(((t,e)=>{this.columns(t.cellIndex).visible()&&(t.style.width=`${a[e]}%`)}))}));this.dom.removeChild(e)}}}fixHeight(){if(this.options.fixedHeight){this.container.style.height=null;this.rect=this.container.getBoundingClientRect();this.container.style.height=`${this.rect.height}px`}}
/**
     * Perform a search of the data set
     * @param  {string} query
     * @return {void}
     */search(t){if(!this.hasRows)return false;t=t.toLowerCase();this.currentPage=1;this.searching=true;this.searchData=[];if(!t.length){this.searching=false;this.update();this.emit("datatable.search",t,this.searchData);this.wrapper.classList.remove("search-results");return false}this.clear();this.data.forEach(((e,s)=>{const a=this.searchData.includes(e);const i=t.split(" ").reduce(((t,s)=>{let a=false;let i=null;let n=null;for(let t=0;t<e.cells.length;t++){i=e.cells[t];n=i.hasAttribute("data-content")?i.getAttribute("data-content"):i.textContent;if(n.toLowerCase().includes(s)&&this.columns(i.cellIndex).visible()){a=true;break}}return t&&a}),true);if(i&&!a){e.searchIndex=s;this.searchData.push(s)}else e.searchIndex=null}));this.wrapper.classList.add("search-results");if(this.searchData.length)this.update();else{this.wrapper.classList.remove("search-results");this.setMessage(this.options.labels.noResults)}this.emit("datatable.search",t,this.searchData)}
/**
     * Change page
     * @param  {int} page
     * @return {void}
     */page(t){if(t==this.currentPage)return false;isNaN(t)||(this.currentPage=parseInt(t,10));if(t>this.pages.length||t<0)return false;this.render("page");this.render("pager");this.emit("datatable.page",t)}
/**
     * Sort by column
     * @param  {int} column - The column no.
     * @param  {string} direction - asc or desc
     * @return {void}
     */sortColumn(t,e){this.columns().sort(t,e)}
/**
     * Add new row data
     * @param {object} data
     */insert(t){let e=[];if(isObject(t)){if(t.headings&&!this.hasHeadings&&!this.hasRows){const e=createElement("tr");t.headings.forEach((t=>{const s=createElement("th",{html:t});e.appendChild(s)}));this.head.appendChild(e);this.header=e;this.headings=[].slice.call(e.cells);this.hasHeadings=true;this.options.sortable=this.initialSortable;this.render("header");this.activeHeadings=this.headings.slice()}t.data&&Array.isArray(t.data)&&(e=t.data)}else Array.isArray(t)&&t.forEach((t=>{const s=[];Object.entries(t).forEach((([t,e])=>{const a=this.labels.indexOf(t);a>-1&&(s[a]=e)}));e.push(s)}));if(e.length){this.rows().add(e);this.hasRows=true}this.update();this.setColumns();this.fixColumns()}refresh(){if(this.options.searchable){this.input.value="";this.searching=false}this.currentPage=1;this.onFirstPage=true;this.update();this.emit("datatable.refresh")}
/**
     * Truncate the table
     * @param  {mixes} html - HTML string or HTMLElement
     * @return {void}
     */clear(t){this.body&&flush(this.body);let e=this.body;this.body||(e=this.dom);if(t){if("string"===typeof t){const e=document.createDocumentFragment();e.innerHTML=t}e.appendChild(t)}}
/**
     * Export table to various formats (csv, txt or sql)
     * @param  {Object} userOptions User options
     * @return {Boolean}
     */export(t){if(!this.hasHeadings&&!this.hasRows)return false;const e=this.activeHeadings;let s=[];const a=[];let i;let n;let l;let r;const h={download:true,skipColumn:[],lineDelimiter:"\n",columnDelimiter:",",tableName:"myTable",replacer:null,space:4};if(!isObject(t))return false;const o={...h,...t};if(o.type){"txt"!==o.type&&"csv"!==o.type||(s[0]=this.header);if(o.selection)if(isNaN(o.selection)){if(Array.isArray(o.selection))for(i=0;i<o.selection.length;i++)s=s.concat(this.pages[o.selection[i]-1])}else s=s.concat(this.pages[o.selection-1]);else s=s.concat(this.activeRows);if(s.length){if("txt"===o.type||"csv"===o.type){l="";for(i=0;i<s.length;i++){for(n=0;n<s[i].cells.length;n++)if(!o.skipColumn.includes(e[n].originalCellIndex)&&this.columns(e[n].originalCellIndex).visible()){let t=s[i].cells[n].textContent;t=t.trim();t=t.replace(/\s{2,}/g," ");t=t.replace(/\n/g,"  ");t=t.replace(/"/g,'""');t=t.replace(/#/g,"%23");t.includes(",")&&(t=`"${t}"`);l+=t+o.columnDelimiter}l=l.trim().substring(0,l.length-1);l+=o.lineDelimiter}l=l.trim().substring(0,l.length-1);o.download&&(l=`data:text/csv;charset=utf-8,${l}`)}else if("sql"===o.type){l=`INSERT INTO \`${o.tableName}\` (`;for(i=0;i<e.length;i++)!o.skipColumn.includes(e[i].originalCellIndex)&&this.columns(e[i].originalCellIndex).visible()&&(l+=`\`${e[i].textContent}\`,`);l=l.trim().substring(0,l.length-1);l+=") VALUES ";for(i=0;i<s.length;i++){l+="(";for(n=0;n<s[i].cells.length;n++)!o.skipColumn.includes(e[n].originalCellIndex)&&this.columns(e[n].originalCellIndex).visible()&&(l+=`"${s[i].cells[n].textContent}",`);l=l.trim().substring(0,l.length-1);l+="),"}l=l.trim().substring(0,l.length-1);l+=";";o.download&&(l=`data:application/sql;charset=utf-8,${l}`)}else if("json"===o.type){for(n=0;n<s.length;n++){a[n]=a[n]||{};for(i=0;i<e.length;i++)!o.skipColumn.includes(e[i].originalCellIndex)&&this.columns(e[i].originalCellIndex).visible()&&(a[n][e[i].textContent]=s[n].cells[i].textContent)}l=JSON.stringify(a,o.replacer,o.space);o.download&&(l=`data:application/json;charset=utf-8,${l}`)}if(o.download){o.filename=o.filename||"datatable_export";o.filename+=`.${o.type}`;l=encodeURI(l);r=document.createElement("a");r.href=l;r.download=o.filename;document.body.appendChild(r);r.click();document.body.removeChild(r)}return l}}return false}
/**
     * Import data to the table
     * @param  {Object} userOptions User options
     * @return {Boolean}
     */import(t){let e=false;const s={lineDelimiter:"\n",columnDelimiter:","};if(!isObject(t))return false;const a={...s,...t};if(a.data.length||isObject(a.data)){if("csv"===a.type){e={data:[]};const t=a.data.split(a.lineDelimiter);if(t.length){if(a.headings){e.headings=t[0].split(a.columnDelimiter);t.shift()}t.forEach(((t,s)=>{e.data[s]=[];const i=t.split(a.columnDelimiter);i.length&&i.forEach((t=>{e.data[s].push(t)}))}))}}else if("json"===a.type){const t=isJson(a.data);if(t){e={headings:[],data:[]};t.forEach(((t,s)=>{e.data[s]=[];Object.entries(t).forEach((([t,a])=>{e.headings.includes(t)||e.headings.push(t);e.data[s].push(a)}))}))}}isObject(a.data)&&(e=a.data);e&&this.insert(e)}return false}print(){const t=this.activeHeadings;const e=this.activeRows;const s=createElement("table");const a=createElement("thead");const i=createElement("tbody");const n=createElement("tr");t.forEach((t=>{n.appendChild(createElement("th",{html:t.textContent}))}));a.appendChild(n);e.forEach((t=>{const e=createElement("tr");Array.from(t.cells).forEach((t=>{e.appendChild(createElement("td",{html:t.textContent}))}));i.appendChild(e)}));s.appendChild(a);s.appendChild(i);const l=window.open();l.document.body.appendChild(s);l.print()}
/**
     * Show a message in the table
     * @param {string} message
     */setMessage(t){let e=1;this.hasRows?e=this.data[0].cells.length:this.activeHeadings.length&&(e=this.activeHeadings.length);this.wrapper.classList.add("dataTable-empty");this.label&&(this.label.innerHTML="");this.totalPages=0;this.render("pager");this.clear(createElement("tr",{html:`<td class="dataTables-empty" colspan="${e}">${t}</td>`}))}columns(t){return new Columns(this,t)}rows(t){return new Rows(this,t)}
/**
     * Add custom event listener
     * @param  {String} event
     * @param  {Function} callback
     * @return {Void}
     */on(t,e){this.events=this.events||{};this.events[t]=this.events[t]||[];this.events[t].push(e)}
/**
     * Remove custom event listener
     * @param  {String} event
     * @param  {Function} callback
     * @return {Void}
     */off(t,e){this.events=this.events||{};t in this.events!==false&&this.events[t].splice(this.events[t].indexOf(e),1)}
/**
     * Fire custom event
     * @param  {String} event
     * @return {Void}
     */emit(t){this.events=this.events||{};if(t in this.events!==false)for(let e=0;e<this.events[t].length;e++)this.events[t][e].apply(this,Array.prototype.slice.call(arguments,1))}}export{DataTable};

