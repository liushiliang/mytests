<template>
	<view>
		<return-btn ttl="个人中心" :isCenter="true" :disableBtn="true" :radio="bgRadio"></return-btn>
		<image src="../../static/icons/me_bg.jpg" class="me_bg" mode="widthFix"></image>
		<div class="_self_page">
			
			
			<div class="container user-info fr-start">
				<image src="../../static/icons/default_user.png" v-if="avatarUrl==''" class="user-icon" mode=""></image>
				<image :src="avatarUrl" v-else class="user-icon" mode=""></image>
				
				<div>
					<div class="username">
						<text v-if="isLogin">{{username}}</text>
						<text v-else @click="justgo('login')">点击登录</text>
					</div>
					<div class="phone-number" v-if="isLogin">
						
					</div>
				</div>
			</div>
			<div class="me-lists">
				
				<!-- 单个按钮 start-->
				<div class="mi fr-space-between container" @click="navWithAuth('myfav')">
					<div class="fr-start">
						<div class="mi-icon">
							<image src="../../static/icons/mebtn1.png" style="width: 32rpx;height: 36rpx;" mode=""></image>
						</div>
						<div class="mi-h">我的收藏</div>
					</div>
					<image src="../../static/icons/right_arrow_gray.png" class="right-arrow" mode=""></image>
				</div>
				<!-- 单个按钮 end-->
				<div class="centerline"></div>
				
				
				<!-- 单个按钮 start-->
				<div class="mi fr-space-between container " @click="navWithAuth('mySend')">
					<div class="fr-start">
						<div class="mi-icon">
							<image src="../../static/icons/mebtn2.png" style="width: 35rpx;height: 35rpx;" mode=""></image>
						</div>
						<div class="mi-h">我的发布</div>
					</div>
					<image src="../../static/icons/right_arrow_gray.png" class="right-arrow" mode=""></image>
				</div>
				
				<!-- 单个按钮 end-->
			
				<!-- <div class="centerline"></div> -->
				
				<!-- 单个按钮 start
				<div class="mi fr-space-between container" @click="showLists">
					<div class="fr-start">
						<div class="mi-icon">
							<image src="../../static/icons/mebtn3.png" style="width: 31rpx;height: 35rpx;" mode=""></image>
						</div>
						<div class="mi-h fr-space-between">
							<text>清理缓存</text>
							<text style="color: #b7b5b5;font-size: 20rpx;"><text v-if="curStorageSize>0 && curStorageSize<10">0.01MB</text><text v-else-if="curStorageSize==0">0.00MB</text><text v-else>{{(curStorageSize/1024).toFixed(2)}}MB</text></text>
						</div>
					</div>
					<image src="../../static/icons/right_arrow_gray.png" class="right-arrow" mode=""></image>
				</div>
				单个按钮 end-->
				
				<div class="centerline"></div>
				
				<!-- 单个按钮 start-->
				<div class="mi fr-space-between container" @click="checkVersion">
					<div class="fr-start">
						<div class="mi-icon">
							<image src="../../static/icons/mebtn4.png" style="width: 34rpx;height: 34rpx;" mode=""></image>
						</div>
						<div class="mi-h fr-space-between">
							<text>关于临泉</text>
							<text style="color: #b7b5b5;font-size: 24rpx;">版本1.0</text>
						</div>
					</div>
					<image src="../../static/icons/right_arrow_gray.png" class="right-arrow" mode=""></image>
				</div>
				<!-- 单个按钮 end-->
				
				<div class="centerline"></div>
				
				<!-- #ifdef APP-PLUS -->
				<!-- 单个按钮 start-->
				<div class="mi fr-space-between container " @click="showPolicy">
					<div class="fr-start">
						<div class="mi-icon">
							<image src="../../static/icons/policy.png" style="width: 35rpx;height: 35rpx;" mode=""></image>
						</div>
						<div class="mi-h">隐私政策</div>
					</div>
					<image src="../../static/icons/right_arrow_gray.png" class="right-arrow" mode=""></image>
				</div>
				<!-- 单个按钮 end-->
				<!-- #endif -->
				
				
				<div class="centerline"></div>
				
				<!-- 单个按钮 start-->
				<div class="mi fr-space-between container" v-if="isLogin" @click="logOut">
					<div class="fr-start">
						<div class="mi-icon">
							<image src="../../static/icons/mebtn5.png" style="width: 36rpx;height: 36rpx;" mode=""></image>
						</div>
						<div class="mi-h">退出登录</div>
					</div>
					<image src="../../static/icons/right_arrow_gray.png" class="right-arrow" mode=""></image>
				</div>
				<!-- 单个按钮 end-->
				
				<div class="centerline" v-if="isLogin"></div>
				
			</div>
			
		</div>
		
		<!-- #ifdef APP-PLUS -->
		<div class="black-wrapper2" v-if="isShowBlackWrapper">
			
			<scroll-view class="policy-block" scroll-y="true">
				<div class="pb-h ta">临泉网隐私政策和使用条款</div>
				<div class="pb-content">
					本应用深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。 请在使用我们的产品（或服务）前，仔细阅读并了解本《隐私权政策》。
					<br/>
					<br/>
					<div class="pb-h2">一、我们如何收集和使用您的个人信息</div>
					个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息。 我们仅会出于本政策所述的以下目的，收集和使用您的个人信息：
					<br/>
					（一）我们不出售任何商品，同时也不展示任何商品
					<br/>
					（二）开展内部数据分析和研究，第三方SDK统计服务，改善我们的产品或服务
					<br/>
					我们收集数据是根据您与我们的互动和您所做出的选择，包括您的隐私设置以及您使用的产品和功能。我们收集的数据可能包括SDK/API/JS代码版本、浏览器、互联网服务提供商、IP地址、平台、时间戳、应用标识符、应用程序版本、应用分发渠道、独立设备标识符、iOS广告标识符（IDFA)、安卓广告主标识符、网卡（MAC）地址、国际移动设备识别码（IMEI）、设备型号、终端制造厂商、终端设备操作系统版本、会话启动/停止时间、语言所在地、时区和网络状态（WiFi等）、硬盘、CPU和电池使用情况等。
					<br/>
					当我们要将信息用于本策略未载明的其它用途时，会事先征求您的同意。
					<br/>
					当我们要将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。
					<br/>
					<br/>
					<div class="pb-h2">二、我们如何共享、转让、公开披露您的个人信息</div>
					（一）共享
					<br/>
					我们不会向其他任何公司、组织和个人分享您的个人信息，但以下情况除外：
					<br/>
					1、在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。
					<br/>
					2、我们可能会根据法律法规规定，或按政府主管部门的强制性要求，对外共享您的个人信息。
					<br/>
					3、与我们的关联公司共享：您的个人信息可能会与我们关联公司共享。我们只会共享必要的个人信息，且受本隐私政策中所声明目的的约束。关联公司如要改变个人信息的处理目的，将再次征求您的授权同意。
					<br/>
					我们的关联公司包括:【无】。
					<br/>
					4、与授权合作伙伴共享：仅为实现本隐私权政策中声明的目的，我们的某些服务将由授权合作伙伴提供。我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。例如，我们聘请来提供第三方数据统计和分析服务的公司可能需要采集和访问个人数据以进行数据统计和分析。在这种情况下，这些公司 必须遵守我们的数据隐私和安全要求。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。
					<br/>
					（二）转让
					<br/>
					我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：
					<br/>
					1、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；
					<br/>
					2、在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会在要求新的持有您个人信息的公司、组织继续受此隐私政策的约束，否则我们将要求该公司、组织重新向您征求授权同意。
					<br/>
					（三）公开披露
					<br/>
					我们仅会在以下情况下，公开披露您的个人信息：
					<br/>
					1、获得您明确同意后；
					<br/>
					2、基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。
					<br/>
					<br/>
					<div class="pb-h2">三、我们如何保护您的个人信息</div>
					（一）我们已使用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，保护您的个人信息。例如，在您的浏览器与“服务”之间交换数据（如信用卡信息）时受 SSL 加密保护；我们同时对我们网站提供 https 安全浏览方式；我们会使用加密技术确保数据的保密性；我们会使用受信赖的保护机制防止数据遭到恶意攻击；我们会部署访问控制机制，确保只有授权人员才可访问个人信息；以及我们会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。
					<br/>
					（二）我们会采取一切合理可行的措施，确保未收集无关的个人信息。我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。
					<br/>
					（三）互联网并非绝对安全的环境，而且电子邮件、即时通讯、及与其他我们用户的交流方式并未加密，我们强烈建议您不要通过此类方式发送个人信息。请使用复杂密码，协助我们保证您的账号安全。
					<br/>
					（四）互联网环境并非百分之百安全，我们将尽力确保或担保您发送给我们的任何信息的安全性。如果我们的物理、技术、或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改、或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。
					<br/>
					（五）在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。
					<br/>
					同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。
					<br/>
					<br/>
					<div class="pb-h2">四、您的权利</div>
					按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：
					<br/>
					（一）访问您的个人信息
					<br/>
					您有权访问您的个人信息，法律法规规定的例外情况除外。如果您想行使数据访问权，可以通过以下方式自行访问：
					<br/>
					账户信息——如果您希望访问或编辑您的账户中的个人资料信息和支付信息、更改您的密码、添加安全信息或关闭您的账户等，您可以通过访问执行此类操作。
					<br/>
					搜索信息——您可以在应用中访问或清除您的搜索历史记录、查看和修改兴趣以及管理其他数据。
					<br/>
					<br/>
					<div class="pb-h2">五、本隐私权政策如何更新</div>
					我们可能适时会对本隐私权政策进行调整或变更，本隐私权政策的任何更新将以标注更新时间的方式公布在我们网站上，除法律法规或监管规定另有强制性规定外，经调整或变更的内容一经通知或公布后的7日后生效。如您在隐私权政策调整或变更后继续使用我们提供的任一服务或访问我们相关网站的，我们相信这代表您已充分阅读、理解并接受修改后的隐私权政策并受其约束。
					<br/>
				</div>
				
			</scroll-view>
			<div class="pb-btm flex-allcenter" @click="closePolicy">
				<text>确定</text>
			</div>
		</div>
		<!-- #endif -->
		
		
		<div style="height: 100rpx;"></div>
		<tabbar curPage="4" @showJobBox="showJobBox"></tabbar>
		<!-- 工作应聘窗口组件-->
		<job-box :isShowFlag="isShowJobBox" @jobBoxHidden="resetIsShowJobBox"></job-box>
		
		<!-- 选项列表 start 
		<div class="black-wrapper" @click="hideLists" :class="{'show-wrapper':isShowWrapper}" :style="{opacity:wrapperOpacity}"></div>
		<div class="info-block" :style="{bottom:listBottom+'px'}">
			<div class="lists container">
				<div class="item h ta">确定删除所有缓存？离线内容及图片均会被清除。</div> 标题栏 
				<div class="item ta" @click="clearStorage">确认</div>
			</div>
			<div class="footer ta item container item-selected" @click="cancel">取消</div>
		</div>
		 选项列表 end -->
		
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	import tabbar from "../../components/tabbar/tabbar.vue";
	import jobBox from "../../components/jobBox/jobBox.vue";
	
	import {mapState,mapMutations} from "vuex"
	
	export default {
		data() {
			return {
				bgRadio:0,
				//应聘窗口 start
				isShowJobBox:false,  //展示应聘JOB BOX组件
				isShowWrapper:false, //防止页面滚动的遮罩层
				//应聘窗口 end
				// 选项列表
				// listBottom:-1000,
				// isShowWrapper:false,
				// wrapperOpacity:0,
				// 选项列表 end
				
				//缓存大小
				curStorageSize: 1,
				
				//登录信息
				username:"",
				avatarUrl:"",
				
				
				//隐私政策
				isShowBlackWrapper:false
			};
		},components:{
			returnBtn,
			tabbar,
			jobBox
		},
		methods:{
			...mapMutations(['logout']),
			go(url){
				uni.navigateTo({
					url:url
				});
			},
			showJobBox(){//展示JOB-BOX组件窗口
			
				this.isShowJobBox=true;
				this.isShowWrapper=true;
				
			},resetIsShowJobBox(){ //JOB-BOX组件一旦退出 则充值flag 以确保还可以使用
			
				this.isShowJobBox=false;
				this.isShowWrapper=false;
				
			},
			//选项列表 start
			
			// showLists(){//【展示选项列表】
			// 	this.isShowWrapper=true;
			// 	setTimeout((res)=>{
			// 		this.wrapperOpacity=1;
			// 	},50);
			// 	this.listBottom=0;
			// },
			// hideLists(){ 
			// 	//隐藏选项栏
			// 	this.listBottom=-this.getListHeight();
				
			// 	//关闭遮罩 start
			// 	setTimeout((res)=>{
			// 		this.wrapperOpacity=0;
			// 	},100);
			// 	setTimeout((res)=>{
			// 		this.isShowWrapper=false;
			// 	},300)
			// 	//关闭遮罩 end
			// },
			// getListHeight(){ //获取info-block的高度 【用来设置bottom值】
			// 	let bottom;
			// 	wx.createSelectorQuery().select(".info-block").boundingClientRect((res)=>{
			// 		bottom=res.height;
			// 	}).exec();
			// 	return bottom;
			// },
			// cancel(){
				
			// 	//隐藏遮罩和选项栏
			// 	this.hideLists();
			// },
			// },clearStorage(){
			// 	//隐藏遮罩和选项栏
			// 	this.hideLists();
				
			// 	//清除缓存
			// 	uni.clearStorage();
				
			// 	//获取数据大小
			// 	try {
			// 	    const res = uni.getStorageInfoSync();
			// 	    this.curStorageSize=res.currentSize;
			// 	} catch (e) {
			// 		uni.showToast({
			// 			title:"获取数据失败",
			// 			icon:"none"
			// 		});
			// 	}
				
			// 	//成功后
			// 	uni.showToast({
			// 		title:"清理成功",
			// 		icon:"none",
			// 		duration:1500,
			// 		complete:()=>{
			// 			//清理成功后将用户信息清除
			// 			this.avatarUrl="";
			// 			this.logout();
			// 		}
			// 	})
				
			// },
			checkVersion(){
				uni.showToast({
					title:"已是最新版",
					icon:"none"
				})
			
			},
			logOut(){
				this.logout();
				this.avatarUrl="";
				
				uni.showToast({
					title:"退出成功",
					duration:1500,
					icon:"none"
				})
			},
			showPolicy(){
				this.isShowBlackWrapper=true;
			},
			closePolicy(){
				this.isShowBlackWrapper=false;
			}
			
			//选项列表 end
		},mounted() {
			// this.listBottom=-this.getListHeight();
		},
		computed:{
			...mapState(['isLogin','userInfo','otherInfo'])
		},onShow() {
			
			// 获取缓存大小
			try {
			    const res = uni.getStorageInfoSync();
			    this.curStorageSize=res.currentSize;
			} catch (e) {
				uni.showToast({
					title:"获取数据失败",
					icon:"none"
				});
			}
			
			//是否登录 
			if(this.isLogin){
				this.username=this.userInfo.nickName;
				this.avatarUrl=this.userInfo.avatarUrl;
			}
		},
		onShareAppMessage (){
			return {title:'我正在使用临泉网小程序，赶紧跟我一起来体验！',imageUrl:'/static/icons/share.jpg',path:'/pages/index/index'};
		}
	}
