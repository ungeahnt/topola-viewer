(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{241:function(e){e.exports={"menu.load_from_url":"Otw\xf3rz URL","menu.load_from_file":"Otw\xf3rz plik","menu.print":"Drukuj","menu.download":"Pobierz","menu.pdf_file":"Plik PDF","menu.png_file":"Plik PNG","menu.svg_file":"Plik SVG","menu.github":"\u0179r\xf3d\u0142a na GitHub","intro.title":"Topola Genealogy","intro.description":"Topola Genealogy pozwala przegl\u0105da\u0107 drzewo genealogiczne w interaktywny spos\xf3b.","intro.instructions":"Kliknij OTW\xd3RZ URL lub OTW\xd3RZ PLIK, aby za\u0142adowa\u0107 plik GEDCOM. Wi\u0119kszo\u015b\u0107 program\xf3w genealogicznych posiada funkcj\u0119 eksportu do pliku GEDCOM.","intro.examples":"Poni\u017cej jest kilka przyk\u0142ad\xf3w znalezionych w Internecie:","intro.from":"\u017ar\xf3d\u0142o:","intro.privacy":"Prywatno\u015b\u0107","intro.privacy_note":'U\u017cywaj\u0105c funkcji "Otw\xf3rz plik", Twoje dane nie s\u0105 nigdzie wysy\u0142ane i pozostaj\u0105 na Twoim komputerze. U\u017cywaj\u0105c funkcji "Otw\xf3rz URL", dane z podanego adresu przesy\u0142ane s\u0105 przez us\u0142ug\u0119 {link} w celu umo\u017cliwienia za\u0142adowania danych z innej domeny (CORS).',"load_from_url.title":"Otw\xf3rz z adresu URL","load_from_url.comment":"Dane z podanego adresu URL zostan\u0105 za\u0142adowane poprzez us\u0142ug\u0119 {link} w celu unikni\u0119cia problem\xf3w z CORS.","load_from_url.cancel":"Anuluj","load_from_url.load":"Otw\xf3rz","gedcom.BAPM":"Chrzest","gedcom.BIRT":"Narodziny","gedcom.BURI":"Pogrzeb","gedcom.CHR":"Chrzest","gedcom.DEAT":"\u015amier\u0107","gedcom.EMAIL":"E-mail","gedcom.OCCU":"Zaw\xf3d","gedcom.TITL":"Tytu\u0142","gedcom.WWW":"Strona WWW"}},242:function(e,t){},281:function(e,t,n){e.exports=n(505)},293:function(e,t){},299:function(e,t){},499:function(e,t,n){},505:function(e,t,n){"use strict";n.r(t);var a=n(152),r=n(239),o=n(240),i=n(0),l=n(61),c=n(241),s=n(15),u=n(30),d=n(31),m=n(33),f=n(32),h=n(34),p=n(41),g=n(17),E=n(244),v=n.n(E),w=n(149),y=n(42);function b(){var e=g.select("#chart").node().parentElement;e.scrollLeft=-g.event.transform.x,e.scrollTop=-g.event.transform.y}function O(){var e=g.select("#chart").node().parentElement,t=e.scrollLeft+e.clientWidth/2,n=e.scrollTop+e.clientHeight/2;g.select(e).call(g.zoom().translateTo,t,n)}function k(e){var t=new FileReader;return t.readAsDataURL(e),new Promise(function(e,n){t.onload=function(t){return e(t.target.result)}})}function C(e){var t=new Image;return t.src=URL.createObjectURL(e),new Promise(function(e,n){t.addEventListener("load",function(){e(t)})})}function j(e){var t=document.createElement("canvas");t.width=2*e.width,t.height=2*e.height;var n=t.getContext("2d"),a=n.fillStyle;return n.fillStyle="white",n.fillRect(0,0,t.width,t.height),n.fillStyle=a,n.drawImage(e,0,0,t.width,t.height),t}var R=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(m.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).chart=void 0,n}return Object(h.a)(t,e),Object(d.a)(t,[{key:"renderChart",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{initialRender:!1};t.initialRender&&(g.select("#chart").node().innerHTML="",this.chart=Object(y.createChart)({json:this.props.data,chartType:y.HourglassChart,renderer:y.DetailedRenderer,svgSelector:"#chart",indiCallback:function(t){return e.props.onSelection(t)},animate:!0,updateSvgSize:!1,locale:this.context.intl.locale}));var n=this.chart.render({startIndi:this.props.selection.id,baseGeneration:this.props.selection.generation}),a=g.select("#chart"),r=a.node().parentElement;g.select(r).on("scroll",O).call(g.zoom().scaleExtent([1,1]).translateExtent([[0,0],n.size]).on("zoom",b));var o,i,l=r.clientWidth/2-n.origin[0],c=r.clientHeight/2-n.origin[1],s=g.max([0,(r.clientWidth-n.size[0])/2]),u=g.max([0,(r.clientHeight-n.size[1])/2]),d=a.transition().delay(200).duration(500);(t.initialRender?a:d).attr("transform","translate(".concat(s,", ").concat(u,")")).attr("width",n.size[0]).attr("height",n.size[1]),t.initialRender?(r.scrollLeft=-l,r.scrollTop=-c):d.tween("scrollLeft",(i=-l,function(){var e=g.interpolateNumber(r.scrollLeft,i);return function(t){r.scrollLeft=e(t)}})).tween("scrollTop",(o=-c,function(){var e=g.interpolateNumber(r.scrollTop,o);return function(t){r.scrollTop=e(t)}}))}},{key:"componentDidMount",value:function(){this.renderChart({initialRender:!0})}},{key:"componentDidUpdate",value:function(e){this.renderChart({initialRender:this.props.data!==e.data})}},{key:"render",value:function(){return i.createElement("div",{id:"svgContainer"},i.createElement("svg",{id:"chart"}))}},{key:"getSvgContents",value:function(){var e=document.getElementById("chart").cloneNode(!0);return e.removeAttribute("transform"),(new XMLSerializer).serializeToString(e)}},{key:"getSvgContentsWithInlinedImages",value:function(){var e=document.getElementById("chart").cloneNode(!0);return e.removeAttribute("transform"),function(e){var t=Array.from(e.getElementsByTagName("image")).map(function(e){var t=e.href&&e.href.baseVal;return t?fetch(t).then(function(e){return e.blob()}).then(k).then(function(t){e.href.baseVal=t}).catch(function(e){return console.warn("Failed to load image:",e)}):Promise.resolve()});return Promise.all(t)}(e).then(function(){return(new XMLSerializer).serializeToString(e)})}},{key:"print",value:function(){var e=this,t=document.createElement("iframe");t.style.position="absolute",t.style.top="-1000px",t.style.left="-1000px",t.onload=function(){t.contentDocument.open(),t.contentDocument.write(e.getSvgContents()),t.contentDocument.close(),setTimeout(function(){t.contentWindow.focus(),t.contentWindow.print(),t.parentNode.removeChild(t)},500)},document.body.appendChild(t)}},{key:"downloadSvg",value:function(){this.getSvgContentsWithInlinedImages().then(function(e){var t=new Blob([e],{type:"image/svg+xml"});Object(w.saveAs)(t,"topola.svg")})}},{key:"drawOnCanvas",value:function(){return this.getSvgContentsWithInlinedImages().then(function(e){return new Blob([e],{type:"image/svg+xml"})}).then(C).then(j)}},{key:"downloadPng",value:function(){this.drawOnCanvas().then(function(e){return function(e,t){return new Promise(function(n,a){e.toBlob(function(e){e?n(e):a()},t)})}(e,"image/png")}).then(function(e){return Object(w.saveAs)(e,"topola.png")})}},{key:"downloadPdf",value:function(){this.drawOnCanvas().then(function(e){var t=new v.a({orientation:e.width>e.height?"l":"p",unit:"pt",format:[e.width,e.height]});t.addImage(e,"PNG",0,0,e.width,e.height,"NONE"),t.save("topola.pdf")})}}]),t}(i.PureComponent);R.contextTypes={intl:s.d};var S=n(246),z=n.n(S),D=n(247),M=n.n(D),P=["BIRT","BAPM","CHR","DEAT","BURI"],T=["NAME","SEX","FAMC","FAMS","SOUR","NOTE"],L=new Map([["BAPM","Baptism"],["BIRT","Birth"],["BURI","Burial"],["CHR","Christening"],["DEAT","Death"],["EMAIL","E-mail"],["OCCU","Occupation"],["TITL","Title"],["WWW","WWW"]]);function I(e){return i.createElement(s.a,{id:"gedcom.".concat(e),defaultMessage:L.get(e)||e})}function _(e){return i.createElement(i.Fragment,null,e.map(function(e){return i.createElement(i.Fragment,null,i.createElement(M.a,{properties:{target:"_blank"}},e),i.createElement("br",null))}))}function U(e,t){var n=[],a=e.tree.find(function(e){return"DATE"===e.tag});a&&a.data&&n.push(function(e,t){var n=Object(y.getDate)(e),a=n&&n.date;return a?Object(y.formatDate)(a,t):e}(a.data,t));var r=e.tree.find(function(e){return"PLAC"===e.tag});return r&&r.data&&n.push(r.data),e.tree.filter(function(e){return"NOTE"===e.tag}).forEach(function(e){n.push(i.createElement("i",null,e.data))}),n.length?i.createElement(i.Fragment,null,i.createElement("div",{className:"ui sub header"},I(e.tag)),i.createElement("span",null,_(n))):null}function N(e){var t=[];return e.data&&t.push(e.data),t.length?i.createElement("i",null,_(t)):null}function A(e){return i.createElement("h2",{className:"ui header"},e.data.split("/").filter(function(e){return!!e}).map(function(e){return i.createElement(i.Fragment,null,e,i.createElement("br",null))}))}function x(e,t,n){return z()(t,function(t){return e.filter(function(e){return e.tag===t}).map(function(e){return n(e)})}).filter(function(e){return null!==e}).map(function(e){return i.createElement("div",{className:"ui segment"},e)})}function W(e){return e.filter(function(e){return!T.includes(e.tag)&&!P.includes(e.tag)}).map(function(e){return function(e){var t=[];return e.data&&t.push(e.data),e.tree.filter(function(e){return"NOTE"===e.tag}).forEach(function(e){t.push(i.createElement("i",null,e.data))}),t.length?i.createElement(i.Fragment,null,i.createElement("div",{className:"ui sub header"},I(e.tag)),i.createElement("span",null,_(t))):null}(e)}).filter(function(e){return null!==e}).map(function(e){return i.createElement("div",{className:"ui segment"},e)})}var F=function(e){function t(){return Object(u.a)(this,t),Object(m.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this,t=this.props.gedcom.indis[this.props.indi].tree;return i.createElement("div",{className:"ui segments",id:"details"},x(t,["NAME"],A),x(t,P,function(t){return U(t,e.context.intl.locale)}),W(t),x(t,["NOTE"],N))}}]),t}(i.Component);F.contextTypes={intl:s.d};var G=n(145);function B(e){return e.substring(1,e.length-1)}function H(e){var t=e.find(function(e){return"HEAD"===e.tag}),n={},a={};return e.forEach(function(e){"INDI"===e.tag?n[B(e.pointer)]=e:"FAM"===e.tag&&(a[B(e.pointer)]=e)}),{head:t,indis:n,fams:a}}function J(e,t){if(!e.children)return e;var n=e.children.sort(function(e){var t=new Map;return e.indis.forEach(function(e){t[e.id]=e}),function(e,n){var a,r,o=(a=e)<(r=n)?-1:a>r?1:0,i=t[e],l=t[n],c=i&&i.birth,s=l&&l.birth,u=c&&(c.date||c.dateRange&&c.dateRange.from),d=s&&(s.date||s.dateRange&&s.dateRange.from);return u&&u.year&&d&&d.year?u.year!==d.year?u.year-d.year:u.month&&d.month?u.month!==d.month?u.month-d.month:u.day&&d.day&&u.day!==d.day?u.month-d.month:o:o:o}}(t));return Object.assign({},e,{children:n})}function V(e){var t=e.fams.map(function(t){return J(t,e)});return Object.assign({},e,{fams:t})}function K(e){if(!e.imageUrl||e.imageUrl.startsWith("http"))return e;var t=Object.assign({},e);return delete t.imageUrl,t}function X(e){var t=e.indis.map(K);return Object.assign({},e,{indis:t})}function Z(e,t,n){return{id:t||e.indis[0].id,generation:n||0}}function q(e,t){var n=function(e){var t=Object(G.parse)(e),n=Object(y.gedcomEntriesToJson)(t);if(!n||!n.indis||!n.indis.length||!n.fams||!n.fams.length)throw new Error("Failed to read GEDCOM file");return{chartData:X(V(n)),gedcom:H(t)}}(e),a=JSON.stringify(n);try{sessionStorage.setItem(t,a)}catch(r){console.warn("Failed to store data in session storage: "+r)}return n}function Y(e,t){try{return Promise.resolve(function(e,t){var n=sessionStorage.getItem(e);if(n)return JSON.parse(n);if(!t)throw new Error("Error loading data. Please upload your file again.");return q(t,e)}(e,t))}catch(n){return Promise.reject(new Error("Failed to read GEDCOM file"))}}var Q=n(521),$=n(514);function ee(e){return i.createElement($.a,{to:{pathname:"/view",search:p.stringify({url:e.url})}},e.text)}function te(){return i.createElement(Q.a,{className:"intro"},i.createElement(Q.a.Content,null,i.createElement(Q.a.Header,null,i.createElement(s.a,{id:"intro.title",defaultMessage:"Topola Genealogy Viewer"}))),i.createElement(Q.a.Content,null,i.createElement("p",null,i.createElement(s.a,{id:"intro.description",defaultMessage:"Topola Genealogy is a genealogy tree viewer that lets you browse the structure of the family."})),i.createElement("p",null,i.createElement(s.a,{id:"intro.instructions",defaultMessage:"Use the LOAD FROM URL or LOAD FROM FILE buttons above to load a GEDCOM file. You can export a GEDCOM file from most of the existing genealogy programs and web sites."})),i.createElement("p",null,i.createElement(s.a,{id:"intro.examples",defaultMessage:"Here are some examples from the web that you can view:"})),i.createElement("ul",null,i.createElement("li",null,i.createElement(ee,{url:"http://genpol.com/module-Downloads-prep_hand_out-lid-32.html",text:"Karol Wojty\u0142a"})," ","(",i.createElement(s.a,{id:"intro.from",defaultMessage:"from"})," ",i.createElement("a",{href:"http://genpol.com/module-Downloads-display-lid-32.html"},"GENPOL"),")"),i.createElement("li",null,i.createElement(ee,{url:"https://webtreeprint.com/tp_downloader.php?path=famous_gedcoms/shakespeare.ged",text:"Shakespeare"})," ","(",i.createElement(s.a,{id:"intro.from",defaultMessage:"from"})," ",i.createElement("a",{href:"https://webtreeprint.com/tp_famous_gedcoms.php"},"webtreeprint.com"),")"),i.createElement("li",null,i.createElement(ee,{url:"http://genealogyoflife.com/tng/gedcom/HarryPotter.ged",text:"Harry Potter"})," ","(",i.createElement(s.a,{id:"intro.from",defaultMessage:"from"})," ",i.createElement("a",{href:"http://famousfamilytrees.blogspot.com/"},"Famous Family Trees"),")")),i.createElement("p",null,i.createElement("b",null,i.createElement(s.a,{id:"intro.privacy",defaultMessage:"Privacy"})),":",i.createElement(s.a,{id:"intro.privacy_note",defaultMessage:'When using the "load from file" option, this site does not send your data anywhere and files loaded from disk do not leave your computer. When using "load from URL", data is passed through the {link} service to deal with an issue with cross-site file loading in the browser (CORS).',values:{link:i.createElement("a",{href:"https://cors-anywhere.herokuapp.com/"},"cors-anywhere")}}))))}var ne=n(522),ae=n(531),re=n(517),oe=n(528),ie=n(530),le=n(525),ce=n(252),se=n.n(ce),ue=n(519),de=n(527),me=n(238),fe=n(518),he=n(516),pe=n(524),ge=n(523),Ee=n(520),ve=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(m.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={loadUrlDialogOpen:!1},n.inputRef=void 0,n}return Object(h.a)(t,e),Object(d.a)(t,[{key:"handleUpload",value:function(e){var t=this,n=e.target.files;if(n&&n.length){var a=new FileReader;a.onload=function(e){var n=e.target.result,a=se()(n);t.props.history.push({pathname:"/view",search:p.stringify({file:a}),state:{data:n}})},a.readAsText(n[0])}}},{key:"handleLoadFromUrl",value:function(){var e=this;this.setState(Object.assign({},this.state,{loadUrlDialogOpen:!0}),function(){return e.inputRef.focus()})}},{key:"handleClose",value:function(){this.setState(Object.assign({},this.state,{loadUrlDialogOpen:!1}))}},{key:"handleLoad",value:function(){this.setState(Object.assign({},this.state,{loadUrlDialogOpen:!1})),this.state.url&&this.props.history.push({pathname:"/view",search:p.stringify({url:this.state.url})})}},{key:"handleUrlChange",value:function(e){this.setState(Object.assign({},this.state,{url:e.target.value}))}},{key:"render",value:function(){var e=this,t=i.createElement(ue.a,{open:this.state.loadUrlDialogOpen,onClose:function(){return e.handleClose()},centered:!1},i.createElement(de.a,null,i.createElement(me.a,{name:"cloud download"}),i.createElement(s.a,{id:"load_from_url.title",defaultMessage:"Load from URL",children:function(e){return e}})),i.createElement(ue.a.Content,null,i.createElement(fe.a,{onSubmit:function(){return e.handleLoad()}},i.createElement(he.a,{placeholder:"https://",fluid:!0,onChange:function(t){return e.handleUrlChange(t)},ref:function(t){return e.inputRef=t}}),i.createElement("p",null,i.createElement(s.a,{id:"load_from_url.comment",defaultMessage:"Data from the URL will be loaded through {link} to avoid CORS issues.",values:{link:i.createElement("a",{href:"https://cors-anywhere.herokuapp.com/"},"cors-anywhere.herokuapp.com")}})))),i.createElement(ue.a.Actions,null,i.createElement(pe.a,{secondary:!0,onClick:function(){return e.handleClose()}},i.createElement(s.a,{id:"load_from_url.cancel",defaultMessage:"Cancel"})),i.createElement(pe.a,{primary:!0,onClick:function(){return e.handleLoad()}},i.createElement(s.a,{id:"load_from_url.load",defaultMessage:"Load"})))),n=this.props.showingChart?i.createElement(i.Fragment,null,i.createElement(ge.a.Item,{as:"a",onClick:function(){return e.props.onPrint()}},i.createElement(me.a,{name:"print"}),i.createElement(s.a,{id:"menu.print",defaultMessage:"Print"})),i.createElement(Ee.a,{trigger:i.createElement("div",null,i.createElement(me.a,{name:"download"}),i.createElement(s.a,{id:"menu.download",defaultMessage:"Download"})),className:"item"},i.createElement(Ee.a.Menu,null,i.createElement(Ee.a.Item,{onClick:function(){return e.props.onDownloadPdf()}},i.createElement(s.a,{id:"menu.pdf_file",defaultMessage:"PDF file"})),i.createElement(Ee.a.Item,{onClick:function(){return e.props.onDownloadPng()}},i.createElement(s.a,{id:"menu.png_file",defaultMessage:"PNG file"})),i.createElement(Ee.a.Item,{onClick:function(){return e.props.onDownloadSvg()}},i.createElement(s.a,{id:"menu.svg_file",defaultMessage:"SVG file"}))))):null;return i.createElement(ge.a,{attached:"top",inverted:!0,color:"blue",size:"large"},i.createElement($.a,{to:"/"},i.createElement(ge.a.Item,null,i.createElement("b",null,"Topola Genealogy"))),i.createElement(ge.a.Item,{as:"a",onClick:function(){return e.handleLoadFromUrl()}},i.createElement(me.a,{name:"cloud download"}),i.createElement(s.a,{id:"menu.load_from_url",defaultMessage:"Load from URL"})),i.createElement("input",{className:"hidden",type:"file",accept:".ged",id:"fileInput",onChange:function(t){return e.handleUpload(t)}}),i.createElement("label",{htmlFor:"fileInput"},i.createElement(ge.a.Item,{as:"a"},i.createElement(me.a,{name:"folder open"}),i.createElement(s.a,{id:"menu.load_from_file",defaultMessage:"Load from file"}))),n,i.createElement(ge.a.Item,{as:"a",href:"https://github.com/PeWu/topola-viewer",position:"right"},i.createElement(s.a,{id:"menu.github",defaultMessage:"Source on GitHub"})),t)}}]),t}(i.Component);function we(e){return i.createElement(ne.a,{negative:!0,className:"error"},i.createElement(ne.a.Header,null,"Failed to load file"),i.createElement("p",null,e.message))}var ye=function(e){function t(){var e,n;Object(u.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(m.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={loading:!1},n.chartRef=null,n.onSelection=function(e){var t=n.props.location,a=p.parse(t.search);a.indi=e.id,a.gen=String(e.generation),t.search=p.stringify(a),n.props.history.push(t)},n.renderMainArea=function(){return n.state.data&&n.state.selection?i.createElement("div",{id:"content"},i.createElement(R,{data:n.state.data.chartData,onSelection:n.onSelection,selection:n.state.selection,ref:function(e){return n.chartRef=e}}),n.state.showSidePanel?i.createElement(ae.a,{minWidth:768,id:"sidePanel"},i.createElement(F,{gedcom:n.state.data.gedcom,indi:n.state.selection.id})):null):n.state.error?i.createElement(we,{message:n.state.error}):i.createElement(re.a,{active:!0,size:"large"})},n}return Object(h.a)(t,e),Object(d.a)(t,[{key:"isNewData",value:function(e,t){return!(!e||e===this.state.hash)||!(!t||this.state.url===t)}},{key:"componentDidMount",value:function(){this.componentDidUpdate()}},{key:"componentDidUpdate",value:function(){var e=this;if("/view"===this.props.location.pathname){var t=this.props.location.state&&this.props.location.state.data,n=p.parse(this.props.location.search),a=function(e){var t=n[e];return"string"===typeof t?t:void 0},r=a("url"),o=a("indi"),i=Number(a("gen")),l=isNaN(i)?void 0:i,c=a("file"),s="false"!==a("handleCors"),u="false"!==a("sidePanel");if(r||c){if(this.isNewData(c,r)){(c?Y(c,t):function(e,t){var n=sessionStorage.getItem(e);if(n)return Promise.resolve(JSON.parse(n));var a=t?"https://cors-anywhere.herokuapp.com/"+e:e;return window.fetch(a).then(function(e){return 200!==e.status?Promise.reject(new Error(e.statusText)):e.text()}).then(function(t){return q(t,e)})}(r,s)).then(function(t){e.setState(Object.assign({},e.state,{data:t,hash:c,selection:Z(t.chartData,o,l),error:void 0,loading:!1,url:r,showSidePanel:u}))},function(t){e.setState(Object.assign({},e.state,{error:t.message,loading:!1}))}),this.setState(Object.assign({},this.state,{data:void 0,selection:void 0,hash:c,error:void 0,loading:!0,url:r}))}else if(this.state.data&&this.state.selection){var d=Z(this.state.data.chartData,o,l);this.state.selection.id===d.id&&this.state.selection.generation===d.generation||this.setState(Object.assign({},this.state,{selection:d}))}}else this.props.history.replace({pathname:"/"})}}},{key:"render",value:function(){var e=this;return i.createElement(i.Fragment,null,i.createElement(oe.a,{render:function(t){return i.createElement(ve,Object.assign({},t,{showingChart:!("/view"!==e.props.history.location.pathname||!e.state.data||!e.state.selection),onPrint:function(){return e.chartRef&&e.chartRef.print()},onDownloadPdf:function(){return e.chartRef&&e.chartRef.downloadPdf()},onDownloadPng:function(){return e.chartRef&&e.chartRef.downloadPng()},onDownloadSvg:function(){return e.chartRef&&e.chartRef.downloadSvg()}}))}}),i.createElement(ie.a,null,i.createElement(oe.a,{exact:!0,path:"/",component:te}),i.createElement(oe.a,{exact:!0,path:"/view",render:this.renderMainArea}),i.createElement(le.a,{to:"/"})))}}]),t}(i.Component),be=n(270),Oe=n(526);n(499),n(501),n(504);Object(s.c)([].concat(Object(a.a)(r),Object(a.a)(o)));var ke={pl:c},Ce=navigator.language&&navigator.language.split(/[-_]/)[0],je=Object(be.detect)();je&&"ie"===je.name?l.render(i.createElement("p",null,"Topola Genealogy Viewer does not support Internet Explorer. Please try a different browser."),document.querySelector("#root")):l.render(i.createElement(s.b,{locale:Ce,messages:ke[Ce]},i.createElement(Oe.a,null,i.createElement(oe.a,{component:ye}))),document.querySelector("#root"))}},[[281,2,1]]]);
//# sourceMappingURL=main.cf40cb68.chunk.js.map