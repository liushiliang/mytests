<template>
	<view>
		<return-btn ttl="招聘详情" :radio="bgRadio" :isCenter="true"  @returnBtnInitial="returnBtnInitial" v-if="is_outer" :usingRedirect="true" url="/pages/givejob/givejob?is_outer=1"></return-btn>
		<return-btn ttl="招聘详情" :radio="bgRadio" :isCenter="true"  @returnBtnInitial="returnBtnInitial" v-else></return-btn>
		<div class="header-wrapper" :style="{'margin-top':initialTop+'px'}">
			<div class="header">
				<div class="h1 show_two"><text v-if="info.job_title!=undefined">{{info.job_title}}/{{info.job_nature}}</text></div>
				<div class="h2 textHidden"><text v-if="info.company_name!=undefined">{{info.company_name}}</text></div>
				<div class="h3 textHidden"><text v-if="info.company_address!=undefined">{{info.company_address}}<text class="split-line">|</text>{{info.degree}}<text class="split-line">|</text>{{info.work_experience}}</text></div>
				<div class="h4 textHidden"><text v-if="info.job_salary!=undefined">{{info.job_salary}}</text></div>
			</div>
			<div class="location container fr-space-between" @click="openLoc">
				<div class="fr-start" style="align-items: center;">
					<image class="location-img" src="../../static/icons/location.png"></image>
					<div class="location-ttl">{{info.company_address}}</div>
				</div>
				<image src="../../static/icons/right_arrow_gray.png" class="right-arrow"></image>
			</div>
		</div>
		
		<div class="container sec">
			<div class="sec-h">职位要求以及员工福利</div>
			<div class="subttl">[职位描述]</div>
			<div class="p"><text v-if="info.job_description!=undefined">{{info.job_description}}</text></div>
			<div class="subttl">[要求工作经验]</div>
			<div class="p"><text v-if="info.work_experience!=undefined">{{info.work_experience}}</text></div>
			<div class="subttl">[公司福利]</div>
			<div class="p"><text v-if="info.company_welfare!=undefined">{{info.company_welfare}}</text></div>
		</div>
		
		<div class="container sec" style="margin-bottom: 40rpx;">
			<div class="sec-h">联系方式</div>
			<div class="p fr-start" @click="callPhone" style="align-items: center;">联系电话：<text v-if="info.contact_number!=undefined">{{info.contact_number}}</text><image mode="widthFix" class="phoneimg" src="../../static/icons/blue_phone.png"></div>
			<div class="p">联系人：<text v-if="info.contact_person!=undefined">{{info.contact_person}}</text></div>
			<div class="p">简历投递邮箱：<text v-if="info.email!=undefined">{{info.email}}</text></div>
		</div>
		
		<!-- 选项列表 start -->
