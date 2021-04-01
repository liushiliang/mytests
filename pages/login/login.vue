<template>
	<view>
		<!-- <return-btn :radio="bgRadio" ttl="登录" :isCenter="true"  @returnBtnInitial="returnBtnInitial" v-if="is_outer" :usingRedirect="true" url="/pages/index/index"></return-btn> -->
		<return-btn :radio="bgRadio" ttl="登录" :isCenter="true"  @returnBtnInitial="returnBtnInitial"></return-btn>
		<div :style="{'margin-top':initialTop+'px'}">
			<view class="header">
				<image :src="avatarUrl" v-if="avatarUrl"></image>
				<image src="../../static/icons/default_user.png" v-else></image>
			</view>
			<view class="content">
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>
			<!-- #ifdef APP-PLUS -->
			<button class="user-info-btn" type="primary" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @click="loginWithWX">微信授权一键登录</button>
			<!-- #endif -->
			<!-- #ifndef APP-PLUS -->
			<button class="user-info-btn" type="primary" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">微信一键登录</button>
			<!-- #endif -->
		
			
			<view class="authorize" v-if="isShowWrapper">
				<view class="text_center relative"  :class="{'text-show':isShowPhoneBox}">
					<view class="top">
						<view class="title">授权登录</view>
						<view class="tip">申请获取你微信绑定的手机号，以便为您提供更好的服务</view>
					</view>
					<view class="bottomBox space-around">
						<button class="btn" @click="cancel">取消</button>
						<button class="btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权</button>
					</view>
				</view>
			</view>
		</div>
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue"
	import { mapState,mapMutations } from "vuex"
	
	export default {
		data() {
			return {
				bgRadio:100,
				avatarUrl:"",
				isShowWrapper:false,
				isShowPhoneBox:false,
				storagedToken:"",
				
				initialTop:149,
				
				
				//用户隐私政策 start
				isShowBlackWrapper:false
				//用户隐私政策 end
			};
		},
		components:{
			returnBtn
		},
		computed:{
			...mapState(['secretkey','isLogin'])
		},
		methods:{
			...mapMutations(['setOtherInfo','login','setUserInfo']),
			wxGetUserInfo(){
				var code,_this=this;
				
				if(this.NonFreq("wxGetUserInfo",3)){
					return ;
				}
				
				uni.login({
					success(loginRes) {
						code=loginRes.code;
						
						uni.getUserInfo({
							provider:"weixin",
							success(userInfoRes) {
								//获取用户的微信数据 
								var otherInfo={};
								otherInfo.iv=userInfoRes.iv;
								otherInfo.code=code;
								otherInfo.encryptedData=userInfoRes.encryptedData;
								
								//存储用户信息
								_this.setOtherInfo(JSON.stringify(otherInfo));
								_this.setUserInfo(userInfoRes.rawData);
								
								//展示用户的头像
								_this.avatarUrl=JSON.parse(userInfoRes.rawData).avatarUrl;
								
								//将用户数据存入localStorage中
								_this.wxlogin(otherInfo,code);
							}
						})
					}
				})
				
			},
			//从服务器中获取token
			wxlogin(otherInfo,code){
				
				var timestamp=this.gts();
				var sign=this.md52(code+otherInfo.encryptedData+otherInfo.iv+timestamp+this.secretkey);
				var _this=this;
				
				this.$H({
					methods:'POST',
					url:"/login",
					data:{
						code: code,
						encryptedData: otherInfo.encryptedData,
						iv: otherInfo.iv,
						timestamp: timestamp,
						sign: sign
					},
					async success(res){
						// _this.isShowWrapper=true;
						
						// await setTimeout(function(){
						// 	_this.isShowPhoneBox=true;
						// },10);
						
						//先保存token 如果获取手机号成功才允许登录
						 _this.login(res.data.data.token);
						
						
						uni.showToast({
							title:"登陆成功",
							icon:'none',
							duration:2000
						})
						setTimeout(function(){
							uni.navigateBack({
								delta:1,
								is_outer:1
							})
						},500)
					},
					loginPage:1
				})
			},
			loginWithWX(){
				// api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
				var _this=this;
					
					if(this.NonFreq("wxGetUserInfo",3)){
						return ;
					}
+				
						uni.login({
							provider:"weixin",
							success(res) {
								
								// uni.request({
								// 	url:"https://api.weixin.qq.com/sns/userinfo",
								// 	method:"POST",
								// 	data:{
								// 		access_token:res.authResult.access_token,
								// 		openid: res.authResult.openid
								// 	},
								// 	success(userInfoRes){
								// 		console.log(userInfoRes);
								// 	}
								// });
								
								
								uni.getUserInfo({
									provider:"weixin",
									success(userInfoRes) {
						
										_this.setUserInfo(JSON.stringify(userInfoRes.userInfo));
										var ts=_this.gts(),sign;
										sign=_this.md52(""+userInfoRes.userInfo.openId+userInfoRes.userInfo.unionId+userInfoRes.userInfo.nickName+userInfoRes.userInfo.avatarUrl+ts);
										console.log(userInfoRes);
										
										_this.$H({
											methods:'POST',
											url:"/app_login",
											data:{
												openid:userInfoRes.userInfo.openId,
												unionId:userInfoRes.userInfo.unionId,
												nickname:userInfoRes.userInfo.nickName,
												headimgurl:userInfoRes.userInfo.avatarUrl,
												timestamp:ts,
												sign:sign
											},
											success(httpRes){
												_this.login(httpRes.data.data.token);
												
												uni.showToast({
													title:"登陆成功",
													icon:'none',
													duration:2000
												})
												setTimeout(function(){
													uni.navigateBack({
														delta:1,
														is_outer:1
													})
												},500);
											}
										});
										
										// 展示用户的头像
										_this.avatarUrl=userInfoRes.userInfo.avatarUrl;
									}
								})
							},
							fail(res) {
								uni.showToast({
									icon:'none',
									title:res
								})
							}
						})
						//授权认证
				
			},
			getPhoneNumber(e){
				console.log(e);
			}
			// ,cancel(){
			// 	this.isShowPhoneBox=false;
			// 	setTimeout(()=>{
			// 		this.isShowWrapper=false;
			// 	},200);
				
			// 	uni.showToast({
			// 		title:"您拒绝了授权，登录失败！",
			// 		icon:"none",
			// 		duration:2000
			// 	})
			// },
			// getPhoneNumber(e){
			// 	uni.login({
			// 		provider: 'weixin',
			// 		success(res) {
			// 			console.log(res);
			// 		}
			// 	})
			// 	if(e.detail.errMsg == 'getPhoneNumber:ok'){
					
			// 	}else{
			// 		this.cancel();
			// 	}
			// }
			
			
			,//初始化样式
			returnBtnInitial(obj){
				this.initialTop=obj.height;
			}
			
		}
	}
