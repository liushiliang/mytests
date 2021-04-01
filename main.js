import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import {http} from './util/http.js'
import md5 from './util/md5.js'

Vue.prototype.$store=store
Vue.prototype.$H=http;

//md5
Vue.prototype.md5=md5;
//两次md5
Vue.prototype.md52=(str)=>{
	return md5(md5(str));
}

//只有权限验证成功才能执行操作
async function auth(callback){
	if(!store.state.isLogin){//没登录 则查看localStorage是否登录
		var token='';
		await uni.getStorage({key:"token",success(res) {
			token=res.data;
		}});
		
		if(token==''){
			
			uni.showToast({
				title:'请登录',
				icon:'none',
				duration:2000,
				complete() {
					setTimeout(function(){
						uni.navigateTo({
							url:"/pages/login/login"
						});
					},300)
				}
			})
			
			return;
		}
	}
	
	callback();
}

Vue.prototype.operateWithAuth=auth;

//只有权限验证成功才能跳转
 async function auth2(url){
	 
	if(!store.state.isLogin){//没登录 则查看内存
		var token='';
		await uni.getStorage({key:"token",success(res) {
			token=res.data;
		}});
		
		if(token==''){
			
			uni.showToast({
				title:'请登录',
				icon:'none',
				duration:2000,
				complete() {
					setTimeout(function(){
						uni.navigateTo({
							url:"/pages/login/login"
						});
					},300)
				}
			})
			
			return;
		}
	}
		
	uni.navigateTo({
		url:"/pages/"+url+"/"+url
	});
}

Vue.prototype.navWithAuth=auth2;

//获取当前的时间戳
Vue.prototype.gts=()=>{
	return Date.parse(new Date())/1000;
}

Vue.prototype.justgo=(url)=>{
	uni.navigateTo({
		url:"/pages/"+url+"/"+url
	})
}

Vue.prototype.go=(url)=>{
	uni.navigateTo({
		url:url
	})
}

//根据id来跳转到不同文章
Vue.prototype.toDetail=function(e){
	
	uni.navigateTo({
		url:"/pages/activity_detail/activity_detail?id="+e.currentTarget.dataset.id+
		"&ttl="+e.currentTarget.dataset.ttl
	})
}

//防止频繁点击
var NonFreq=function NonFreq(secAllowed,model){
	this.lastTS=0;
	this.secAllowed=secAllowed;
	this.model=model;
};
//需要return的情况就是
NonFreq.prototype.is=function(){
	var ts=parseInt(new Date().getTime()/1000);
	if(ts-this.lastTS<this.secAllowed){
		
		if(this.model!=undefined){
			uni.showModal({
				title: '提示',
				content: this.model,
				showCancel: false,
				confirmText: '确认'
			});
		}
		
		return true;
	}else{
		this.lastTS=parseInt(new Date().getTime()/1000);
		return false;
	}
}

Vue.prototype.NonFreq=(function(){
	
	var triggerObj={};
	
	return function(methodName,secAllowed=3,model){
		var attrName=this.__route__+"-"+methodName;
		
		console.log(triggerObj);
		
		//存在就去除并执行
		if(triggerObj.hasOwnProperty(attrName)){
			return triggerObj[attrName].is();
		}else{
			triggerObj[attrName]=new NonFreq(secAllowed,model);
			return triggerObj[attrName].is();
		}
		
	}
	
})();




// function authService(){
// 				// Attributes
// 				this.id="";
// 				this.description="";
// 				this.appleInfo=plus.oauth.AppleInfo;
// 				this.authResult=plus.oauth.AuthInfo;
// 				this.userInfo=plus.oauth.UserInfo;
// 				this.extra={};
				
// 				// // Methods 
// 				// function void author(successCallback, errorCallback, options);
// 				// function void login(successCallback, errorCallback, options);
// 				// function void logout(successCallback, errorCallback);
// 				// function void getUserInfo(successCallback, errorCallback);
// 				// function void addPhoneNumber(successCallback, errorCallback);
// }
// authService.prototype.author=function (successCallback,errorCallback,options){
	
// 	if(!aweixin){
// 			plus.nativeUI.alert("当前环境不支持微信登录");
// 			return;
// 		}
// 		aweixin.authorize(function(e){
// 			plus.nativeUI.alert("授权成功："+JSON.stringify(e));
// 		}, function(e){
// 			plus.nativeUI.alert("授权失败："+JSON.stringify(e));
// 		}, {scope:'snsapi_userinfo',state:'authorize test',appid:'WX**********'});
// }
// authService.prototype.login=function(successCallback,errorCallback,options){
	
// }
// authService.prototype.logout=function(successCallback,errorCallback){
	
// }
// authService.prototype.getUserInfo=function(successCallback,errorCallback){
	
// }

// plus.oauth.AuthService=new authService();

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
