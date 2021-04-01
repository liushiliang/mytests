import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		secretkey: '3560E5112F8420EFDDA7E4FA06AEA249',
		token: '',
		userInfo: {},
		otherInfo:{},
		isLogin: false
	},
	mutations: {
		/*
		 *
		 * @params otherInfo String 
		 * */
		 
		setOtherInfo(state, otherInfo){
			
			state.otherInfo = JSON.parse(otherInfo);
			
			uni.setStorage({
				key: 'otherInfo',
				data: otherInfo
			})
		},
		/**
		 * @param {Object} state
		 * @param {JSON} userInfo
		 */
		setUserInfo(state, userInfo) {
			state.userInfo = JSON.parse(userInfo) //JSON.parse()
			
			uni.setStorage({
				key: 'userInfo',
				data: userInfo
			})
		},
		login(state, token) {
			// console.log('login===state==', state)
			// console.log('login--provider-', provider)
			state.isLogin = true
			state.token = token
			uni.setStorage({
				key: 'token',
				data: token
			})
		},
		logout(state) {
			state.isLogin = false
			
			uni.clearStorage();
		}
	}
})