</script>

<style lang="less">
.user-info-btn{
	border-radius: 300rpx;
	font-size: 26rpx;
	width: 580rpx;
	height: 80rpx;
	line-height: 80rpx;
	background-color: rgb(30,149,238);
	color: #fff;
	letter-spacing: 2rpx;
}
.header {
	margin: 90rpx 0 90rpx 50rpx;
	border-bottom: 1px solid #ccc;
	text-align: center;
	width: 650rpx;
	height: 300rpx;
	line-height: 450rpx;
}

.header image {
	width: 200rpx;
	height: 200rpx;
	border-radius: 100rpx;
}

.content {
	margin-left: 50rpx;
	margin-bottom: 90rpx;
	font-size: 26rpx;
}

.content text {
	display: block;
	color: #9d9d9d;
	font-size: 24rpx;
	margin-top: 40rpx;
}

.bottom {
	border-radius: 80rpx;
	margin: 70rpx 50rpx;
	font-size: 35rpx;
}
.authorize {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	background-color: rgba(0, 0, 0, 0.5);
	.text_center {
		width: 560rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		position: absolute;
		z-index: 12;
		text-align: center;
		padding-bottom: 40rpx;
		opacity: 0;
		transition: opacity 200ms ease-out;
		.top {
			padding: 20rpx 40rpx;
			.title {
				padding: 20rpx 0;
				font-size: 32rpx;
				font-weight: bold;
			}
			.tip {
				padding: 30rpx 0;
				font-size: 30rpx;
				height: 150rpx;
			}
		}

		.bottomBox {
			bottom: 0;
			width: 100%;
			display: flex;
			width: 100%;
			border-radius: 0;
			padding: 0;
			text-align: center;
			
			.btn {
				width: 36%;
				height: 80rpx;
				line-height: 80rpx;
			}
		}

		.btn:after {
			border: none;
		}
		.btn:first-child {
			background-color: #262626;
			color: #fff;
		}
		.btn:last-child {
			background-color: #1e95ee;
			color: #fff;
		}
	}
	
	.text-show{
		opacity: 1;
	}
	
}


</style>
