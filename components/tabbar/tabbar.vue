<template>
	<view class="tabbar">
		<div class="tabbar-item" >
			<div class="img-wrapper" @click="goPage('/pages/index/index')">
				<image style="width: 40rpx;height: 38rpx;vertical-align: bottom;padding-bottom: 10rpx;" 
				:src="curPage==0?'../../static/icons/tabbar_home2.png':'../../static/icons/tabbar_home1.png'"></image>
			</div>
			<div class="label" :class="{'label-act':curPage==0}">首页</div>
		</div>
		<div class="tabbar-item"  @click="goPage('/pages/community/community')">
			<div class="img-wrapper">
				<image style="width: 37rpx;height: 36rpx;vertical-align: bottom;padding-bottom: 9rpx;" 
				:src="curPage==1?'../../static/icons/tabbar_community2.png':'../../static/icons/tabbar_community1.png'"></image>
			</div>
			<div class="label" :class="{'label-act':curPage==1}">社区</div>
		</div>
		<div class="tabbar-item"  @click="showJobBox()">
			<div class="img-wrapper">
				<div class="blue-round">
					<div class="flex-allcenter" style="width: 100%;height: 100%;">
						<image src="../../static/icons/plus.png" class="plus"></image>
					</div>
				</div>
			</div>
			<div class="label"  >发布</div>
		</div>
		<div class="tabbar-item" @click="goPage('/pages/pindao/pindao')" v-if="isShow">
			<div class="img-wrapper">
				<image style="width: 37rpx;height: 37rpx;vertical-align: bottom;padding-bottom: 8rpx;" src="../../static/icons/tabbar_shop1.png"></image>
			</div>
			<div class="label">频道</div>
		</div>
		<div class="tabbar-item"  @click="goPage('/pages/me/me')">
			<div class="img-wrapper">
				<image style="width: 34rpx;height: 36rpx;vertical-align: bottom;padding-bottom: 11rpx;" 
				:src="curPage==4?'../../static/icons/tabbar_me2.png':'../../static/icons/tabbar_me1.png'"></image>
			</div>
			<div class="label"  :class="{'label-act':curPage==4}">我的</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:true
			};
		},
		props:{
			curPage:{
				type:[Number,String],
				default:0
			}
		},
		methods:{
			goPage(url){
				if(url.indexOf("pindao")!=-1){
					uni.navigateTo({
						url:url					
					})
				}
				uni.redirectTo({
					url:url					
				})
			},
			showJobBox(){ //发布信息
				this.$emit("showJobBox",{});
			}
		},
		mounted() {
			if(typeof uni.getStorageSync("isShowChannel") == 'number'){
				this.isShow=~~uni.getStorageSync("isShowChannel");
			}
		},
		
	}
</script>

<style lang="less">
.tabbar{
	background-color: #fff;
	height: 100rpx;
	width: 750rpx;
	bottom: 0;
	position: fixed;
	left: 0;
	text-align: center;
	box-shadow: 0rpx 0rpx 20rpx rgba(30,149,238,0.5);
}
.tabbar-item{
	vertical-align: middle;
	display: inline-block;
	height: 100rpx;
	margin-right: 89rpx;
	width: 52rpx;
}
.tabbar-item:last-child{
	margin-right: 0;
}
.img-wrapper{
	height: 66rpx;
	width: 52rpx;
	position: relative;
	text-align: center;
	line-height: 66rpx;
}
.label{
	height: 100-66rpx;
	width: 52rpx;
	text-align:center;
	font-size: 20rpx;
	line-height: 20rpx;
	color: #666;
}

.label-act{
	color: #1e95ee;
}
.blue-round{
	width: 54rpx;
	height: 54rpx;
	background-color: #2f9bfe;
	border-radius: 54/2rpx;
	box-shadow: 0px 0px 10rpx #2f9bfe;
	display: inline-block;
	vertical-align: bottom;
	margin-bottom: 4rpx;
}
.plus{
	width: 28rpx;
	height: 27rpx;
	display: block;
}
</style>
