(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{102:function(e,t,n){e.exports=n(138)},103:function(e,t,n){},138:function(e,t,n){"use strict";n.r(t);n(103);var r=n(55),a=n.n(r);a.a.updateLocale("en",{relativeTime:{future:"in %s",past:"%s ago",s:"%ds",ss:"%ds",m:"1m",mm:"%dm",h:"1h",hh:"%dh",d:"1d",dd:"%dd",M:"1M",MM:"%dM",y:"1y",yy:"%dY"}});var o=n(0),i=n.n(o),c=n(41),u=n.n(c),l=n(10),p=n(5),s=n(92),d=n(142).a.plugin({comment:function(e,t){return t.type,e}}),m=n(11),f=n(54),h=n.n(f),g=n(13),b=n.n(g),x=n(28),v=n(60),y="https://".concat(window.location.hostname,"/api"),w={get:function(){var e=Object(x.a)(b.a.mark(function e(t){var n,r,a,o,i=arguments;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=i.length>1&&void 0!==i[1]?i[1]:null,r={method:"GET",headers:Object(m.a)({},n&&{Authorization:"Bearer ".concat(n)})},e.next=4,fetch("".concat(y,"/").concat(t),r);case 4:return a=e.sent,e.next=7,a.json();case 7:if(o=e.sent,a.ok){e.next=10;break}throw Error(o.message);case 10:return e.abrupt("return",o);case 11:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),post:function(){var e=Object(x.a)(b.a.mark(function e(t,n){var r,a,o,i,c,u=arguments;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=u.length>2&&void 0!==u[2]?u[2]:null,a=n instanceof FormData,o={method:"POST",headers:Object(m.a)(Object(v.a)({},a?"balauca":"Content-Type","application/json"),r&&{Authorization:"Bearer ".concat(r)}),body:a?n:JSON.stringify(n)},e.next=5,fetch("".concat(y,"/").concat(t),o);case 5:return i=e.sent,e.next=8,i.json();case 8:if(c=e.sent,i.ok){e.next=12;break}throw 422===i.status&&c.errors.forEach(function(e){throw Error("".concat(e.param," ").concat(e.msg))}),Error(c.message);case 12:return e.abrupt("return",c);case 13:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}(),delete:function(){var e=Object(x.a)(b.a.mark(function e(t){var n,r,a,o,i=arguments;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=i.length>1&&void 0!==i[1]?i[1]:null,r={method:"DELETE",headers:Object(m.a)({"Content-Type":"application/json"},n&&{Authorization:"Bearer ".concat(n)})},e.next=4,fetch("".concat(y,"/").concat(t),r);case 4:return a=e.sent,e.next=7,a.json();case 7:if(o=e.sent,a.ok){e.next=12;break}if(401!==a.status){e.next=11;break}throw Error("unauthorized");case 11:throw Error(o.message);case 12:return e.abrupt("return",o);case 13:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()};function E(e,t){return O.apply(this,arguments)}function O(){return(O=Object(x.a)(b.a.mark(function e(t,n){var r;return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.post("login",{username:t,password:n});case 2:return r=e.sent,e.abrupt("return",r.token);case 4:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function k(e){return j.apply(this,arguments)}function j(){return(j=Object(x.a)(b.a.mark(function e(t){return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.post("pdf-menu",t,localStorage.token);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}var _,C=function(e,t){return function(){var n=Object(x.a)(b.a.mark(function n(r){var a;return b.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return r({type:"LOGIN_PENDING"}),localStorage.currentUsername=e,localStorage.currentPassword=t,n.prev=3,n.next=6,E(e,t);case 6:a=n.sent,r({type:"LOGIN_SUCCESS",token:a}),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(3),r({type:"LOGIN_ERROR",error:n.t0});case 13:case"end":return n.stop()}},n,this,[[3,10]])}));return function(e){return n.apply(this,arguments)}}()},I=localStorage.getItem("token"),N=I&&h()(I).user,S=Object(m.a)({},I&&{token:I},N&&{user:N}),L=localStorage.getItem("token"),D=L&&h()(L).user,T=Object(m.a)({},L&&{token:L},D&&{user:D}),U={dark:"true"===localStorage.getItem("dark")},R=function(){return function(e){e({type:"HIDE_ERROR"}),clearTimeout(_)}},z=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||p.d,B=Object(p.e)(Object(p.c)({form:d,auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN_PENDING":return Object(m.a)({},e,{loading:!0});case"LOGIN_SUCCESS":var n=h()(t.token).user;return Object(m.a)({},e,{loading:!1,token:t.token,user:n});case"LOGIN_ERROR":return Object(m.a)({},e,{loading:!1});case"LOGOUT":return Object(m.a)({},e,{token:null,user:null});default:return e}},theme:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U;switch((arguments.length>1?arguments[1]:void 0).type){case"TOGGLE_DARK_THEME":return Object(m.a)({},e,{dark:!e.dark});default:return e}},menu:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T;switch((arguments.length>1?arguments[1]:void 0).type){case"UPLOAD_PDF_PENDING":return Object(m.a)({},e,{loading:!0});case"UPLOAD_PDF_SUCCESS":case"UPLOAD_PDF_ERROR":return Object(m.a)({},e,{loading:!1});default:return e}}}),z(Object(p.a)(s.a,function(){return function(e){return function(t){"LOGIN_SUCCESS"===t.type?localStorage.setItem("token",t.token):"LOGOUT"===t.type&&localStorage.removeItem("token"),e(t)}}},function(e){return function(t){return function(n){switch(t(n),n.type){case"LOGIN_SUCCESS":case"LOGOUT":e.getState().error&&e.dispatch(R());break;case"LOGIN_ERROR":e.dispatch((r=n.error,function(e){e(function(e){return{type:"SHOW_ERROR",error:e}}(r)),clearTimeout(_),_=setTimeout(function(){return e({type:"HIDE_ERROR"})},5e3)}))}var r}}},function(){return function(e){return function(t){if("TOGGLE_DARK_THEME"===t.type){var n="true"===localStorage.getItem("dark");localStorage.setItem("dark",(!n).toString())}e(t)}}}))),P=n(3),F=n(143),G=n(100),M=n(144),A={error:"#f5222d",vote:"#b6b6b6",upvote:"#f9920b",downvote:"#2e70ff"},q=Object(m.a)({},A,{normalText:"#ffffff",mutedText:"#b0b8bf",border:"#333333",accent:"#7ac943",pageBackground:"#1b1b1b",voteButtonHover:"#383838",foreground:"#262626",activeBackground:"#333333",inputBackground:"#212121",shadow:"rgba(0, 0, 0, 0.4)",lightLogoDisplay:"inline-block",darkLogoDisplay:"none"}),H=Object(m.a)({},A,{normalText:"#454f5b",mutedText:"#818e99",border:"#ebedf0",accent:"#7ac943",pageBackground:"#f4f6f8",voteButtonHover:"#f2f2f2",foreground:"#ffffff",activeBackground:"#fafafa",inputBackground:"#fcfcfc",shadow:"rgba(0, 0, 0, 0.05)",darkLogoDisplay:"inline-block",lightLogoDisplay:"none"}),W=function(e){return e?q:H},J=n(65),K=Object(J.a)();K.listen(function(){B.getState().error&&B.dispatch(R())});var Y=K,Q=n(17);function V(){var e=Object(Q.a)(["\n  body {\n    background-color: ",";\n  }\n"]);return V=function(){return e},e}var X=Object(P.b)(V(),function(e){return e.theme.pageBackground});function Z(e){return Object(l.b)(function(e){return{hasSentSms:e.auth.hasSentSms,token:e.auth.token,user:e.auth.user}})(e)}var $=n(76);function ee(){var e=Object(Q.a)(["\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"]);return ee=function(){return e},e}function te(){var e=Object(Q.a)(["\n  ",";\n\n  text-underline-position: under;\n  text-decoration: none;\n  color: ",";\n\n  :hover {\n    ",";\n    color: ",";\n  }\n"]);return te=function(){return e},e}function ne(){var e=Object(Q.a)(["\n  display: flex;\n  align-items: center;\n  flex-shrink: 0;\n  padding: 0 16px;\n\n  @media (max-width: 425px) {\n    padding: 0 8px;\n  }\n"]);return ne=function(){return e},e}function re(){var e=Object(Q.a)(["\n  animation: "," 0.25s;\n"]);return re=function(){return e},e}function ae(){var e=Object(Q.a)(["\n  from { opacity: 0; }\n  to { opacity: 1; }\n"]);return ae=function(){return e},e}function oe(){var e=Object(Q.a)(["\n  ",";\n  font-weight: 700;\n  letter-spacing: 0.05em;\n"]);return oe=function(){return e},e}function ie(){var e=Object(Q.a)(["\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n"]);return ie=function(){return e},e}var ce=Object(P.c)(ie()),ue=Object(P.c)(oe(),ce),le=Object(P.e)(ae()),pe=Object(P.c)(re(),le),se=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r="transition: ";return t.forEach(function(e,n){r=r.concat("".concat(e," 0.1s ease").concat(n===t.length-1?";":", "))}),r},de=Object(P.c)(ne()),me=function(e){return Object(P.c)(te(),se("color"),function(e){return e.theme.normalText},e.underline&&"text-decoration: underline",function(e){return e.theme.accent})},fe=(Object(P.c)(ee()),Object(P.d)($.a).withConfig({displayName:"Logo",componentId:"sc-249q13-0"})(["",";margin-right:auto;font-size:24px;font-weight:500;color:",";text-decoration:none;@media (max-width:425px){padding:0 8px 0 16px;font-size:19px;}"],de,function(e){return e.theme.normalText})),he=P.d.img.withConfig({displayName:"Logo__LogoImgDark",componentId:"sc-249q13-1"})(["height:28px;margin-left:-8px;"]),ge=P.d.div.withConfig({displayName:"Logo__AdminText",componentId:"sc-249q13-2"})(["margin-left:12px;margin-bottom:2px;"]),be=function(e){return i.a.createElement(fe,{to:"/"},i.a.createElement(he,{src:"/logo.svg",alt:"Logo"}),i.a.createElement(ge,null,"Admin"))},xe=P.d.svg.withConfig({displayName:"Icon",componentId:"g1x02c-0"})(["width:20px;height:20px;& path{",";fill:",";}@media (max-width:425px){width:18px;height:18px;}"],se("fill"),function(e){return e.theme.mutedText}),ve=function(){return i.a.createElement(xe,{viewBox:"0 0 24 24"},i.a.createElement("path",{d:"M6.03569223,7.86020138e-11 C4.77338857,1.342144 4,3.14939605 4,5.13728269 C4,9.27941831 7.35786438,12.6372827 11.5,12.6372827 C13.4878866,12.6372827 15.2951387,11.8638941 16.6372827,10.6015905 C15.5809549,14.0943073 12.3374493,16.6372827 8.5,16.6372827 C3.80557963,16.6372827 0,12.8317031 0,8.13728269 C0,4.29983338 2.54297542,1.05632781 6.03569223,0 Z",transform:"translate(4 4)"}))},ye=P.d.span.withConfig({displayName:"Component__DarkButton",componentId:"zeaqya-0"})(["",";padding:0 8px;cursor:pointer;@media (hover:hover){:hover path{fill:",";}}"],de,function(e){return e.theme.accent}),we=function(e){return i.a.createElement(ye,{onClick:e.toggleDarkTheme},i.a.createElement(ve,null))},Ee={toggleDarkTheme:function(){return{type:"TOGGLE_DARK_THEME"}}},Oe=Object(l.b)(null,Ee)(we),ke=n(139),je=Object(P.d)(ke.a).attrs({activeClassName:"active"}).withConfig({displayName:"NavLink",componentId:"sc-1b663cz-0"})(["",";position:relative;::after{",";content:'';position:absolute;opacity:0;}&.","{background-color:",";::after{opacity:1;}}"],me,se("opacity"),"active",function(e){return e.theme.activeBackground}),_e=Object(P.d)(je).withConfig({displayName:"NavLink__HeaderNavLink",componentId:"sc-12ktzv3-0"})(["",";",";",";position:relative;cursor:pointer;color:",";::after{",";content:'';position:absolute;left:0;right:0;bottom:0;opacity:0;border-bottom:1px solid ",";}:hover::after{opacity:1;}&.active::after{left:0;right:0;bottom:0;border-bottom:3px solid ",";}"],de,ue,me,function(e){return e.theme.mutedText},se("opacity","border-bottom-width"),function(e){return e.theme.accent},function(e){return e.theme.accent}),Ce=P.d.span.withConfig({displayName:"Text__HeaderUsernameText",componentId:"sc-1k0baeb-0"})(["",";overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:",";"],ue,function(e){return e.theme.mutedText}),Ie=Object(P.d)(_e).withConfig({displayName:"UserInfo__Wrapper",componentId:"sc-1qhko3t-0"})(["flex-shrink:1;border-left:1px solid ",";border-right:1px solid ",";min-width:0;"],function(e){return e.theme.border},function(e){return e.theme.border}),Ne=function(e){var t=e.user;return i.a.createElement(Ie,{to:"/"},i.a.createElement("img",{src:t.logoUrl,style:{width:"43px",marginLeft:"-5px",marginRight:"15px"}}),i.a.createElement(Ce,null,t.name))},Se=P.d.header.withConfig({displayName:"Component__Wrapper",componentId:"sc-18f1zxm-0"})(["position:sticky;z-index:10;top:0;display:flex;align-items:stretch;margin-bottom:24px;box-shadow:0 4px 12px ",";border-bottom:1px solid ",";height:58px;padding:0 10vw;background-color:",";user-select:none;@media (max-width:425px){margin-bottom:16px;height:40px;}@media (max-width:768px){padding:0;}"],function(e){return e.theme.shadow},function(e){return e.theme.border},function(e){return e.theme.foreground}),Le=function(e){var t=e.user,n=e.logout;e.theme;return i.a.createElement(Se,null,i.a.createElement(be,null),i.a.createElement(Oe,null),t?i.a.createElement(i.a.Fragment,null,i.a.createElement(Ne,{user:t}),i.a.createElement(_e,{as:"span",onClick:n},"log out")):i.a.createElement(i.a.Fragment,null))},De={logout:function(){return{type:"LOGOUT"}}},Te=Object(p.d)(Z,Object(l.b)(null,De))(Le),Ue=n(23),Re=n(24),ze=n(26),Be=n(25),Pe=n(27),Fe=n(77),Ge=P.d.div.withConfig({displayName:"Message__ErrorNotificationMessage",componentId:"sc-1dzb00u-0"})(["",";position:relative;display:inline-block;padding:12px 32px;background-color:#ffffff;color:",";border-radius:2px;border:1px solid ",";box-shadow:0 4px 12px rgba(0,0,0,0.06);::after{content:'';position:absolute;top:0;left:0;right:0;border-top:2px solid ",";border-radius:2px 2px 0 0;}"],ce,function(e){return e.theme.error},function(e){return e.theme.border},function(e){return e.theme.error}),Me=P.d.div.withConfig({displayName:"Component__Wrapper",componentId:"sc-7rjtz8-0"})(["",";position:fixed;top:16px;left:0;right:0;z-index:100;text-align:center;pointer-events:none;&.","-enter{opacity:0;transform:translateY(-25%);}&.","-enter-active{opacity:1;transform:translateY(0);}&.","-exit{opacity:1;}&.","-exit-active{opacity:0;}"],se("opacity","transform"),"message","message","message","message"),Ae=function(e){function t(){return Object(Ue.a)(this,t),Object(ze.a)(this,Object(Be.a)(t).apply(this,arguments))}return Object(Pe.a)(t,e),Object(Re.a)(t,[{key:"render",value:function(){return i.a.createElement(Fe.TransitionGroup,{component:null},this.props.error&&i.a.createElement(Fe.CSSTransition,{classNames:"message",timeout:300},i.a.createElement(Me,null,i.a.createElement(Ge,null,this.props.error.message))))}}]),t}(i.a.Component),qe=Object(l.b)(function(e){return{error:e.error}})(Ae),He=n(140),We=n(141),Je=n(101),Ke=P.d.div.withConfig({displayName:"Wrapper__FormWrapper",componentId:"sc-1jgl4eu-0"})(["position:relative;overflow:hidden;margin:0 auto;border:1px solid ",";border-radius:2px;max-width:",";padding:24px;background-color:",";@media (max-width:768px){padding:16px;}@media (max-width:","){border-radius:0;border-left:none;border-right:none;}"],function(e){return e.theme.border},function(e){return e.wide?"600px":"375px"},function(e){return e.theme.foreground},function(e){return e.wide?"600px":"375px"}),Ye=Object(P.e)(["0%{transform:translate(-50%,-50%) rotate(0deg);}100%{transform:translate(-50%,-50%) rotate(360deg);}"]),Qe=P.d.div.withConfig({displayName:"Spinner__LoadingIndicatorSpinner",componentId:"uqgeym-0"})(["position:absolute;top:50%;left:50%;animation:"," 1s infinite linear;border:.3rem solid ",";border-top-color:",";border-radius:50%;width:48px;height:48px;"],Ye,function(e){return e.theme.accent+"4d"},function(e){return e.theme.accent}),Ve=P.d.form.withConfig({displayName:"Form__StyledForm",componentId:"sc-2m7omm-0"})(["",";display:flex;flex-direction:column;align-items:flex-start;",";"],se("filter"),function(e){return e.loading&&"filter: grayscale(0.5) blur(5px) opacity(0.6); pointer-events: none"}),Xe=function(e){var t=e.className,n=e.wide,r=Object(Je.a)(e,["className","wide"]);return i.a.createElement(Ke,{className:t,wide:n},i.a.createElement(Ve,r),r.loading&&i.a.createElement(Qe,null))},Ze=P.d.div.withConfig({displayName:"InputWrapper",componentId:"jjif2q-0"})(["position:relative;margin-bottom:24px;width:100%;"]),$e=P.d.label.withConfig({displayName:"Label",componentId:"vsdlnl-0"})(["",";display:block;margin-bottom:8px;color:",";"],ce,function(e){return e.theme.mutedText}),et=P.d.span.withConfig({displayName:"Error",componentId:"sc-107d0k-0"})(["",";",";position:absolute;right:0;top:0;color:",";"],pe,ce,function(e){return e.theme.error}),tt=P.d.div.withConfig({displayName:"SelectWrapper",componentId:"sc-1o9rmz1-0"})(["position:relative;",";::after{content:'';position:absolute;top:50%;right:0;transform:translate(-150%,calc(-50% - 2px)) rotate(45deg);border-bottom:2px solid ",";border-right:2px solid ",";width:8px;height:8px;pointer-events:none;}"],function(e){return e.flex&&"flex: 1"},function(e){return e.theme.accent},function(e){return e.theme.accent}),nt=P.d.input.withConfig({displayName:"Input",componentId:"sc-17rmcd0-0"})(["",";--border:",";--shadow:",";display:block;",";border-radius:3px;width:100%;padding:8px;background-color:",";font-size:15px;color:",";appearance:none;outline:none;resize:vertical;:hover,:focus{border:1px solid var(--border);}:focus{box-shadow:0 0 0 2px var(--shadow);}&[disabled]{opacity:0.6;cursor:default;box-shadow:none;border-color:",";}"],se("border","box-shadow"),function(e){return e.error?e.theme.error:e.theme.accent},function(e){return e.error?e.theme.error+"4d":e.theme.accent+"4d"},function(e){return e.error?"\n    border: 1px solid var(--border)\n    ":"\n    border: 1px solid ".concat(e.theme.border,"\n  ")},function(e){return e.theme.inputBackground},function(e){return e.theme.normalText},function(e){return e.theme.border});function rt(){var e=Object(Q.a)(["\n  ",";\n  ",";\n\n  display: block;\n  flex: 1 1 100%;\n  border: 1px solid ",";\n  width: 100%;\n  padding: 8px;\n  background: ",";\n  cursor: pointer;\n  text-align: center;\n  color: ",";\n  outline: 0;\n\n  @media (hover: hover) {\n    :hover {\n      background: ",";\n      color: #ffffff;\n    }\n  }\n\n  :first-of-type {\n    border-radius: 3px 0 0 3px;\n  }\n\n  :last-of-type {\n    border-radius: 0 3px 3px 0;\n  }\n\n  :not(:first-of-type) {\n    border-left: 0;\n  }\n"]);return rt=function(){return e},e}var at=P.d.label(rt(),se("color","background-color"),ue,function(e){return e.theme.accent},function(e){return e.active?e.theme.accent:"transparent"},function(e){return e.active?"#ffffff":e.theme.accent},function(e){return e.theme.accent}),ot=function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement("input",{type:"radio",name:"radiogroup",id:e.value,onChange:e.onClick}),i.a.createElement(at,{htmlFor:e.value,active:e.active},e.label))};function it(){var e=Object(Q.a)(["\n  display: flex;\n  align-items: center;\n  flex-wrap: nowrap;\n  \n  input[type=radio] {\n    display: none;\n  }\n"]);return it=function(){return e},e}var ct=P.d.div(it());var ut=function(e){var t=e.field;return i.a.createElement(ct,null,function(e){return e.options.map(function(t,n){return i.a.createElement(ot,Object.assign({},t,{active:e.input.value===t.value,onClick:function(n){return function(e,t,n){e.preventDefault(),n(t)}(n,t.value,e.input.onChange)},key:n}))})}(t))},lt=function(e){switch(e.type){case"select":return i.a.createElement(Ze,null,i.a.createElement($e,null,e.label),e.meta.touched&&e.meta.error&&i.a.createElement(et,null,e.meta.error),i.a.createElement(tt,null,i.a.createElement(nt,Object.assign({},e.input,{as:"select",type:"select",disabled:e.disabled}),e.children)));case"radiogroup":return i.a.createElement(Ze,null,i.a.createElement(ut,{field:e}));case"textarea":return i.a.createElement(Ze,null,i.a.createElement($e,null,e.label),e.meta.touched&&e.meta.error&&i.a.createElement(et,null,e.meta.error),i.a.createElement(nt,Object.assign({},e.input,{as:"textarea",rows:"6",error:e.meta.touched&&!!e.meta.error,placeholder:e.label})));default:return i.a.createElement(Ze,null,i.a.createElement($e,null,e.label),e.meta.touched&&e.meta.error&&i.a.createElement(et,null,e.meta.error),i.a.createElement(nt,Object.assign({},e.input,{error:e.meta.touched&&!!e.meta.error,type:e.type,placeholder:e.label,autoComplete:"off",style:e.style,disabled:e.disabled})))}},pt=function(e){return i.a.createElement(lt,e)},st=function(e,t){return e&&e.length<=t?void 0:"trebuie s\u0103 fie mai scurt\u0103 de ".concat(t," caractere")},dt=function(e,t){return e&&e.length>=t?void 0:"trebuie s\u0103 fie mai lung\u0103 de ".concat(t," caractere")},mt=function(e){return function(t){return st(t,e)}},ft=function(e){return function(t){return dt(t,e)}},ht=function(e){return e?void 0:"obligatoriu"},gt=(ft(7),mt(20),[ht,mt(32),function(e){return function(e){return/^[a-zA-Z0-9_-]+$/.test(e)?void 0:"con\u021bine caractere invalide"}(e)},function(e){return function(e){return e.trim()===e?void 0:"nu poate \xeencepe sau termina cu whitespace"}(e)}]),bt=[ht,ft(4),mt(72)],xt=n(62),vt=P.d.button.withConfig({displayName:"Button__StyledButton",componentId:"sc-1joizmw-0"})(["",";",";height:45px;border:0;border-radius:30px;padding:0 25px 0 25px;background:#7ac944;font-size:14px;font-weight:500;text-transform:uppercase;letter-spacing:0;color:#ffffff;cursor:pointer;outline:none;box-shadow:0 5px 30px rgba(255,255,255,0.05);transition:200ms;margin-top:16px;:hover{filter:brightness(110%);}:active{filter:brightness(90%);}:focus{box-shadow:0 0 0 2px ",";}&[disabled]{opacity:0.6;cursor:default;}"],se("filter","box-shadow"),ue,function(e){return e.theme.accent+"4d"}),yt=function(e){function t(){return Object(Ue.a)(this,t),Object(ze.a)(this,Object(Be.a)(t).apply(this,arguments))}return Object(Pe.a)(t,e),Object(Re.a)(t,[{key:"render",value:function(){var e=this.props,t=e.icon,n=e.text,r=e.onClick;return i.a.createElement(vt,{onClick:r},t&&i.a.createElement(xt.a,{color:"#fff",icon:t}),i.a.createElement("span",{style:{marginLeft:t?"8px":"0"}},n))}}]),t}(i.a.Component),wt=Object(P.d)(yt).withConfig({displayName:"SubmitButton",componentId:"sc-1cm20qm-0"})(["align-self:flex-end;"]),Et=function(e){function t(){var e,n;Object(Ue.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(ze.a)(this,(e=Object(Be.a)(t)).call.apply(e,[this].concat(a)))).onSubmit=function(e){var t=e.username,r=e.password;n.props.attemptLogin(t,r)},n}return Object(Pe.a)(t,e),Object(Re.a)(t,[{key:"componentDidMount",value:function(){this.redirectIfLoggedIn()}},{key:"componentDidUpdate",value:function(e,t,n){this.redirectIfLoggedIn()}},{key:"redirectIfLoggedIn",value:function(){this.props.token&&this.props.history.push("/")}},{key:"render",value:function(){return i.a.createElement(Xe,{loading:this.props.loading,onSubmit:this.props.handleSubmit(this.onSubmit)},i.a.createElement(We.a,{name:"username",label:"id restaurant",type:"text",component:pt,validate:gt}),i.a.createElement(We.a,{name:"password",label:"parol\u0103",type:"password",component:pt,validate:bt}),i.a.createElement(wt,{type:"submit",text:"Intr\u0103"}))}}]),t}(i.a.Component),Ot={attemptLogin:C},kt=Object(p.d)(Object(He.a)({form:"login"}),Z,Object(l.b)(function(e){return{loading:e.auth.loading}},Ot))(Et),jt=P.d.main.withConfig({displayName:"MainSection__HomeMainSection",componentId:"wu0gg-0"})(["flex:1;min-width:0;justify-content:center;align-items:center;display:flex;flex-direction:column;padding-top:24px;"]),_t=n(64),Ct=P.d.input.withConfig({displayName:"FileUploadButton__CustomInput",componentId:"yxuimm-0"})(["display:none;"]),It=P.d.div.withConfig({displayName:"FileUploadButton__ButtonWrapper",componentId:"yxuimm-1"})(["margin-top:32px;margin-bottom:16px;"]),Nt=P.d.label.withConfig({displayName:"FileUploadButton__CustomLabel",componentId:"yxuimm-2"})(["",";",";height:100%;border:0;border-radius:30px;padding:15px 25px;padding-bottom:14px;background:#7ac944;font-size:14px;font-weight:500;font-family:Arial;text-transform:uppercase;letter-spacing:0;color:#ffffff;cursor:pointer;outline:none;box-shadow:0 5px 30px rgba(255,255,255,0.05);transition:200ms;margin-bottom:16px;:hover{filter:brightness(110%);}:active{filter:brightness(90%);}:focus{box-shadow:0 0 0 2px ",";}&[disabled]{opacity:0.6;cursor:default;}"],se("filter","box-shadow"),ue,function(e){return e.theme.accent+"4d"}),St=function(e){function t(){return Object(Ue.a)(this,t),Object(ze.a)(this,Object(Be.a)(t).apply(this,arguments))}return Object(Pe.a)(t,e),Object(Re.a)(t,[{key:"render",value:function(){var e=this.props,t=e.text,n=e.onFileSelected,r=e.disabled;return i.a.createElement(It,{disabled:r,style:{opacity:r?.6:1,pointerEvents:r?"none":"auto"}},i.a.createElement(Nt,{htmlFor:"file-upload",className:"custom-file-upload"},i.a.createElement(xt.a,{style:{marginRight:"8px"},color:"#fff",icon:_t.b}),i.a.createElement("i",{className:"fa fa-cloud-upload"})," ",t),i.a.createElement(Ct,{accept:"application/pdf",onChange:n,onClick:function(e){return e.target.value=null},id:"file-upload",type:"file"}))}}]),t}(o.Component),Lt=n(98),Dt=n.n(Lt),Tt=P.d.div.withConfig({displayName:"Component__Wrapper",componentId:"sc-1vpqgnu-0"})(["display:flex;align-items:flex-start;margin:0 10vw;@media (max-width:1024px){margin:0 5vw;}@media (max-width:768px){display:block;margin:0;}"]),Ut=P.d.div.withConfig({displayName:"Component__PreviewWrapper",componentId:"sc-1vpqgnu-1"})(["display:flex;flex:1;align-items:flex-start;"]),Rt=P.d.div.withConfig({displayName:"Component__Panel",componentId:"sc-1vpqgnu-2"})(["display:flex;flex:1;background-color:#fff;border-radius:8px;padding:16px;padding-right:26px;flex-direction:column;align-items:flex-start;margin-right:32px;margin-bottom:32px;box-shadow:0 4px 12px rgba(0,0,0,0.05);"]),zt=P.d.span.withConfig({displayName:"Component__Title",componentId:"sc-1vpqgnu-3"})(["color:#818e99;text-transform:uppercase;font-size:12px;font-weight:600;font-weight:700;letter-spacing:0.05em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-bottom:8px;"]),Bt=P.d.span.withConfig({displayName:"Component__InfoLineTitle",componentId:"sc-1vpqgnu-4"})(["color:#818e99;font-size:12px;font-weight:600;overflow:hidden;"]),Pt=P.d.span.withConfig({displayName:"Component__InfoLineValue",componentId:"sc-1vpqgnu-5"})(["margin-bottom:16px;"]),Ft=function(e){function t(){var e,n;Object(Ue.a)(this,t);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(n=Object(ze.a)(this,(e=Object(Be.a)(t)).call.apply(e,[this].concat(a)))).uploadSelectedFile=function(e){var t=e.target.files[0],r=new FormData;r.append("menu",t),n.props.uploadPdf(r)},n}return Object(Pe.a)(t,e),Object(Re.a)(t,[{key:"componentDidMount",value:function(){this.redirectIfNotLoggedIn()}},{key:"componentDidUpdate",value:function(){this.redirectIfNotLoggedIn()}},{key:"redirectIfNotLoggedIn",value:function(){var e=this.props,t=e.token,n=e.history;t||n.push("/login")}},{key:"render",value:function(){var e=this.props,t=e.user,n=e.token,r=e.loadingUpload;return n?(console.log("user",t),i.a.createElement(Tt,null,i.a.createElement(jt,null,i.a.createElement(Ut,null,i.a.createElement(Rt,{style:{opacity:r?.3:1}},i.a.createElement(Bt,null,"Data \xeenc\u0103rc\u0103rii ultimului meniu"),i.a.createElement(Pt,null,t.pdfUploadDate?a()(t.pdfUploadDate).format("DD MMM @ HH:mm"):"-"),i.a.createElement(Bt,null,"Numele fi\u0219ierului "),i.a.createElement(Pt,null,t.pdfOriginalName||"-"),i.a.createElement(Bt,null,"M\u0103rime fi\u0219ier"),i.a.createElement(Pt,{style:{marginBottom:0}},t.pdfSize?(t.pdfSize/1024e3).toFixed(2)+"MB":"-"),r&&i.a.createElement(Pt,{style:{marginBottom:0,marginTop:"16px"}},"Se \xeencarc\u0103...")),i.a.createElement(Rt,{style:{opacity:r?.3:1}},i.a.createElement(zt,null,"Previzualizare meniu curent (iPhone 8)"),i.a.createElement("iframe",{width:"375px",height:"600px",src:t.pdfUrl}),i.a.createElement(St,{disabled:r,onFileSelected:this.uploadSelectedFile,text:r?"Se incarc\u0103...":"\xcencarc\u0103 meniu nou (PDF)"})),i.a.createElement(Rt,{style:{opacity:r?.3:1}},i.a.createElement(zt,null,"Codul t\u0103u QR"),t.pdfUrl?i.a.createElement(Dt.a,{value:"touchfreemenu.ro/".concat(t.username)}):i.a.createElement("span",null,"\xcencarc\u0103 prima dat\u0103 un meniu pentru a putea vedea codul QR."),t.pdfUrl&&i.a.createElement(yt,{onClick:function(){return window.open("https://touchfreemenu.ro/".concat(t.username),"_blank")},text:"Deschide",icon:_t.a})))))):null}}]),t}(o.Component),Gt={uploadPdf:function(e){return function(){var t=Object(x.a)(b.a.mark(function t(n){var r,a;return b.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n({type:"UPLOAD_PDF_PENDING"}),t.prev=1,t.next=4,k(e);case 4:r=t.sent,a=r.pdfUrl,C(localStorage.currentUsername,localStorage.currentPassword)(n),alert("Noul meniu a fost \xeenc\u0103rcat cu succes!"),n({type:"UPLOAD_PDF_SUCCESS",pdfUrl:a}),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(1),alert("A ap\u0103rut o eroare la \xeenc\u0103rcarea noului meniu!"),n({type:"UPLOAD_PDF_ERROR",error:t.t0});case 15:case"end":return t.stop()}},t,this,[[1,11]])}));return function(e){return t.apply(this,arguments)}}()}},Mt=Object(p.d)(Object(He.a)({form:"login"}),Z,Object(l.b)(function(e){return{loading:e.auth.loading,loadingUpload:e.menu.loading}},Gt))(Ft),At=function(e){return i.a.createElement(P.a,{theme:W(e.dark)},i.a.createElement(F.a,{history:Y},i.a.createElement(i.a.Fragment,null,i.a.createElement(X,null),i.a.createElement(G.a,{component:Te}),i.a.createElement(G.a,{component:qe}),i.a.createElement(M.a,null,i.a.createElement(G.a,{path:"/login",component:kt}),i.a.createElement(G.a,{path:"/",component:Mt})))))},qt=Object(l.b)(function(e){return{dark:e.theme.dark}})(At);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(i.a.createElement(l.a,{store:B},i.a.createElement(qt,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[102,1,2]]]);
//# sourceMappingURL=main.8c98173d.chunk.js.map