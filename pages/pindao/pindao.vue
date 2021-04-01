<template>
	<view class="page">
		<image class="" src="../../static/icons/pindao_bg.jpg" class="pindao_bg"></image>
		<div class="lists fr-space-between">
			<image class="item" v-if="isShow" src="../../static/icons/pindao1.png" @click="go('/pages/news/news')"></image>
			<image class="item" v-if="isShow" src="../../static/icons/pindao2.png" @click="go('/pages/house/house')"></image>
			<image class="item" src="../../static/icons/pindao3.png" @click="go('/pages/wedding/wedding')"></image>
			<image class="item" v-if="isShow" src="../../static/icons/pindao4.png" @click="go('/pages/qinzi/qinzi')"></image>
			<image class="item" src="../../static/icons/pindao5.png" @click="go('/pages/edu/edu')"></image>
			<image class="item" v-if="isShow" src="../../static/icons/pindao6.png" @click="go('/pages/food/food')"></image>
			<image class="item" src="../../static/icons/pindao7.png" @click="go('/pages/activity/activity')"></image>
			<image class="item" src="../../static/icons/pindao8.png" @click="go('/pages/welfare/welfare')"></image>
		</div>
		<!-- <return-btn ttl="频道" :radio="bgRadio" @returnBtnInitial="returnBtnInitial"></return-btn> -->
		<!-- 顶部按钮 -->
		<return-btn ttl="频道" :radio="bgRadio" @returnBtnInitial="returnBtnInitial" v-if="is_outer" :usingRedirect="true" url="/pages/index/index"></return-btn>
		<return-btn ttl="频道" :radio="bgRadio"  @returnBtnInitial="returnBtnInitial" v-else></return-btn>
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	export default {
		data() {
			return {
				bgRadio:0,
				isShow:false,
				is_outer:false
			};
		},
		methods:{
			go(url){
				uni.navigateTo({
					url:url
				});
			},
			returnBtnInitial(obj){
				console.log(obj.height);
			}
		},
		components:{
			returnBtn
		},
		onPageScroll(e) {
			var r=e.scrollTop>100?100:e.scrollTop;
			this.bgRadio=e.scrollTop/100;
		},
		onLoad(options) {
			if(uni.getStorageSync("isShowChannel")==1){
				this.isShow=true;
			}
			
			if(options.is_outer!=undefined &&options.is_outer==1){
				this.is_outer=true;
			}
		},
		onShareAppMessage (){
			return {title:'快来看临泉网的新闻资讯吧',path:'/pages/pindao/pindao?is_outer=1'};
		}
	}
</script>

<style lang="less">
.pindao_bg{
	width: 750rpx;
	height: 400rpx;
}
.lists{
	margin: 0 auto;
	width: 627rpx;
	padding-top: 45rpx;
	flex-wrap: wrap;
	
	.item{
		width: 280rpx;
		height: 239rpx;
		display: block;
		margin-bottom: 40rpx;
	}
}
</style>
