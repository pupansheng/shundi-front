(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myPackage/myPackage"],{"0b66":function(e,t,n){"use strict";n.r(t);var a=n("64b4"),u=n("47f6");for(var o in u)"default"!==o&&function(e){n.d(t,e,function(){return u[e]})}(o);n("bd08"),n("2071");var i,c=n("f0c5"),s=Object(c["a"])(u["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);t["default"]=s.exports},2071:function(e,t,n){"use strict";var a=n("34a0"),u=n.n(a);u.a},"34a0":function(e,t,n){},"47f6":function(e,t,n){"use strict";n.r(t);var a=n("5c32"),u=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t["default"]=u.a},"5c32":function(e,t,n){"use strict";(function(e,a){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u,o=n("2f62"),i=c(n("f42b"));function c(e){return e&&e.__esModule?e:{default:e}}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var r=function(){return n.e("components/uni-pagination/uni-pagination").then(n.bind(null,"bc95"))},l=function(){return n.e("node-modules/@dcloudio/uni-ui/lib/uni-badge/uni-badge").then(n.bind(null,"4a83"))},f=function(){return n.e("node-modules/@dcloudio/uni-ui/lib/uni-drawer/uni-drawer").then(n.bind(null,"8357"))},d=function(){return n.e("components/cmd-cell-item/cmd-cell-item").then(n.bind(null,"e249"))},g=function(){return n.e("components/cmd-avatar/cmd-avatar").then(n.bind(null,"9507"))},p=function(){return n.e("components/h-form-alert/h-form-alert").then(n.bind(null,"2814"))},h=function(){return n.e("node-modules/@dcloudio/uni-ui/lib/uni-popup/uni-popup").then(n.bind(null,"33b9"))},m={computed:(0,o.mapState)(["forcedLogin","hasLogin","userName","serverUrl","user"]),data:function(){return{navlist:["已提交","待同意","待回复","被拒绝","进行中","待支付","已完成"],currentIndex:0,pages:1,dataList:[],page:{pageNum:1,pageSize:10,total:"",pageTotal:"0"},order_list:[],code:"",cancelShow:!1,classNum:{0:"",1:"",2:"",3:"",4:"",5:"",6:""},searchEntity:{status:1},entity:{},status:"",phoneStatus:{},orderPeople:{},drawer:!1}},components:{uniPagination:r,uniBadge:l,uniDrawer:f,cmdCelItem:d,cmdAvatar:g,hFormAlert:p,uniPopup:h},methods:(u={pay:function(t){var n=this,u={url:"/pay/getOrder"};u.data=t,i.default.postWithNoStatus(u).then(function(t){e.requestPayment({provider:"alipay",orderInfo:t.data.data,success:function(e){console.log(a("success:"+JSON.stringify(e)," at pages\\myPackage\\myPackage.vue:256"))},fail:function(u){console.log(a("fail:"+JSON.stringify(u)," at pages\\myPackage\\myPackage.vue:264"));var o=t.data.message,c={url:"/pay/success",data:{orderId:o}};i.default.get(c).then(function(t){e.showToast({icon:"success",title:"支付成功"}),n.getPackageNum(),n.getDataList()},function(t){e.showToast({icon:"none",title:"支付失败"})})}})},function(e){})},fnQuerenshouhuo:function(e){var t=this,n={url:"/user/userPoint/querenshouhuo"};n.data=e,i.default.post(n).then(function(e){t.getPackageNum(),t.getDataList()},function(e){})},seeCargoCode:function(e){var t=this,n={url:"/user/userPoint/getCode"};n.data=e,i.default.post(n).then(function(e){t.code=e.bk1,t.$refs.popup.open()},function(e){})},fnSetStatus1:function(e){var t=this,n={url:"/user/userPoint/updateStatus/reset"};n.data=e,i.default.post(n).then(function(e){t.getPackageNum(),t.getDataList()},function(e){})},talkTo:function(){console.log(a("jiaotan"," at pages\\myPackage\\myPackage.vue:378"))},seeOrderPeople:function(e){var t=this;t.drawer=!0,i.default.get({url:"/user/userPoint/getBasicInfo/"+e.id}).then(function(e){t.orderPeople=e},function(e){})},fnAgreen:function(t){var n=/^\d+$|^\d*\.\d+$/g;if(n.test(t.price)){var a=this;this.entity.money=t.price;var u={url:"/user/userPoint/updateStatus/agree"};u.data=a.entity,i.default.post(u).then(function(e){a.getPackageNum(),a.getDataList(),a.cancelShow=!1},function(e){a.cancelShow=!1})}else e.showToast({title:"只能输入数字和小数点",icon:"none"}),t.price=";"},tongyi:function(e){this.cancelShow=!0,this.entity=e},jujue:function(t){var n=this;console.log(a(t," at pages\\myPackage\\myPackage.vue:487")),e.showModal({title:"提示",content:"确认拒绝",success:function(e){if(e.confirm){var a={url:"/user/userPoint/updateStatus/reject"};a.data=t,i.default.post(a).then(function(e){n.getPackageNum(),n.getDataList()},function(e){})}else e.cancel}})},cancel:function(t){var n=this;console.log(a(t," at pages\\myPackage\\myPackage.vue:517")),e.showModal({title:"提示",content:"确认取消这个订单吗",success:function(e){if(e.confirm){var a={url:"/user/userPoint/updateStatus/cancel"};a.data=t,i.default.post(a).then(function(e){n.getPackageNum(),n.getDataList()},function(e){})}else e.cancel}})},navselect:function(e){this.searchEntity.status=0==e?1:1==e?0:e,this.currentIndex=e,this.getDataList()},goDetail:function(e){console.log(a(e," at pages\\myPackage\\myPackage.vue:562"))},paginat:function(e){this.page.pageNum=e,console.log(a(e," at pages\\myPackage\\myPackage.vue:568"))}},s(u,"goDetail",function(t){e.navigateTo({url:"../cargo/cargo/cargo?id="+t.id+"&type=1"})}),s(u,"getDataList",function(){var e="/user/userPoint/findManyWithPage",t={pageNum:this.page.pageNum,pageSize:this.page.pageSize,status:this.searchEntity.status,userId:this.user.id},n={};n.url=e,n.data=t;var u=this;i.default.get(n).then(function(e){u.page.pageTotal=e.pageCount,u.order_list=[],e.list.forEach(function(e){e.cargoImage=JSON.parse(e.cargoImage),u.order_list.push(e)})},function(e){console.log(a("失败"," at pages\\myPackage\\myPackage.vue:605"))})}),s(u,"getPackageNum",function(){var e="/user/userPoint/query/getPackageNum",t={userId:this.user.id},n={};n.url=e,n.data=t;var u=this;i.default.get(n).then(function(e){var t=e["0"];e["0"]=e["1"],e["1"]=t,Object.assign(u.classNum,e)},function(e){console.log(a("失败："+e," at pages\\myPackage\\myPackage.vue:631"))})}),u),mounted:function(){var t=this;e.getSystemInfo({success:function(n){t.phoneStatus=n,e.startPullDownRefresh()}})},onPullDownRefresh:function(){var t=this;setTimeout(function(){t.getPackageNum(),t.getDataList(),e.stopPullDownRefresh()},1e3)}};t.default=m}).call(this,n("6e42")["default"],n("0de9")["default"])},"64b4":function(e,t,n){"use strict";var a,u=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.drawer=!1},e.e1=function(t){e.cancelShow=!1})},o=[];n.d(t,"b",function(){return u}),n.d(t,"c",function(){return o}),n.d(t,"a",function(){return a})},bd08:function(e,t,n){"use strict";var a=n("c5e3"),u=n.n(a);u.a},c5e3:function(e,t,n){},fd4d:function(e,t,n){"use strict";(function(e){n("daa0"),n("921b");a(n("66fd"));var t=a(n("0b66"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])}},[["fd4d","common/runtime","common/vendor"]]]);