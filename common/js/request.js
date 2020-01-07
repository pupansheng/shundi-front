
import store from '../../store/index.js'
const server=store.state.serverUrl;
var http={

	get:(entity) => {
	// Promise 是异步编程的一种解决方案，其实是一个构造函数，自己身上有all、reject、resolve这几个方法，原型上有then、catch等方法。
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title:'请求中...'
		})
		
		let header2={
				'content-type': 'application/json'
				//自定义请求头信息
			}
		if(entity.header){
			header2=entity.header;
		}
		uni.request({
			url: server + entity.url, //仅为示例，并非真实接口地址。
			method: 'GET',
			data: entity.data,
			header:header2, 
			success: res => {
				 uni.hideLoading();
				 if(res.data.code){			 
					 if(res.data.code==1000){
					 uni.showToast({
					 	icon: 'none',
					 	title: '业务请求失败:权限不足!'
					 });
					 }
					 if(res.data.code==900){
					 uni.showToast({
					 	icon: 'none',
					 	title: '业务请求失败:!系统错误:'+res.data.message
					 });
					 } 
				 }else{
					 if(res.data.status==true){	
						resolve(res.data.data);
					 }
					 else{
						 uni.showToast({
						 	icon: 'none',
						 	title: '业务请求失败:'+res.data.message
						 });				 
						 reject(res.data.message);
					 }				 
				 }
				},
			    fail: err => {
				uni.hideLoading();
				uni.showToast({
					icon: 'none',
					title: '网络请求失败:未知错误!'
				});
				console.log("网络请求错误:")
				reject(err);	
			}
		});
		
   })
   
   },
   post:(entity) => {
   	// Promise 是异步编程的一种解决方案，其实是一个构造函数，自己身上有all、reject、resolve这几个方法，原型上有then、catch等方法。
   	return new Promise((resolve, reject) => {
   		uni.showLoading({
   			title:'请求中...'
   		})
   		let header2={
   				'content-type': 'application/json'
   				//自定义请求头信息
   			}
   		if(entity.header){
   			header2=entity.header;
   		}
   		uni.request({
   			url: server + entity.url, //仅为示例，并非真实接口地址。
   			method: 'POST',
   			data: entity.data,
   			header:header2, 
   			success: res => {
   				  uni.hideLoading();
   				 if(res.data.code){
   					 
   					 if(res.data.code==1000){
   					 uni.showToast({
   					 	icon: 'none',
   					 	title: '请求失败:权限不足!'
   					 });
   					 }
   					 if(res.data.code==900){
   					 uni.showToast({
   					 	icon: 'none',
   					 	title: '业务请求失败:'+res.data.message
   					 });
   					 } 
   				 }else{
   					 if(res.data.status==true){
   						
   						resolve(res.data.data);
   						
   						
   					 }
   					 else{
   						 uni.showToast({
   						 	icon: 'none',
   						 	title: '业务请求失败:'+res.data.message
   						 });
						reject(res.data.message);
   					 }				 
   				 }
   				},
   			    fail: err => {
			    uni.hideLoading();
   				uni.showToast({
   					icon: 'none',
   					title: '网络请求失败:未知错误!'
   				});
				console.log("网络请求错误:")
				reject(err);	
   				
   			}
   		});
   		
   })
   
   },
   getWithNoStatus:(entity) => {
   	// Promise 是异步编程的一种解决方案，其实是一个构造函数，自己身上有all、reject、resolve这几个方法，原型上有then、catch等方法。
   	return new Promise((resolve, reject) => {
   		uni.showLoading({
   			title:'请求中...'
   		})
   		let header2={
   				'content-type': 'application/json'
   				//自定义请求头信息
   			}
   		if(entity.header){
   			header2=entity.header;
   		}
   		uni.request({
   			url: server + entity.url, //仅为示例，并非真实接口地址。
   			method: 'GET',
   			data: entity.data,
   			header:header2, 
   			success: res => {
   				  uni.hideLoading();
   				 if(res.data.code){
   					 
   					 if(res.data.code==1000){
   					 uni.showToast({
   					 	icon: 'none',
   					 	title: '请求失败:权限不足!'
   					 });
   					 }
   					 if(res.data.code==900){
   					 uni.showToast({
   					 	icon: 'none',
   					 	title: '业务请求失败:'+res.data.message
   					 });
   					 } 
   				 }else{
   					
   						
   						resolve(res.data.data);
   						
   					
   							 
   				 }
   				},
   			    fail: err => {
					  uni.hideLoading();
   				uni.showToast({
   					icon: 'none',
   					title: '网络请求失败:未知错误!'
   				});
				console.log("网络请求错误:")
				reject(err);	
   				
   			}
   		});
   		
   })
   
   },
   postWithNoStatus:(entity) => {
   	// Promise 是异步编程的一种解决方案，其实是一个构造函数，自己身上有all、reject、resolve这几个方法，原型上有then、catch等方法。
   	return new Promise((resolve, reject) => {
   		uni.showLoading({
   			title:'请求中...'
   		})
   		let header2={
   				'content-type': 'application/json'
   				//自定义请求头信息
   			}
   		if(entity.header){
   			header2=entity.header;
   		}
   		uni.request({
   			url: server + entity.url, //仅为示例，并非真实接口地址。
   			method: 'POST',
   			data: entity.data,
   			header:header2, 
   			success: res => {
   				  uni.hideLoading();
   				 if(res.data.code){
   					 
   					 if(res.data.code==1000){
   					 uni.showToast({
   					 	icon: 'none',
   					 	title: '业务请求失败:权限不足!'
   					 });
   					 }
   					 if(res.data.code==900){
   					 uni.showToast({
   					 	icon: 'none',
   					 	title: '业务请求失败:'+res.data.message
   					 });
   					 } 
   				 }else{
   					
   						
   						resolve(res.data.data);
   						
   					
   							 
   				 }
   				},
   			    fail: err => {
					  uni.hideLoading();
   				uni.showToast({
   					icon: 'none',
   					title: '网络请求失败:未知错误!'
   				});
				console.log("网络请求错误:")
				reject(err);	
   				
   			}
   		});
   		
   })
   
   }

	
}
export default http;