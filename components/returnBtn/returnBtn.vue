<template>
	<!-- returnBtn z-index涓00 -->
	<view class="selfpage" :class="{selfpageAni:isSelfpageAni}" :style="{backgroundColor: 'rgba(30,149,238,'+radio+')',height:headerH+'px','padding-top':headerPT+'px'}">
		<div class="block fr-start" :class="{blackTxt:isBlack}" :style="{height:headerH+'px','line-height':headerH+'px'}">
			<image v-if="!disableBtn" :style="{'padding-top':imgPT+'px','padding-bottom':imgPT+'px'}" :src="isBlack?'../../static/icons/returnBtn2.png':'../../static/icons/returnBtn.png'" class="return-img" @click="goPage"></image>
			<div :class="{'block-txt':true,'block-txt-center':isCenter}" :style="{'padding-top':imgPT+'px','padding-bottom':imgPT+'px'}">{{ttl}}</div>
		</div>
		<div class="block-center"></div>
	</view>
</template>

<script>
	export default {
		name:"returnBtn",
		data() {
			return {
				headerPT:0,
				headerH:0,
				imgPT:0,
				
				
				isSelfpageAni:false //是否开启transition动画
			}
		},
		methods: {
			goPage(){
				console.log(1);
				let url=this.url;
				//是否设置url
				if(this.$props.isSetUrl){
					uni.navigateTo({
						url:url
					});
					return ;
				}
				
				//如果使用redirect跳转必须要指定url
				if(this.$props.usingRedirect){
					uni.redirectTo({
						url:url
					})
				}
				
				this.$emit("returnBtnClick",{});
				// #ifdef APP-PLUS
				uni.navigateBack({
					delta:1
				});
				
				return;
				// #endif
				
				uni.navigateBack({
					delta:this.$props.delta,
				});
				
			}
		},
		props:{
			ttl:{
				type:String,
				default:"null"
			},
			url:{
				type:String,
				default:"/pages/index/index"
			},
			radio:{
				type:Number,
				default:0
			},
			isCenter:{
				type:Boolean,
				default: false
			},
			isBlack:{//黑色模式
				type:Boolean,
				default: false
			},
			disableBtn:{//不显示按钮 只作为导航栏
				type:Boolean,
				default:false
			},
			// 是否自定义url
			isSetUrl:{
				type:Boolean,
				default:false
			},
			/**
			 *  如果打开isSetUrl需要指定url
			 *  如果打开usingRedirect也需要指定url
			 */
			url:{ //自定义返回按钮的url 
				type: String,
				default:'/pages/index/index'
			},
			usingRedirect:{//需不需要使用redirectTo访问下一个页面 可以在栈里清除当前页面
				type: Boolean,
				default:false
			},
			delta:{
				type: [Number,String],
				default: 1
			}
		},
		mounted() {
			//通过微信胶囊样式来设置header各个元素的样式
			// #ifdef APP-PLUS
			this.headerPT=uni.upx2px(80);
			this.headerH=uni.upx2px(60);
			this.$emit("returnBtnInitial",{height:uni.upx2px(149)});
			// #endif
			
			// #ifndef APP-PLUS
			let menuButtonInfo=uni.getMenuButtonBoundingClientRect();
			this.headerPT=menuButtonInfo.top;
			this.headerH=menuButtonInfo.height;
			this.imgPT=(menuButtonInfo.height-uni.upx2px(33))/2;
			this.$emit("returnBtnInitial",{height:this.headerPT+this.headerH+uni.upx2px(20)});
			// #endif
			
			this.$emit("returnBtnInitial",{height:this.headerPT+this.headerH+uni.upx2px(20)});
			
			var _this=this;
			setTimeout(function(){
				_this.isSelfpageAni=true;
			},500)
		}
	}
</script>

<style lang="less">
.selfpage{
	position: fixed;
	top: 0;
	left: 0;
	color: #fff;
	padding-bottom: 20rpx;
	// height: 149rpx;
	width: 750rpx;
	z-index: 100;
}
.selfpageAni{
	transition: all 300ms ease;
}
.block{
	// height: 33rpx;
	width: 100%;
	// line-height: 33rpx;
	font-size: 33rpx;
	position: relative;
	
	.return-img{
		width: 20rpx;
		vertical-align: middle;
		height: 33rpx;
		position: absolute;
		z-index: 102;
		padding: 0rpx 50rpx 0rpx 20rpx;
		top: 0;
		left: 0;
	}
	.block-txt{
		position: absolute;
		left: 0;
		top: 0;
		width: 750rpx;
		margin-left: 14+20+27rpx;
		font-size: 34rpx;
		line-height: 34rpx;
		z-index: 101;
	}
	.block-txt-center{
		text-align: center;
		margin-left: 0;
	}
}

//新的样式
.blackTxt{
	color:#333333;
}
</style>
