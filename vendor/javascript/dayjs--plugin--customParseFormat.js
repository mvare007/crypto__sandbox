var t="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof self?self:global;var e={};!function(t,n){e=n()}(0,(function(){var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},n=/(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,r=/\d\d/,i=/\d\d?/,o=/\d*[^\s\d-_:/()]+/,f={},s=function(t){return(t=+t)+(t>68?1900:2e3)};var a=function(e){return function(n){(this||t)[e]=+n}},d=[/[+-]\d\d:?(\d\d)?|Z/,function(e){((this||t).zone||((this||t).zone={})).offset=function(t){if(!t)return 0;if("Z"===t)return 0;var e=t.match(/([+-]|\d\d)/g),n=60*e[1]+(+e[2]||0);return 0===n?0:"+"===e[0]?-n:n}(e)}],u=function(t){var e=f[t];return e&&(e.indexOf?e:e.s.concat(e.f))},h=function(t,e){var n,r=f.meridiem;if(r){for(var i=1;i<=24;i+=1)if(t.indexOf(r(i,0,e))>-1){n=i>12;break}}else n=t===(e?"pm":"PM");return n},l={A:[o,function(e){(this||t).afternoon=h(e,!1)}],a:[o,function(e){(this||t).afternoon=h(e,!0)}],S:[/\d/,function(e){(this||t).milliseconds=100*+e}],SS:[r,function(e){(this||t).milliseconds=10*+e}],SSS:[/\d{3}/,function(e){(this||t).milliseconds=+e}],s:[i,a("seconds")],ss:[i,a("seconds")],m:[i,a("minutes")],mm:[i,a("minutes")],H:[i,a("hours")],h:[i,a("hours")],HH:[i,a("hours")],hh:[i,a("hours")],D:[i,a("day")],DD:[r,a("day")],Do:[o,function(e){var n=f.ordinal,r=e.match(/\d+/);if((this||t).day=r[0],n)for(var i=1;i<=31;i+=1)n(i).replace(/\[|\]/g,"")===e&&((this||t).day=i)}],M:[i,a("month")],MM:[r,a("month")],MMM:[o,function(e){var n=u("months"),r=(u("monthsShort")||n.map((function(t){return t.substr(0,3)}))).indexOf(e)+1;if(r<1)throw new Error;(this||t).month=r%12||r}],MMMM:[o,function(e){var n=u("months").indexOf(e)+1;if(n<1)throw new Error;(this||t).month=n%12||n}],Y:[/[+-]?\d+/,a("year")],YY:[r,function(e){(this||t).year=s(e)}],YYYY:[/\d{4}/,a("year")],Z:d,ZZ:d};function c(t){var r,i;r=t,i=f&&f.formats;for(var o=(t=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var o=r&&r.toUpperCase();return n||i[r]||e[r]||i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,n){return e||n.slice(1)}))}))).match(n),d=o.length,m=0;m<d;m+=1){var M=o[m],Y=l[M],v=Y&&Y[0],D=Y&&Y[1];o[m]=D?{regex:v,parser:D}:M.replace(/^\[|\]$/g,"")}return function(t){for(var e={},n=0,r=0;n<d;n+=1){var i=o[n];if("string"==typeof i)r+=i.length;else{var f=i.regex,l=i.parser,m=t.substr(r),M=f.exec(m)[0];l.call(e,M),t=t.replace(M,"")}}return function(t){var e=t.afternoon;if(void 0!==e){var n=t.hours;e?n<12&&(t.hours+=12):12===n&&(t.hours=0),delete t.afternoon}}(e),e}}return function(e,n,r){r.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(s=e.parseTwoDigitYear);var i=n.prototype,o=i.parse;i.parse=function(e){var n=e.date,i=e.utc,d=e.args;(this||t).$u=i;var l=d[1];if("string"==typeof l){var m=!0===d[2],M=!0===d[3],Y=m||M,v=d[2];M&&(v=d[2]),f=this.$locale(),!m&&v&&(f=r.Ls[v]),(this||t).$d=function(t,e,n){try{if(["x","X"].indexOf(e)>-1)return new Date(("X"===e?1e3:1)*t);var r=c(e)(t),i=r.year,o=r.month,f=r.day,d=r.hours,l=r.minutes,m=r.seconds,M=r.milliseconds,Y=r.zone,v=new Date,D=f||(i||o?1:v.getDate()),p=i||v.getFullYear(),g=0;i&&!o||(g=o>0?o-1:v.getMonth());var L=d||0,y=l||0,w=m||0,$=M||0;return Y?new Date(Date.UTC(p,g,D,L,y,w,$+60*Y.offset*1e3)):n?new Date(Date.UTC(p,g,D,L,y,w,$)):new Date(p,g,D,L,y,w,$)}catch(t){return new Date("")}}(n,l,i),this.init(),v&&!0!==v&&((this||t).$L=this.locale(v).$L),Y&&n!=this.format(l)&&((this||t).$d=new Date("")),f={}}else if(l instanceof Array)for(var D=l.length,p=1;p<=D;p+=1){d[1]=l[p-1];var g=r.apply(this||t,d);if(g.isValid()){(this||t).$d=g.$d,(this||t).$L=g.$L,this.init();break}p===D&&((this||t).$d=new Date(""))}else o.call(this||t,e)}}}));var n=e;export{n as default};

