<template>
	<view style="overflow: hidden;" >
		<return-btn :radio="bgRadio"  @returnBtnClick="clearSt" :isCenter="true" :ttl="ttl" @returnBtnInitial="returnBtnInitial"></return-btn>
		<div :style="{height:initailTop+'px'}"></div>
		<div class="flex-allcenter" style="margin-top: 200rpx;">
			<image src="../../static/icons/submit_success.png" class="success_bg" mode=""></image>
		</div>
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	export default {
		data() {
			return {
				bgRadio:100,
				initailTop:149,
				ttl:"success!"
			};
		},components:{
			returnBtn
		},methods:{
			clearSt(){
				uni.removeStorageSync("job_desc");
				uni.removeStorageSync("job_fuli");
			},
			returnBtnInitial(obj){
				this.initailTop=obj.height;
			}
		}
	}
</script>

<style lang="less">
.success_bg{
	width: 394rpx;
	height: 498rpx;
}
</style>