</script>

<style lang="less">
	
.me_bg{
	width: 750rpx;
}
.container{
	width: 663rpx;
	margin: 0 auto;
}

._self_page{
	position: absolute;
	top: 218rpx;
	width: 100%;
	
	.user-info{
		margin-bottom: 55rpx;
		
		.user-icon{
			width: 140rpx;
			height: 140rpx;
			border:4rpx solid #fff;
			border-radius: 140/2rpx;
			margin-right: 31rpx;
			display: block;
			font-size: 0;
			line-height: 0;
		}
		.username{
			margin-top: 30rpx;line-height: 36rpx;font-size: 36rpx;color: #fff;padding-bottom: 27rpx;
		}
		.phone-number{
			font-size: 26rpx;
			color: #fff;
		}
		
	}
	
	.me-lists{
		margin-top: 14rpx;
		border-radius: 25rpx;
		background-color: #fff;
		
		.mi{
			height: 116rpx;
			align-items: center;
			
			&>.fr-start{
				align-items: center;
			}
			.mi-icon{
				width: 72rpx;
			}
			.mi-h{
				color: #303233;
				font-size: 30rpx;
				line-height: 30rpx;
				width: 566rpx;
			}
		}
		.right-arrow{
			width: 13rpx;
			height: 21rpx;
		}
		
	}
	image{
		display: block;
	}
}
.centerline{
	width: 700rpx;height: 1rpx;background-color: #f0f0f0;margin-left: 118rpx;
}


