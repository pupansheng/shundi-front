(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/pwd/modify"],{"1bb2":function(e,t,n){"use strict";(function(e,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n("2f62"),a=s(n("f42b"));function s(e){return e&&e.__esModule?e:{default:e}}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){u(e,t,n[t])})}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=function(){return n.e("components/cmd-nav-bar/cmd-nav-bar").then(n.bind(null,"c3a4"))},l=function(){return n.e("components/cmd-page-body/cmd-page-body").then(n.bind(null,"45f9"))},d=function(){return n.e("components/cmd-transition/cmd-transition").then(n.bind(null,"be96"))},f=function(){return n.e("components/cmd-input/cmd-input").then(n.bind(null,"3ede"))},m={components:{cmdNavBar:c,cmdPageBody:l,cmdTransition:d,cmdInput:f},computed:r({},(0,i.mapState)(["serverUrl"])),data:function(){return{mobile:{phone:"",code:"",passwordOne:"",passwordTwo:""},passwordReg:/^\w+$/,phoneReg:/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,safety:{time:60,state:!1,interval:""},modifyMobile:!1}},watch:{mobile:{handler:function(e){this.phoneReg.test(e.phone)&&6==e.code.length&&e.passwordOne.length>=8&&e.passwordOne==e.passwordTwo?this.modifyMobile=!0:this.modifyMobile=!1},deep:!0}},methods:{fnModify:function(){this.mobile.code;var t=this.mobile.phone,n=this.mobile.passwordOne,i={};i.phone=t,i.password=n,this.mobile.passwordOne!=this.mobile.passwordTwo&&this.mobile.passwordOne?e.showToast({title:"两次密码不一致！",image:"../../static/img/alert-3.png",duration:3e3}):""!=this.mobile.phone&&""!=this.mobile.code?(e.showLoading({title:"更新中"}),e.request({url:this.serverUrl+"/user/update/resetpassword/"+this.mobile.phone+"/"+this.mobile.code,method:"POST",data:i,header:{"content-type":"application/json"},success:function(t){e.hideLoading(),t.data.status?(e.showToast({title:"更新成功：",image:"../../static/img/alert-2.png",duration:3e3}),e.switchTab({url:"../user/user"})):(console.log(o(t.data.message," at pages\\pwd\\modify.vue:143")),e.showToast({title:"更新失败！",image:"../../static/img/alert-3.png",duration:3e3}))},fail:function(t){e.hideLoading(),e.showToast({title:"更新失败！",image:"../../static/img/alert-3.png",duration:3e3})}})):e.showToast({title:"验证码和手机号不能为空！",image:"../../static/img/alert-3.png",duration:3e3})},fnGetPhoneCode:function(){var t=this;this.phoneReg.test(this.mobile.phone)?e.showToast({title:"正在发送验证码",icon:"loading",success:function(){var n={};n.url="/message/getYanzhengma/"+t.mobile.phone+"/update",a.default.get(n).then(function(n){e.showToast({icon:"none",title:"发送成功"}),t.safety.state=!0,t.safety.interval=setInterval(function(){t.safety.time--<=0&&(t.safety.time=60,t.safety.state=!1,clearInterval(t.safety.interval))},1e3)},function(t){e.showToast({icon:"none",title:"发送失败:"+t})})}}):e.showToast({title:"手机号不正确",icon:"none"})},beforeDestroy:function(){clearInterval(this.safety.interval)}}};t.default=m}).call(this,n("6e42")["default"],n("0de9")["default"])},"25e6":function(e,t,n){"use strict";(function(e){n("daa0"),n("921b");o(n("66fd"));var t=o(n("8076"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},8076:function(e,t,n){"use strict";n.r(t);var o=n("88d6"),i=n("ea43");for(var a in i)"default"!==a&&function(e){n.d(t,e,function(){return i[e]})}(a);n("95d6");var s,r=n("f0c5"),u=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);t["default"]=u.exports},"88d6":function(e,t,n){"use strict";var o,i=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){!e.safety.state&&e.fnGetPhoneCode()})},a=[];n.d(t,"b",function(){return i}),n.d(t,"c",function(){return a}),n.d(t,"a",function(){return o})},"95d6":function(e,t,n){"use strict";var o=n("aeb9"),i=n.n(o);i.a},aeb9:function(e,t,n){},ea43:function(e,t,n){"use strict";n.r(t);var o=n("1bb2"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);t["default"]=i.a}},[["25e6","common/runtime","common/vendor"]]]);