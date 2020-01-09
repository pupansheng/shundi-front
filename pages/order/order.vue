<template>
	<view>
		<scroll-view scroll-x class="bg-white nav fixed" >
			<view class='flex text-center'>
				<view class="cu-item flex-sub text-df " @click="navselect(index)" v-for="(nav,index) in navlist" :key="index"
				 :class="[index == currentIndex ? 'text-red cur' : '']">
					{{nav}}<uni-badge :text="classNum[index]" v-if="classNum[index]!=0"></uni-badge>
				</view>
			</view>
		</scroll-view>
		<view style="margin-top: 80rpx;width: 100%;" >
			
					
					<view>
						<view class="bg-white margin-xs padding-xs shadow radius text-content" :style="{'width':phoneStatus.windowWidth+'px'}" v-for="(item,index) in order_list"
						 :key="index">
						 
						
							
							<view class="flex padding-top-sm solids-top" style="align-items: stretch;"  @click="goDetail(item)">
								<image :src="serverUrl+'/'+m" v-for="m in item.goodsimage" style="flex-shrink: 0;" mode="aspectFill" class="shadow cover radius solids"></image>
										
								<view class="flex text-content padding-left justify-between" style="flex-grow: 1;">
									<view style="">{{ item.goodsname }}</view>
									<view style="display: flex;flex-direction: column;">
										
										<!-- <view class="text-grey text-center">{{item.toAddress.substr(0,6)}}</view>	 -->								
										<view class="text-grey" style="align-self:flex-end;">重量：    {{item.goodsweight}}</view>
										<view class="text-grey" style="align-self:flex-end;">体积：    {{item.goodsvolume}}</view>
									</view>
								</view>
							</view>
							
							<view v-if="searchEntity.status==0">
								
							
							<view style="display: flex;justify-content: flex-end;">
								<button @click.stop="kefu" class="round lines-grey cu-btn shadow mid margin-right-sm">与货主商量</button>
							    <button @click.stop="cancel0(item)" class="round lines-grey cu-btn shadow mid margin-right-sm">取消</button>
							</view>
								
							</view>
							<view v-if="searchEntity.status==1">
								
								<view style="display: flex;justify-content: space-around;">
									 <view style="display: flex;align-items: center;">最终价格：${{item.talkprice}}元</view> 
									 <view style="display: flex;justify-content: flex-end;">
										 <view class="round cu-btn lines-grey mid shadow margin-right-sm" @click.stop="butongyi(item)">取消接单</view>
										 <view class="round cu-btn lines-grey mid shadow margin-right-sm" @click.stop="getCargo(item)">确认取货</view>								   
									 </view>
									
								</view>
								
							</view>
							
							<view v-if="searchEntity.status==2">
								<view style="display: flex;justify-content: flex-end;">
								<button  class="round lines-grey cu-btn shadow mid margin-right-sm" @click="cancelRecord(item)">删除记录</button>
								</view>
							</view>
							
							<view v-if="searchEntity.status==3">
								
							 <view style="display: flex;justify-content: space-between;align-items: center;" >
							       <view>取货码：{{item.bk1}}</view>
							 	   <button @click.stop="geikehu(item)" class="round lines-grey cu-btn shadow mid margin-right-sm">已送达</button>
							 </view>
								
							</view>
							
							<view v-if="searchEntity.status==4">
								<view  style="display: flex;justify-content: flex-end;">
									 <view style="display: flex;align-items: center;">价格：${{item.talkprice}}元</view> 
								</view>
								
								
							</view>
							
							<view v-if="searchEntity.status==5">
								<view  style="display: flex;justify-content: flex-end;">
									<button @click.stop="kefu" class="round lines-grey cu-btn shadow mid margin-right-sm">与接单人交谈</button>
									
								</view>
								
							</view>
						</view>
					</view>
					
					
		
					
					
					</view>
				
				
			
			<view style="margin-bottom: 50upx;" v-if="page.pageTotal!=0">
				<uni-pagination :total="page.pageTotal" :pageSize="page.pageSize" :current="page.pageNum" @change="paginat">
				</uni-pagination>
			</view>
			<view :style="{'width':phoneStatus.windowWidth+'px','margin-top':phoneStatus.windowHeight/3+'px'}" style="margin-bottom: 50upx;display: flex;justify-content: center;flex-direction: column;align-items: center;align-content: center;" v-if="page.pageTotal==0">
				<image src="../../static/img/car/noData.png" style="width: 100px; height: 100px; background-color: #eeeeee;" ></image>
				<view>暂无数据 下拉刷新</view>
			</view>
		</view>
	
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import uniPagination from "@dcloudio/uni-ui/lib/uni-pagination/uni-pagination.vue"
	import http from '../../common/js/request.js';
	import uniBadge from "@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue"

	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'serverUrl', 'user']),
		data() {
			return {
				navlist: [
					'已申请','已同意','被拒绝','进行中', '待支付','已完成'
				],
				currentIndex: 0,
				pages: 1,
				dataList:[],
				page:{
					pageNum:1,
					pageSize:10,
					total:'',
					pageTotal:'0'
				},
				order_list: [
						
				
				],
				classNum:{
					'0':'',
					'1':'',
					'2':'',
					'3':'',
					'4':'',
					'5':''
				},
				searchEntity:{
					status:0
				},
				status: '',	
				phoneStatus:{}
			}
		},
		components:{uniPagination,uniBadge},
		methods: {
			geikehu(o){
				
				const that=this;
				
				uni.showModal({
				    title: '提示',
					content:'确认操作?',
				    success: function (res) {
				        if (res.confirm) {
				           
						  let submit={};
						  submit.url='/order/daohuo';
						  submit.data=o;
						  	
						  http.post(submit).then(res=>{
						  	that.getOderNum();
						  	that.getDataList();
						  },error=>{
						  	
						  	
						  })
						   
				        } else if (res.cancel) {
				          
						 
				        }
				    }
				});
				
				
			},
			butongyi(o){
				
				const that=this;
				
				uni.showModal({
				    title: '提示',
					content:'确认取消?',
				    success: function (res) {
				        if (res.confirm) {
				           
						  let submit={};
						  submit.url='/order/reject';
						  submit.data=o;
						  	
						  http.post(submit).then(res=>{
						  	that.getOderNum();
						  	that.getDataList();
						  },error=>{
						  	
						  	
						  })
						   
				        } else if (res.cancel) {
				          
						 
				        }
				    }
				});
				
				
			},
			getCargo(item){
				
				const that=this;
				
				uni.showModal({
				    title: '提示',
					content:'确认取货? 请注意,当确认时无法更改，直到订单完成',
				    success: function (res) {
				        if (res.confirm) {
				           
						  let submit={};
						  submit.url='/order/confirm';
						  submit.data=item;
						  	
						  http.post(submit).then(res=>{
							uni.showToast({
								icon:'success',
								title:'成功!取货码：'+res
							})  
							console.log(res)
						  	that.getOderNum();
						  	that.getDataList();
						  },error=>{
						  	
							
						  	
						  })
						   
				        } else if (res.cancel) {
				          
						 
				        }
				    }
				});
				
				
			},
			cancel0(o){
				const that=this;
				
				uni.showModal({
				    title: '提示',
					content:'确认?',
				    success: function (res) {
				        if (res.confirm) {
				           
						  let submit={};
						  submit.url='/order/delete';
						  submit.data={
						  	id:o.id,
							status:o.status,
							userpointid:o.userpointid
						  };
						  http.post(submit).then(res=>{
						  	that.getOderNum();
						  	that.getDataList();
						  },error=>{
						  	
						  	
						  })
						   
				        } else if (res.cancel) {
				          
						 
				        }
				    }
				});
				
				
				
				
				
			},
			cancelRecord(o){
				const that=this;
				let submit={};
				submit.url='/order/delete';
				submit.data={
					id:o.id,
					status:o.status,
					userpointid:o.userpointid
				};
				http.post(submit).then(res=>{
					
					that.getOderNum();
					that.getDataList();
					
				},error=>{
					
					
				})
				
				
			},
			navselect(index){

				this.searchEntity.status=index;
				this.currentIndex=index;
				this.getDataList();
				
			},
			paginat(v){
				
				this.page.pageNum=v;
				console.log(v)
				
			},
			goDetail(o){
				
				uni.navigateTo({
					url:'../cargo/cargo/cargo?id='+o.userpointid
				})
			},
			getDataList(){
				
				let url='/order/query/condition';
				let data={
				        pageNum:this.page.pageNum,
						pageSize:this.page.pageSize,
						status:this.searchEntity.status,
						userid:this.user.id
				    }
				 let entity={};
				 entity.url=url;
				 entity.data=data;
				 const that=this;
			     http.post(entity).then(
			               res => {
							  
							 that.order_list=res.list;
							  that.order_list.forEach(p=>{
								  p.goodsimage=JSON.parse(p.goodsimage)
							  })
							 that.page.pageNum=res.pageNum;
							 that.page.pageSize=res.pageSize;
							 that.page.pageTotal=res.total;
							 
			               },
			               error => {
			                   console.log('失败');
			               }
			           );
			  	 
				
			},
			getOderNum(){
				
				let url='/order/query/getOrderNum';
				let data={
				      
						userId:this.user.id
				    }
				 let entity={};
				 entity.url=url;
				 entity.data=data;
				 const that=this;
				 http.get(entity).then(
				           res => {  
							  Object.assign(that.classNum,res)
				           },
				           error => {
				               console.log('失败');
				           }
				       );
			}
		},
		mounted() {
			const that=this;
			uni.getSystemInfo({
			    success: function (res) {
					that.phoneStatus=res
				/* 	that.getOderNum();
					that.getDataList() */
					uni.startPullDownRefresh();
			    }
			});

		},
		onPullDownRefresh() {
				        const that=this;
				        setTimeout(function () {
							that.getOderNum();
							that.getDataList();
				            uni.stopPullDownRefresh();
				        }, 1000);
		}
		
	}
</script>

<style>
	@import url("../../static/colorui.css");
	.cover {
		width: 150upx;
		height: 150upx;
	}

</style>
