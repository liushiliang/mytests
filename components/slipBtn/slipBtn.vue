<template>
	<view>
		<div class="send-item-wrapper fr-start" data-tipsid="0" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
			:style="{left:siLeft+'rpx',marginBottom:marginBottom+'rpx'}" :class="{'send-item-wrapper-ani':isAni}">
			<slot></slot>
			<div class="delete-btn" @click="delItem" :style="{
				height:btnHeight+'rpx','line-height':btnHeight+'rpx'
			}">删除</div>
		</div>
	</view>
</template>

<script>
	export default {
		name:"slipBtn",
		data() {
			return {
				startPos:0,
				siLeft:0, //send-item-wrapper偏移量
				slipState:false,//滑块状态 false为关闭状态
				isAni:true //动画是否打开
			};
		},methods:{
			touchStart(e){
				this.startPos=e.touches[0].clientX;
			},
			touchMove(e){
				let offset=e.touches[0].clientX-this.startPos; //移动距离
				
				//如果offset<0 则左滑
				if(!this.slipState){ //按钮关闭状态
					if(offset>0 ){
						return ;
					}else if(offset<-173){
						this.siLeft=-173;
						return ;
					}else{
						this.siLeft=offset;
					}
				}
				
				//如果offset<0 则右滑
				
				if(this.slipState){ //按钮开启状态
					if(offset<0 ){
						return ;
					}else if(offset>173){
						this.siLeft=0;
						return ;
					}else{
						this.siLeft=offset-173;
					}
				}
			},
			touchEnd(e){
				
				if(this.siLeft<-167/2){ //如果达到值得一半则给滑块复位
				
					this.slipState=true; //开启状态
					this.siLeft=-173;
					
				}else if(this.siLeft>-167/2){ 
					
					this.slipState=false; //开启状态
					this.siLeft=0;
				}
			},
			delItem(){
				this.$emit("delete",{});
			}
		},props:{
			btnHeight:{
				type:[Number,String],
				default:221
			},
			marginBottom:{
				type:[Number,String],
				default:0
			},
			//业务逻辑部分
			id:{
				type:[Number,String],
				default:0
			},
			initialValFlag:{				//解决删除之后会显示其他删除按钮的bug
				type:[Number,String],
				default:0
			}
		},watch:{
			initialValFlag(newVal,val){				//解决删除之后会显示其他删除按钮的bug
				if(newVal>0){
					this.isAni=false;
					this.slipState=false;
					this.siLeft=0;
					this.startPos=0;
					setTimeout((res)=>{
						this.isAni=true;
					},10);
				}
			}
		}
	}
</script>

<style lang="less">
.send-item-wrapper{
	width: 750+173rpx;
	position: relative;
}
.send-item-wrapper-ani{
	transition: all 100ms ease-out;
}
.the-content{
	width: 750rpx;
}
.delete-btn{
	background-color: #f95151;
	width: 173rpx;
	height: 221rpx;
	line-height: 221rpx;
	text-align: center;
	color: #fff;
	font-size: 28rpx;
	letter-spacing: 2rpx;
}
</style>
