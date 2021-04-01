<template>
	<view class="_selfpage">
		<return-btn ttl="公司福利" :isCenter="true" :radio="bgRadio" @returnBtnInitial="returnBtnInitial"></return-btn>
		<div class="whole-page" :style="{top:initialTop+'px'}">
			<div class="container">
				<div class="fjf-h fr-start" >
					<div class="fjf-h-bar"></div>
					请输入您的公司福利
				</div>
				<textarea v-model="ipt" @input="getLen" placeholder="填写信息的详情描述" :auto-height="true" class="ipt-text" maxlength="200"/>
				<div class="showlen">
					<div class="showlen-txt">{{iptLen}}/200</div>
				</div>
				
				<div class="btn-wrapper flex-allcenter">
					<div class="submit-btn" @click="goSubmit">保存</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import returnBtn from"../../components/returnBtn/returnBtn.vue";
	export default {
		data() {
			return {
				bgRadio:100,
				ipt:"",
				iptLen:0,
				
				
				
				initialTop:149+26
			};
		},components:{
			returnBtn
		},methods:{
			getLen(){
				this.iptLen=this.ipt.length;
			},
			goSubmit(){//提交表单至localStorage
				var _this=this;
				
				uni.setStorage({
					key:"jobfuli",
					data:_this.ipt.trim()
				})
				
				uni.showToast({
					url:"保存成功",
					duration:1500,
					success() {
						uni.navigateBack({
							delta:1
						})
					}
				})
			},
			returnBtnInitial(obj){
				this.initialTop=obj.height+uni.upx2px(26);
			}
		},
		onShow() {		
			this.ipt=uni.getStorageSync("jobfuli");
		}
	}
</script>

<style lang="less">
._selfpage{
	position: absolute;	
	width: 100%;
	height: 100%;
	overflow: hidden;
}
.whole-page{
	box-shadow: 0px 0px 20rpx #e2e2e2;
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top:26+149rpx;
}
.container{
	width: 692rpx;
	margin: 0 auto;
}
.fjf-h{
	padding-top: 27rpx;
	height: 37rpx;
	padding-bottom: 27rpx;
	line-height: 37rpx;
	font-size: 31rpx;
	color: #1e95ee;
	
	.fjf-h-bar{
		width: 5rpx;
		height: 37rpx;
		display: inline-block;
		margin-left: 5rpx;
		margin-right: 13rpx;
		background-color: #ee202e;
	}
	
}

.ipt-text{
	display: block;
	width: 692-37*2rpx;
	padding: 50rpx 37rpx 12rpx 37rpx;
	font-size: 28rpx;
	line-height: 36rpx;
	color: #333;
	min-height: 200rpx;
	background-color: #f9f9f9;
}
.showlen{
	height: 50rpx;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	background-color: #f9f9f9;
	
	.showlen-txt{
		color: #aba9a9;
		font-size: 24rpx;
		margin-right: 18rpx;
		line-height: 24+6*2rpx;
	}
}
.btn-wrapper{
	margin-top: 174rpx;
	
	.submit-btn{
		color: #fff;
		border-radius: 87/2rpx;
		width: 692rpx;
		height: 87rpx;
		line-height: 87rpx;
		background-color: #1e95ee;
		font-size: 29rpx;
		text-align: center;
		letter-spacing: 6rpx;
	}
}
</style>

