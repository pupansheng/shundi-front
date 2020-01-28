<script>
require('sdk/libs/strophe');
import { mapState, mapMutations } from 'vuex';
import emojiData from "static/emoji/emojiData.js"
let msgType = require('components/chat/msgtype');
let disp = require('utils/broadcast');
let logout = false;
let is_reconnect = false;
export default {
	
	onLaunch: function() {
		let emojiList =emojiData.imgArr[1].emojiList
		console.log('App Launch');
		var me = this;
		/* 	var logs = uni.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		uni.setStorageSync('logs', logs); */

		try {
			/* let temp = uni.getStorageSync('chatData');
			console.log('聊天历史记录：' + temp);
			this.setLinkList(JSON.parse(temp)); */
		} catch (e) {
			//TODO handle the exception
			console.log('获取聊天历史记录失败');
			this.setLinkList([])
		}
        disp.on('em.chat.saveHistory',function(e){
			
		    let t=JSON.stringify(me.linkList)
			uni.setStorage({
				key:"chatData",
				data:t,
				success() {
					console.log("保存历史聊天记录成功："+t)
				},
				fail() {
					console.log("保存历史聊天记录失败")
				}
			})
			
			
			
		})
		



		disp.on('em.main.ready', function() {
			me.calcUnReadSpot();
		});
		//离开chatroom
		disp.on('em.chatroom.leave', function() {
			console.log('em.chatroom.leave');
			me.calcUnReadSpot();
		});
		disp.on('em.chat.session.remove', function() {
			me.calcUnReadSpot();
		});
		disp.on('em.chat.audio.fileLoaded', function() {
			me.calcUnReadSpot();
		});

		disp.on('em.main.deleteFriend', function() {
			me.calcUnReadSpot();
		});
		disp.on('em.chat.audio.fileLoaded', function() {
			me.calcUnReadSpot();
		});
		this.$im.conn.listen({
			onOpened: message => {
				this.$im.conn.setPresence();
				console.log('环信im open成功！');
				if (is_reconnect) {
					uni.hideToast();
					/* this.$helper.toast('success', '登陆成功', 2000); */
					is_reconnect = false;
				}
			},
			onReconnect: () => {
				this.$helper.toast('loading', '重连中...', 2000);
			},
			onSocketConnected: () => {
				console.log('登录im socket成功');
				/* this.$helper.toast('success', '登陆成功', 2000); */
			},
			onClosed: () => {
				this.$helper.toast('none', '网络已断开', 2000);
				uni.redirectTo({
					url: '../login/login'
				});
				this.$conn.closed = true;
				this.$im.conn.close();
			},
			onInviteMessage: message => {
				this.$options.globalData.saveGroupInvitedList.push(message);
				disp.fire('em.xmpp.invite.joingroup', message);
			},
			onPresence: message => {
				console.log('onPresence', message);
				switch (message.type) {
					case 'unsubscribe':
						// pages[0].moveFriend(message);
						break;
					// 好友邀请列表
					case 'subscribe':
						if (message.status === '[resp:true]') {
							return;
						} else {
							// pages[0].handleFriendMsg(message);
							for (let i = 0; i < this.$options.globalData.saveFriendList.length; i++) {
								if (this.$options.globalData.saveFriendList[i].from === message.from) {
									this.$options.globalData.saveFriendList[i] = message;
									disp.fire('em.xmpp.subscribe');
									return;
								}
							}
							this.$options.globalData.saveFriendList.push(message);
							console.log(JSON.stringify(this.$options.globalData.saveFriendList));
							disp.fire('em.xmpp.subscribe');
						}
						break;
					case 'subscribed':
						uni.showToast({
							title: '添加成功',
							duration: 1000
						});
						disp.fire('em.xmpp.subscribed');
						break;
					case 'unsubscribed':
						uni.showToast({
							title: '已拒绝',
							duration: 1000
						});
						break;
					case 'memberJoinPublicGroupSuccess':
						this.$helper.toast('none', '已进群', 1000);
						break;
					case 'unavailable':
						disp.fire('em.xmpp.contacts.remove');
						disp.fire('em.xmpp.group.leaveGroup', message);
						break;
					case 'deleteGroupChat':
						disp.fire('em.xmpp.invite.deleteGroup', message);
						break;
					case 'leaveGroup':
						disp.fire('em.xmpp.group.leaveGroup', message);
						break;
					case 'removedFromGroup':
						disp.fire('em.xmpp.group.leaveGroup', message);
						break;
					default:
						break;
				}
			},

			onRoster: message => {},

			onVideoMessage: message => {
				console.log('onVideoMessage: ', JSON.stringify(message));
				
				
			},

			onAudioMessage: message => {
				console.log('onAudioMessage', message);
				 var options = { url: message.url };
				    
				    options.onFileDownloadComplete = function ( response ) { 
				      //音频下载成功，需要将response转换成blob，使用objectURL作为audio标签的src即可播放。
				        var objectURL = me.$im.utils.parseDownloadResponse.call(me.$im.conn, response);
					     console.log("转化地址："+objectURL)
					  
					    let isExists = false;
					  	let linkList = me.linkList;
					  	let date = new Date();
					  	let time = me.dateFormat('YYYY-mm-dd HH:MM', date);
					     let messageEntity={ type:'user',
					  	          msg: {id:0,
					  	                time:time,
					  	                type:'voice',
					  				    userinfo:
					  				    {
					  	                  uid:!message.ext.id?'1':message.ext.id,
					  	                  username:!message.ext.id?'系统通知':message.ext.username,
					  	                  face:!message.ext.id?"/static/img/face.jpg":message.ext.headimage,					 
					  	                },
					  	               content:{url:objectURL,length:message.length},
					  	              }
					  	         }	
								 
						   let j=0
					  for (let i = 0; i < linkList.length; i++) {
					  	let temp = linkList[i];
					  	if (temp.title == message.from) {
					  		//说明是同一个人发的信息
					  		isExists = true;
							j=temp.history.length;
							messageEntity.msg.id=j;
					  		temp.history.push(messageEntity);
					  		temp.message = '新消息[语言]';
					  		temp.count = temp.count+1;
					  		temp.time = time;
					  		//头像暂且不管
							temp.url=!message.ext.id?['/static/img/face.jpg']:message.ext.headimage
					  		break;
					  	}
					  }
					  if (!isExists) {
					  	
					  	let mes={
					  		type: message.type,
					  		title: message.from,
					  		name:!message.ext.id?'系统通知':message.ext.username,
					  		url:!message.ext.id?['/static/img/face.jpg']:message.ext.headimage,//头像
					  		history: [messageEntity],
					  		message: '新消息[语音]',
					  		time: time,
					  		count: 1,
					  		stick: false, //是否为置顶状态
					  		disabled: false, //是否禁止滑动
					  		type: 2 //普通用户类型消息,
					  		
					  	}
					  	//震动
					  	uni.vibrateLong();
					  	linkList.push(mes);
					  }
					  
					                 
					  me.setLinkList(linkList);	
					  
					 if(isExists){
					   disp.fire('em.chat.reSuccess',j);      
					 }
					  
					  
					  
					  
				    };  
				
				    options.onFileDownloadError = function () {
				      //音频下载失败 
					  console.log("音频下载失败")
				    };  
				
				    //通知服务器将音频转为mp3
				    options.headers = { 
				      'Accept': 'audio/mp3'
				    };
				
				   me.$im.utils.download.call(me.$im.conn, options);
				
				
			},

			onCmdMessage: message => {
				console.log('onCmdMessage', message);
				
				
			},

			// onLocationMessage: (message)=>{
			// 	console.log("Location message: ", message);
			// 	if(message){
			// 		msgStorage.saveReceiveMsg(message, msgType.LOCATION);
			// 	}
			// },

			onTextMessage: message => {
				console.log("onText:"+JSON.stringify(message))
				let isExists = false;
				let linkList = me.linkList;
				//此时时间
				let date = new Date();
				let time = me.dateFormat('YYYY-mm-dd HH:MM', date);
				message.time=time;
				
			
			    let messageEntity={   
					//type:message.from=='admin'?'system':'user',
					type:'user',
					msg:{id:0,
					     type:"text",
						 time:time,
						 userinfo:{uid:!message.ext.id?'1':message.ext.id,
				                   username:!message.ext.id?'系统通知':message.ext.username,
				                   face:!message.ext.id?"/static/img/face.jpg":message.ext.headimage	
								  },
						content:{text:message.data,source:message}}
				}
                     let j=0;
				for (let i = 0; i < linkList.length; i++) {
					let temp = linkList[i];
					if (temp.title == message.from) {
						//说明是同一个人发的信息
						
						isExists = true;
						j=temp.history.length;
						messageEntity.msg.id=j;
						temp.history.push(messageEntity);
						temp.message = message.data.length>10?'新消息[文字]': message.data;
						temp.count = temp.count+1;
						temp.time = time;
						temp.url=!message.ext.id?['/static/img/face.jpg']:message.ext.headimage
						//头像暂且不管
						break;
					}
				}
				if (!isExists) {
					
					let mes={
						type: message.type,
						title: message.from,
						name:!message.ext.id?'系统通知':message.ext.username,
						url:!message.ext.id?['/static/img/face.jpg']:message.ext.headimage,//头像
						history: [messageEntity],
						message: message.data.length>10?'新消息[文字]': message.data,
						time: time,
						count: 1,
						stick: false, //是否为置顶状态
						disabled: false, //是否禁止滑动
						type: 2 //普通用户类型消息,
						
					}
					//震动
					uni.vibrateLong();
					linkList.push(mes);
				}

              
				me.setLinkList(linkList);
				if(isExists){
				  disp.fire('em.chat.reSuccess',j);      
				}
			},

			onEmojiMessage: message => {
				console.log('onEmojiMessage', message);
			},

			onPictureMessage: message => {
				console.log('onPictureMessage',JSON.stringify(message));
				let isExists = false;
				let linkList = me.linkList;
				let date = new Date();
				let time = me.dateFormat('YYYY-mm-dd HH:MM', date);
			   let messageEntity={ type:'user',
				          msg: {id:0,
				                time:time,
				                type:'img',
							    userinfo:
							    {
				                  uid:!message.ext.id?'1':message.ext.id,
				                  username:!message.ext.id?'系统通知':message.ext.username,
				                  face:!message.ext.id?"/static/img/face.jpg":message.ext.headimage,					 
				                },
				               content:{url:message.url,w:message.width,h:message.height},
				              }
				         }	
				let j=0;		 
			for (let i = 0; i < linkList.length; i++) {
				let temp = linkList[i];
				if (temp.title == message.from) {
					//说明是同一个人发的信息
					isExists = true;
					j=temp.history.length;
					messageEntity.msg.id=j;
					
					temp.history.push(messageEntity);
					
					temp.message = '新消息[图片]';
					temp.count = temp.count+1;
					temp.time = time;
					temp.url=!message.ext.id?['/static/img/face.jpg']:message.ext.headimage
					//头像暂且不管
					break;
				}
			}
			if (!isExists) {
				
				let mes={
					type: message.type,
					title: message.from,
					name:!message.ext.id?'系统通知':message.ext.username,
					url:!message.ext.id?['/static/img/face.jpg']:message.ext.headimage,//头像
					history: [messageEntity],
					message: '新消息[图片]',
					time: time,
					count: 1,
					stick: false, //是否为置顶状态
					disabled: false, //是否禁止滑动
					type: 2 //普通用户类型消息,
					
				}
				//震动
				uni.vibrateLong();
				linkList.push(mes);
			}
			
			
			me.setLinkList(linkList);	
			if(isExists){
			  disp.fire('em.chat.reSuccess',j);      
			}
			
				
				
			},

			onFileMessage: message => {
				console.log('onFileMessage', message);
			},

			// 各种异常
			onError: error => {
				console.log(error);
				// 16: server-side close the websocket connection
				if (error.type == this.$im.statusCode.WEBIM_CONNCTION_DISCONNECTED && !logout) {
					if (this.$im.conn.autoReconnectNumTotal < this.$im.conn.autoReconnectNumMax) {
						return;
					}
					uni.showToast({
						title: 'server-side close the websocket connection',
						duration: 1000
					});
					uni.redirectTo({
						url: '../login/login'
					});
					logout = true;
					return;
				}
				// 8: offline by multi login
				if (error.type == this.$im.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
					uni.showToast({
						title: 'offline by multi login',
						duration: 1000
					});
					uni.redirectTo({
						url: '../login/login'
					});
				}
				if (error.type == this.$im.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {
					disp.fire('em.xmpp.error.passwordErr');
					// uni.showModal({
					// 	title: "用户名或密码错误",
					// 	confirmText: "OK",
					// 	showCancel: false
					// });
				}
				if (error.type == this.$im.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
					disp.fire('em.xmpp.error.tokenErr');
				}
				if (error.type == 'socket_error') {
					///sendMsgError
					console.log('socket_errorsocket_error', error);
					uni.showToast({
						title: '网络已断开',
						icon: 'none',
						duration: 2000
					});
					disp.fire('em.xmpp.error.sendMsgErr', error);
				}
			}
		});

		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	onError(e) {
		
		console.log("APP 异常！")
		console.log(e);
		
		
	},
	computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'serverUrl', 'user', 'linkList']),
	methods: {
		...mapMutations(['setLinkList']),
		dateFormat(fmt, date) {
			let ret;
			const opt = {
				'Y+': date.getFullYear().toString(), // 年
				'm+': (date.getMonth() + 1).toString(), // 月
				'd+': date.getDate().toString(), // 日
				'H+': date.getHours().toString(), // 时
				'M+': date.getMinutes().toString(), // 分
				'S+': date.getSeconds().toString() // 秒
				// 有其他格式化字符需求可以继续添加，必须转化成字符串
			};
			for (let k in opt) {
				ret = new RegExp('(' + k + ')').exec(fmt);
				if (ret) {
					fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
				}
			}
			return fmt;
		},
		onLoginSuccess() {
			uni.hideToast();
			uni.switchTab({
				url: '../chat/chat'
			});
		},

		ack(receiveMsg) {
			// 处理未读消息回执
			var bodyId = receiveMsg.id; // 需要发送已读回执的消息id
			var ackMsg = new this.$im.message('read', this.$im.conn.getUniqueId());
			ackMsg.set({
				id: bodyId,
				to: receiveMsg.from
			});
			this.$im.conn.send(ackMsg.body);
		},

		onMessageError(err) {
			if (err.type === 'error') {
				uni.showToast({
					title: err.errorText
				});
				return false;
			}
			return true;
		},

		getCurrentRoute() {
			let pages = getCurrentPages();
			let currentPage = pages[pages.length - 1];
			return currentPage.route;
		},

		calcUnReadSpot(message) {
			let myName = uni.getStorageSync('myUsername');
			let members = uni.getStorageSync('member') || []; //好友
			var listGroups = uni.getStorageSync('listGroup') || []; //群组
			let allMembers = members.concat(listGroups);
			let count = allMembers.reduce(function(result, curMember, idx) {
				let chatMsgs;
				if (curMember.roomId) {
					chatMsgs = uni.getStorageSync(curMember.roomId + myName.toLowerCase()) || [];
				} else {
					chatMsgs = uni.getStorageSync(curMember.name.toLowerCase() + myName.toLowerCase()) || [];
				}
				return result + chatMsgs.length;
			}, 0);
			this.$options.globalData.unReadMessageNum = count;
			disp.fire('em.xmpp.unreadspot', message);
		}
	}
};
</script>

<style>
/*每个页面公共css */
/* 全局样式 */

@import url('./common/uni/uni.css');
page {
	min-height: 100%;
	display: flex;
}

/* #ifdef MP-BAIDU */
page {
	width: 100%;
	height: 100%;
	display: block;
}

swan-template {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
	min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
	width: 100%;
	min-height: 100%;
	display: flex;
}

.content {
	display: flex;
	flex: 1;
	flex-direction: column;
	background-color: #efeff4;
	padding: 3upx;
}

.input-group {
	background-color: #ffffff;
	margin-top: 40upx;
	position: relative;
}

.input-group::before {
	position: absolute;
	right: 0;
	top: 0;
	left: 0;
	height: 1upx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-group::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1upx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-row {
	display: flex;
	flex-direction: row;
	position: relative;
}

.input-row .title {
	width: 20%;
	height: 50upx;
	min-height: 50upx;
	padding: 15upx 0;
	padding-left: 30upx;
	line-height: 50upx;
}

.input-row.border::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 15upx;
	height: 1upx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.btn-row {
	margin-top: 50upx;
	padding: 20upx;
}

button.primary {
	background-color: #0faeff;
}
</style>
