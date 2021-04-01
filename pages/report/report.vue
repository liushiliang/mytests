<template>
	<view class="_selfpage">
		<return-btn ttl="投诉举报" :isCenter="true" :radio="bgRadio"  @returnBtnInitial="returnBtnInitial"></return-btn>
		<div class="whole-page-wrapper" :style="{top:initialTop+'px'}">
			<div class="whole-page">
				<div class="container">
					<div class="fjf-h fr-start" >
						<div class="fjf-h-bar"></div>
						请输入您的具体投诉内容
					</div>
					<textarea v-model="ipt" @input="getLen" placeholder="填写信息的详情描述" :auto-height="true" class="ipt-text" maxlength="200"/>
					<div class="showlen">
						<div class="showlen-txt">{{iptLen}}/200</div>
					</div>
					<div style="height: 41rpx;border-bottom: 2rpx solid #e0e0e0;width: 780rpx;margin-left: -32rpx;"></div>
					<div class="fjf-h fr-start" >
						<div class="fjf-h-bar"></div>
						上传附件
						
					</div>
					<div class="btn-list fr-start">
						<div v-for="item,index in uploadImgArr" class="uploaded-img-wrapper" >
							<image :src="item" mode="" class="uploaded-img" ></image>
							<div class="del-btn flex-allcenter" @click="delImg" :data-id="index">
								<image src="../../static/icons/x.png" style="width: 24rpx;height: 24rpx;" mode=""></image>
							</div>
						</div>
						<div class="attachment-btn fc-start" @click="uploadImg" v-if="uploadImgArr.length<1">
							<image src="../../static/icons/addition.png" class="addition" mode=""></image>
							<div class="ab-label">上传图片</div>
						</div>
						
						<!-- 操作完成按钮 -->
					</div>
				</div>
				
			</div>
			<div style="box-shadow: 0px 0px 20rpx #e2e2e2;margin-top: 28rpx;line-height: 87rpx;">
				<div class="container fr-start" style="align-items: center;">
					<div style="font-size: 30rpx;color: #333;margin-right: 82rpx;">联系电话</div>
					<input type="number" v-model="phoneNumber" placeholder="请输入手机号码"  maxlength="11" style="color: #aba9a9;font-size: 25rpx;width: 400rpx;color: #333;"/>
				</div>
			</div>
			<div class="btn-wrapper flex-allcenter" style="padding-bottom: 70rpx;">
				<div class="submit-btn" @click="comfirm">提交投诉</div>
			</div>
		</div>
	</view>
</template>

