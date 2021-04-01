<template name="jobBox" >
	<view class="jobBoxPage" v-if="isShowPage">
		<div class="white-wrapper" :class="{'white-wrapper-show':isShow}"></div>
		<div class="job-block" :class="{'job-block-show':isShow}">
			<div class="fr-space-between">
				<div class="jb-item fc-start" @click="goFindJob">
					<div class="round flex-allcenter">
						<image src="../../static/icons/jb1.png" style="width: 40rpx;height: 44rpx;"></image>
					</div>
					<div class="jb-h1">招聘信息</div>
					<div class="jb-h2">免费的招聘平台</div>
					<div class="jb-h2">个人可轻松发布招聘信息</div>
				</div>
				<div class="jb-item fc-start" @click="goReport">
					<div class="round round-yellow flex-allcenter">
						<image src="../../static/icons/jb2.png" style="width: 44rpx;height: 42rpx;"></image>
					</div>
					<div class="jb-h1">投诉举报</div>
					<div class="jb-h2">免费的举报平台</div>
					<div class="jb-h2">个人可轻松发布举报信息</div>
				</div>
			</div>
			<div class="cancel-wrapper flex-allcenter">
				<image src="../../static/icons/cancel_btn.png" @click="hideJobBox" class="jb_cancel_btn"></image>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		name:"jobBox",
		data() {
			
			return {
				isShowPage:false,
				isShow:false
			}
		},methods:{
			hideJobBox(){
				this.isShow=false; //再展示页面元素 动画
				setTimeout((res)=>{
					this.isShowPage=false; //先挂载页面
				},330);
				
				//告诉父组件改变flag值
				this.$emit("jobBoxHidden",{})
			},
			goFindJob(){
				// uni.navigateTo({
				// 	url:'/pages/findjob/findjob'
				// });
				this.navWithAuth("findjob");
				
				this.hideJobBox();
			},
			goReport(){
				// uni.navigateTo({
				// 	url:'/pages/report/report'
				// });
				this.navWithAuth("report");
				
				this.hideJobBox();
			}
		},props:{
			isShowFlag:{ //是否显示JobBox
				type:Boolean,
				default:false
			}
		},watch:{
			isShowFlag(newVal,val){
				if(newVal){
					this.isShowPage=true; //先挂载页面
					
					setTimeout((res)=>{
						this.isShow=true; //再展示页面元素 动画
					},50)
				}
			}
		}
	}
</script>

<style lang="less">
	.jobBoxPage{
		left: 0;
		top: 0;
		z-index: 101;
		width: 750rpx;
		height:100%;
		position: fixed;
	}
	//白色遮罩层
	.white-wrapper{
		background-color: rgba(255,255,255,0.97);
		left: 0;
		top: 0;
		position: absolute;
		z-index: 102;
		opacity: 0;
		width: 750rpx;
		height:100%;
		transition: all 200ms ease-out;
		transition-delay: 500ms;
	}
	.white-wrapper-show{
		opacity: 1;
		transition-delay:0ms;
	}
	
	//显示面板
	.job-block{
		z-index: 103;
		bottom: -500rpx;
		width: 600rpx;
		position: absolute;
		left: (750-600)/2rpx;
		transition: all 230ms ease-out;
		transition-delay: 100ms;
		
		.jb-item{
			width: 270rpx;
			align-items: center;
			
			.round{
				width: 112rpx;
				height: 112rpx;
				background-color: #84bbf7;
				border-radius: 112/2rpx;
			}
			.round-yellow{
				background-color: #c9b079;
			}
			.jb-h1{
				padding-top: 27rpx;
				font-size: 32rpx;
				line-height: 32rpx;
				color: #3c3c3c;
				padding-bottom: 28-10/2rpx;
			}
			.jb-h2{
				font-size: 24rpx;
				line-height: 24+10rpx;
				color: #7e7d7d;
			}
		}
		.cancel-wrapper{
			padding-top: 189-20rpx;
			
			.jb_cancel_btn{
				width: 29rpx;
				height: 29rpx;
				padding: 20rpx 30rpx;
			}
		}
	}
	.job-block-show{
		bottom: 238rpx;
	}
	
</style>
