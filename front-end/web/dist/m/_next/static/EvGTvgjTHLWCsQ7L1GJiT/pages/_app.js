(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"/0+H":function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n("q1tI")),o=n("lwAK");function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,a=void 0!==r&&r,o=e.hasQuery;return n||a&&(void 0!==o&&o)}t.isInAmpMode=i,t.useAmp=function(){return i(a.default.useContext(o.AmpStateContext))}},1:function(e,t,n){n("74v/"),e.exports=n("nOHt")},"74v/":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return n("hUgY")}])},"8Kt/":function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n("q1tI")),o=r(n("Xuae")),i=n("lwAK"),c=n("FYa8"),u=n("/0+H");function l(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[a.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(a.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function s(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}t.defaultHead=l;var p=["name","httpEquiv","charSet","itemProp"];function f(e,t){return e.reduce((function(e,t){var n=a.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(s,[]).reverse().concat(l(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(a){var o=!0;if(a.key&&"number"!==typeof a.key&&a.key.indexOf("$")>0){var i=a.key.slice(a.key.indexOf("$")+1);e.has(i)?o=!1:e.add(i)}switch(a.type){case"title":case"base":t.has(a.type)?o=!1:t.add(a.type);break;case"meta":for(var c=0,u=p.length;c<u;c++){var l=p[c];if(a.props.hasOwnProperty(l))if("charSet"===l)n.has(l)?o=!1:n.add(l);else{var s=a.props[l],f=r[l]||new Set;f.has(s)?o=!1:(f.add(s),r[l]=f)}}}return o}}()).reverse().map((function(e,t){var n=e.key||t;return a.default.cloneElement(e,{key:n})}))}var d=o.default();function m(e){var t=e.children;return a.default.createElement(i.AmpStateContext.Consumer,null,(function(e){return a.default.createElement(c.HeadManagerContext.Consumer,null,(function(n){return a.default.createElement(d,{reduceComponentsToState:f,handleStateChange:n,inAmpMode:u.isInAmpMode(e)},t)}))}))}m.rewind=d.rewind,t.default=m},Bnag:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},EbDI:function(e,t){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},Ijbi:function(e,t,n){var r=n("WkPL");e.exports=function(e){if(Array.isArray(e))return r(e)}},RIqP:function(e,t,n){var r=n("Ijbi"),a=n("EbDI"),o=n("ZhPi"),i=n("Bnag");e.exports=function(e){return r(e)||a(e)||o(e)||i()}},Xuae:function(e,t,n){"use strict";var r=n("lwsE"),a=n("PJYZ"),o=n("W8MJ"),i=n("7W2i"),c=n("a1gu"),u=n("Nsbk"),l=n("RIqP");function s(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=u(e);if(t){var a=u(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return c(this,n)}}Object.defineProperty(t,"__esModule",{value:!0});var p=n("q1tI"),f=!1;t.default=function(){var e,t=new Set;function n(n){e=n.props.reduceComponentsToState(l(t),n.props),n.props.handleStateChange&&n.props.handleStateChange(e)}return(function(c){i(l,c);var u=s(l);function l(e){var o;return r(this,l),o=u.call(this,e),f&&(t.add(a(o)),n(a(o))),o}return o(l,null,[{key:"rewind",value:function(){var n=e;return e=void 0,t.clear(),n}}]),o(l,[{key:"componentDidMount",value:function(){t.add(this),n(this)}},{key:"componentDidUpdate",value:function(){n(this)}},{key:"componentWillUnmount",value:function(){t.delete(this),n(this)}},{key:"render",value:function(){return null}}]),l}(p.Component))}},hUgY:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return E}));var r=n("q1tI"),a=n.n(r),o=n("8Kt/"),i=n.n(o),c=n("wx14"),u=(n("17x9"),n("H2TA")),l={WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",boxSizing:"border-box"},s=function(e){return Object(c.a)({color:e.palette.text.primary},e.typography.body2,{backgroundColor:e.palette.background.default,"@media print":{backgroundColor:e.palette.common.white}})};var p=Object(u.a)((function(e){return{"@global":{html:l,"*, *::before, *::after":{boxSizing:"inherit"},"strong, b":{fontWeight:e.typography.fontWeightBold},body:Object(c.a)({margin:0},s(e),{"&::backdrop":{backgroundColor:e.palette.background.default}})}}}),{name:"MuiCssBaseline"})((function(e){var t=e.children,n=void 0===t?null:t;return e.classes,r.createElement(r.Fragment,null,n)})),f=n("rePB"),d=n("edxh"),m=n("viY9"),h=n("OKji"),v=n("aXM8"),y=n("hfi/");var b=function(e){var t=e.children,n=e.theme,r=Object(v.a)(),o=a.a.useMemo((function(){var e=null===r?n:function(e,t){return"function"===typeof t?t(e):Object(c.a)({},e,{},t)}(r,n);return null!=e&&(e[y.a]=null!==r),e}),[n,r]);return a.a.createElement(h.a.Provider,{value:o},t)},g=a.a.createElement;function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function F(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){Object(f.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var O=Object(m.a)({palette:{primary:{main:"#796E63",light:d.a[50]},secondary:{main:"#D70D26"},common:{black:"#131313"}},spacing:8,overrides:{MuiPaper:{elevation1:{boxShadow:"0px 30px 81px #2121211C"},rounded:{borderRadius:"2px"}},MuiSnackbar:{anchorOriginTopRight:{"@media (min-width: 600px)":{top:"60px",left:"200px"}}}}}),x={charts:{color:"#008AFF3D",series:{color:"#008AFF"},colors:{orange:{main:"#FFA200",light:"#FFB33A3D"},skyBlue:{main:"#23B4FF",light:"#23B4FF3D"},purple:{main:"#B134FF",light:"#B134FF3D"},blue:{main:"#4278FF",light:"#4278FF3D"},cyan:{main:"#00CDF0",light:"#3BFFE33D"}}},colors:{blue:"#0062FF",skyBlue:"#00D2FF",deepSkyBlue:"#009DBE",green:"#0CC73B",red:"#D70D26",orange:"#FFA200",deepOrange:"#C67E00",grey:"#BDBDBD",deepGrey:"#757575",purple:"#B134FF",cyan:"#00CDF0"}},j=function(e){var t=e.children;return g(b,{theme:F(F({},O),x)},g(p,null),t)},k=a.a.createElement,S=function(e){var t=e.children;return k(j,null,t)},D=n("XwMy"),C=a.a.createElement;function E(e){var t=e.Component,n=e.pageProps;return a.a.useEffect((function(){var e=document.querySelector("#jss-server-side");e&&e.parentElement&&e.parentElement.removeChild(e)}),[]),C(a.a.Fragment,null,C(i.a,null,C("title",null,"\u773c\u955c\u5b9a\u5236"),C("meta",{name:"viewport",content:"minimum-scale=1, initial-scale=1, width=device-width"}),C("link",{rel:"manifest",href:"".concat(D.b,"/manifest.json?v=1")}),C("link",{rel:"icon",type:"image/x-icon",href:"".concat(D.b,"/favicon.ico")}),C("link",{rel:"apple-touch-icon",href:"".concat(D.b,"/static/pwa.png")}),C("meta",{name:"viewport",content:"width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui"}),C("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),C("meta",{name:"full-screen",content:"yes"}),C("meta",{name:"x5-fullscreen",content:"true"}),C("meta",{content:"telephone=no",name:"format-detection"}),C("meta",{content:"email=no",name:"format-detection"}),C("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"}),C("script",{type:"text/javascript",src:"https://res.wx.qq.com/open/js/jweixin-1.6.0.js"})),C(S,null,C(p,null),C(t,n)))}},lwAK:function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n("q1tI"));t.AmpStateContext=a.createContext({})}},[[1,0,1,2,3]]]);