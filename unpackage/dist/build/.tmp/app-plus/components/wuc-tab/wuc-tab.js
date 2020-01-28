(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/wuc-tab/wuc-tab"],{a52a:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={name:"wuc-tab",data:function(){return{}},props:{tabList:{type:Array,default:function(){return[]}},tabCur:{type:Number,default:function(){return 0}},tabClass:{type:String,default:function(){return""}},tabStyle:{type:String,default:function(){return""}},textFlex:{type:Boolean,default:function(){return!1}},selectClass:{type:String,default:function(){return"text-blue"}}},methods:{tabSelect:function(t,e){if(this.currentTab===t)return!1;this.$emit("update:tabCur",t),this.$emit("change",t)}},computed:{scrollLeft:function(){return 60*(this.tabCur-1)}}};e.default=u},b14d:function(t,e,n){},c27e:function(t,e,n){"use strict";n.r(e);var u=n("de5f"),r=n("eabb");for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);n("da02");var c,f=n("f0c5"),i=Object(f["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);e["default"]=i.exports},da02:function(t,e,n){"use strict";var u=n("b14d"),r=n.n(u);r.a},de5f:function(t,e,n){"use strict";var u,r=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",function(){return r}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return u})},eabb:function(t,e,n){"use strict";n.r(e);var u=n("a52a"),r=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,function(){return u[t]})}(a);e["default"]=r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/wuc-tab/wuc-tab-create-component',
    {
        'components/wuc-tab/wuc-tab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("c27e"))
        })
    },
    [['components/wuc-tab/wuc-tab-create-component']]
]);