<!-- 		<div class="black-wrapper" @click="hideLists" :class="{'show-wrapper':isShowWrapper}" :style="{opacity:wrapperOpacity}"></div>
		<div class="info-block" :style="{bottom:listBottom+'px'}">
			<div class="lists container">
				<div class="item h ta">打开地图</div><!-- 标题栏 -->
			<!-- 	<div class="item ta" @click="openTencentMap">腾讯地图</div>
			</div>
			<div class="ta item  item-selected footer" @click="cancel">取消</div>
		</div> -->
		
		<!-- <a style="display: none;" href="androidamap://viewMap?sourceApplication=appname&poiname=云掌大厦&lat=31.83385&lon=117.18936&dev=0">云掌大厦</a> -->

		<!-- 选项列表 end -->
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	import {mapState} from "vuex"
	
	export default {
		data() {
			return {
				bgRadio:100,
				// 选项列表
				listBottom:-1000,
				isShowWrapper:false,
				wrapperOpacity:0,
				// 选项列表 end
				
				info:{},
				
				initialTop:149+20,
				
				is_outer:false
			};
		},components:{
			returnBtn
		},computed:{
			...mapState(['secretkey','isLogin'])
		},methods:{
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
				
			// },openTencentMap(){
			// 	//隐藏遮罩和选项栏
			// 	this.hideLists();
			// 	var _this=this;
				
			
			// }
			//选项列表 end
			
			openLoc(){
				var lat=parseFloat(this.info.lat_lon.split(",")[0]),lon=parseFloat(this.info.lat_lon.split(",")[1]),address=this.info.company_address;
		
				uni.openLocation({
					name:address,
					latitude:lon,
					longitude:lat
				});
			}
			,
			returnBtnInitial(obj){
				this.initialTop=obj.height+uni.upx2px(27);
			},
			callPhone(){
				uni.makePhoneCall({
					phoneNumber:this.info.contact_number,
					fail(){
						uni.showToast({
							icon:"none",
							title:"拨打失败！"
						})
					}
				})
			}
		},mounted() {
			// this.listBottom=-this.getListHeight();
		},onLoad(options) {
			var st=this.gts(),_this=this;
			
			if(options.is_outer!=undefined && options.is_outer==1){
				this.is_outer=true;
				
				if(!this.isLogin){
					uni.navigateTo({
						url:"/pages/login/login"
					})
				}
			}
			
			this.$H({
				url:"/get_recruitment_detail",
				data:{
					id:options.id,
					timestamp:st,
					sign:_this.md52(""+options.id+st+this.secretkey)
				},
				success(res){
					_this.info=res.data.data.info;
				}
			})
		},
		onShareAppMessage (){
			return {title:'这里有临泉最新的招聘咨询',path:'/pages/givejob/givejob?is_outer=1'}
		}
	}
</script>

<style lang="less">
.container{//版心
	padding: 0rpx (750-684)/2rpx;
	margin: 0 auto;
}
.header-wrapper{
	// margin-top: 27+149rpx;
	box-shadow: 0rpx 0rpx 10rpx #e4e4e4;
}
.phoneimg{
	width: 28rpx;
	height: 28rpx;
	margin-top: -10rpx;
	padding-left: 10rpx;
	display: block;
}
.header{
	padding: 47-30/2rpx 35rpx 46rpx 35rpx;
	border-bottom: 1px solid #e6e6e6;
	
	.h1{
		color: #333;
		font-size: 43rpx;
		line-height: 30+43rpx;
		padding-bottom: 43-30/2rpx;
	}
	.h2{
		padding-bottom: 42rpx;
	}
	.h3{
		padding-bottom: 28rpx;
	}
	.h2,.h3{
		font-size: 28rpx;
		color: #ababab;
		line-height: 28rpx;
	}
	.h4{
		font-size: 28rpx;
		color: #fc7777;
		line-height: 28rpx;
	}
	.split-line{
		margin-right: 14rpx;
		margin-left: 14rpx;
	}
}

.location{
	align-items: center;
	
	.location-img{
		width: 21rpx;
		height: 25rpx;
		margin-right: 14rpx;
	}
	.location-ttl{
		font-size: 28rpx;
		color: #ababab;
		line-height: 34rpx;
		padding-top: 41-(34-26)/2rpx;
		padding-bottom: 41-(34-26)/2rpx;
		max-width: 600rpx;
	}
}
.right-arrow{
	width: 13rpx;
	height: 21rpx;
}
.sec{
	margin-top: 28rpx;
	padding-bottom: 43-8rpx;
	box-shadow: 0rpx 0rpx 10rpx #e4e4e4;
	
	.sec-h{
		padding-top: 42rpx;
		font-size: 32rpx;
		color: #333;
		padding-bottom: 43-30+16/2rpx;
		line-height: 32rpx;
	}
	.subttl{
		font-size: 28rpx;
		color: #ababab;
		line-height: 26+30-16/2+4rpx;
	}
	.p{
		font-size: 28rpx;
		line-height: 26+16/2+4rpx;
		color: #ababab;
	}
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
</style>