//自定义actionSheet start

.black-wrapper{
	display: none;
	transition: all 200ms ease-out;
	opacity: 0;
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,0.15);
	z-index: 200;
	top: 0;
	left: 0;
 }
 .show-wrapper{//展示该wrapper
 	opacity: 1;
 	display: block;
 }
 
 .info-block{
		width: 750rpx;
		position: fixed;
		// bottom: -1000rpx;
		bottom: -1000rpx;
		transition: all 300ms ease-out;
		transition-delay: 200ms;
		z-index: 201;
		
		.container{
			margin: 0 auto;
			width: 750-39*2rpx;
		}
		.lists{
			border-radius: 5rpx;
		}
		.item{
			color: #898c91;
			font-size: 28rpx;
			background-color: #fff;
			height: 76rpx;
			line-height: 76rpx;
			letter-spacing: 4rpx;
		}
		.h{
			height: 79rpx;
			line-height: 79rpx;
			//modify
			font-size: 26rpx;
			color: #a7aba7;
			letter-spacing: 2rpx;
		}
		.item-selected{
			color: #4698f4;
		}
		.footer{
			border-radius: 5rpx;
			margin-top: 28rpx;
			margin-bottom: 28rpx;
			width: 750-39*2rpx;
			margin-left: 39rpx;
		}
	}

//自定义actionSheet end





.policy-block{
	width: 690rpx;
	height:85%;
	border-radius: 20rpx;
	box-shadow: 0 0 20rpx #999;
	padding:10rpx 20rpx;
	position: absolute;
	background-color: #fff;
	left: 30rpx;
	top:5%;
	box-sizing: border-box;
	
	.pb-h{
		font-size: 34rpx;
		line-height: 80rpx;
		color: #333;
	}
	.pb-h2{
		font-size: 30rpx;
		line-height: 40rpx;
	}
	.pb-content{
		font-size: 28rpx;
		line-height: 30rpx;
		color: #333;
	}

}
	.pb-btm{
		background-color: #1e95ee;
		width: 690rpx;
		font-size: 32rpx;
		position: absolute;
		top: 92%;
		color: #fff;
		left: 30rpx;
		border-radius: 20rpx;
		height: 6%;
		min-height:38rpx;
		letter-spacing: 4rpx;
		box-shadow: 0 0 20rpx #999;
	}


.black-wrapper2{
	background-color: rgba(0,0,0,0.2);
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	position: fixed;
	z-index:104;
}
.text-indent{
	margin-left: 28*2rpx;
}
</style>
