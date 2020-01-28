import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: true,
        hasLogin: false,
        userName: "",
		//serverUrl:"http://pps1899097338.natapp1.cc",
		serverUrl:"http://q3ejpf.natappfree.cc",
		user: {},
		data:{},
		linkList:[]
    },
	updated:function(){
			console.log('message update:'+ this.scrollTop);
	},
    mutations: {
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        },
		updateUser(state,u){
			state.user=u;
		},
		updateData(state,k,v){
			state.data[k]=v;
		},
		setLinkList(state,data){
			state.linkList=data;
			
		}
    }
})

export default store