<script>
	import returnBtn from"../../components/returnBtn/returnBtn.vue";
	import {mapState} from "vuex"
	
	export default {
		data() {
			return {
				bgRadio:100,
				ipt:"",
				iptLen:0,
				uploadImgArr:[], //上传的图片临时保存路径
				netImgArr:[],
				isSelectedImg:true ,//是否选中
				phoneNumber:"",
				
				initialTop:149+26
			};
		},components:{
			returnBtn
		},methods:{
			getLen(){
				this.iptLen=this.ipt.length;
			},
			uploadImg(){
	
				uni.chooseImage({
				    count: 1-this.uploadImgArr.length, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success:(res)=>{
				        this.uploadImgArr.push(...res.tempFilePaths);
				    }
				});
			},
			delImg(e){
				this.uploadImgArr.splice(e.currentTarget.dataset.id,1);
				if(this.uploadImgArr.length==0){
					this.isSelectedImg=false;
				}
			},
			comfirm(){
				if(this.phoneNumber==""){
					uni.showToast({
						title:"手机号码未填写",
						icon:"none",
						duration:1700
					});
				}else if(this.iptLen==0){
					uni.showToast({
						title:"请输入您的具体投诉内容!",
						icon:"none",
						duration:1700
					});
				}else if(this.phoneNumber.match(/^1[3-9]\d{9}$/)==null){
					uni.showToast({
						title:"手机号码不合法",
						icon:"none",
						duration:1700
					});
				}else if(this.uploadImgArr.length==0){
					uni.showToast({
						title:"您未选择图片",
						icon:"none",
						duration:1700
					});
				}else{
					//验证
					//先上传图片到服务器
					var _this=this,ts=this.gts();
					
					if(this.NonFreq("comfirm",3)){
						return ;
					}
					
					//上传图片
					uni.uploadFile({
						url:"https://lqxcx.uperme.com/api/v1/upload_img",
						filePath:_this.uploadImgArr[0],
						name:"path",
						header: {
							'Content-Type': 'multipart/form-data',
							Authorization: 'Bearer' + uni.getStorageSync('token')
						},
						method: 'POST',
						formData: {
							image:_this.uploadImgArr[0],
							timestamp:ts,
							sign:_this.md52(_this.uploadImgArr[0]+ts+_this.secretkey)
						},
						success(res){
							
						const back = JSON.parse(res.data);
						
							if (back.code == 200) {
								var imgUrl = back.data.path;
								_this.netImgArr.push(imgUrl);
								
								ts=_this.gts();
								
								_this.$H({
									url:"/feedback",
									data:{
										content:_this.ipt,
										image:_this.netImgArr[0],
										timestamp:ts,
										sign:_this.md52(_this.ipt+_this.netImgArr[0]+ts+_this.secretkey)
									},
									success(res){
										console.log(res);
										uni.redirectTo({
											url:"/pages/submit_success/submit_success"
										})
									}
								});
							} else {
								
								uni.showToast({
									title: '图片上传失败，请重新上传',
									icon: 'none'
								});
								
							}
						}
													
					})
					
					
					// uni.redirectTo({
					// 	url:"/pages/submit_success/submit_success"
					// })
				}
			},
			
			returnBtnInitial(obj){
				this.initialTop=obj.height+uni.upx2px(26);
			}
		},
		computed:{
			...mapState(['secretkey'])
		}
	}
</script>

<style lang="less">
._selfpage{
	position: absolute;	
	width: 100%;
	height: 100%;
}
.whole-page-wrapper{
	position: relative;
	width: 100%;
	left: 0;
	// top:26+149rpx;
}
.whole-page{
	box-shadow: 0px 0px 20rpx #e2e2e2;
	padding-bottom: 42rpx;
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
.btn-list{
	padding-top: 40rpx;
	flex-wrap: wrap;
	
	.attachment-btn{
		width: 125rpx;
		height: 125rpx;
		border-radius: 12rpx;
		box-sizing: border-box;
		border: 4rpx solid #bfbfbf;
		margin-right: 28rpx;
		align-items: center;
		margin-bottom: 30rpx;
		
		.addition{
			width: 29rpx;
			height: 29rpx;
			margin-top: 20rpx;
		}
		.ab-label{
			margin-top: 30rpx;
			color: #bfbfbf;
			font-size: 20rpx;
			line-height: 20rpx;
		}
	}
	
	// 已上传的图片
	.uploaded-img-wrapper{
		width: 125rpx;
		height: 125rpx;
		position: relative;
		margin-right: 28rpx;
		margin-bottom: 30rpx;
	}
	.uploaded-img{
		width: 125rpx;
		height: 125rpx;
		object-fit: cover;
		border-radius: 12rpx;
		display: block;
		box-shadow: 0rpx 0rpx 20rpx 5rpx #ddd;
	}
	.del-btn{
		// background: -webkit-linear-gradient(,,);
		background-color: #666;
		width: 34rpx;
		height: 34rpx;
		top: -34/2rpx;
		right: -34/2rpx;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 10rpx #555;
		color: #fff;
		position: absolute;
	}
	

}
.btn-wrapper{
	margin-top: 96rpx;
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

	.hideDelBtn{
		color: #fff;
		font-size: 22rpx;
		line-height: 34rpx;
		height: 34rpx;
		width: 100rpx;
		border-radius: 8rpx;
		background-color: #1e95ee;
		box-shadow: 0px 0px 20rpx 10rpx #ddd;
		margin-left: 20rpx;
		align-self: center;
		text-align: center;
		opacity: 0;
		transition: opacity 200ms ease-out;
		-webkit-justify-self: right;
	}
	.showHideDelBtn{
		opacity:1;
	}
</style>


