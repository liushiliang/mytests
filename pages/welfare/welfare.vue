<template>
	<view>
		<return-btn ttl="公益" :radio="bgRadio" :isCenter="true" @returnBtnInitial="returnBtnInitial" v-if="is_outer" :usingRedirect="true" url="/pages/index/index"></return-btn>
		<return-btn ttl="公益" :radio="bgRadio" :isCenter="true" @returnBtnInitial="returnBtnInitial" v-else></return-btn>
		
		<!-- 超级导航栏 start-->
				<div class="nav-wrapper" style="left:-50rpx ;"  :style="{'top':tbsScrollTabMT+'px'}" >
					<tbsScrollTab :tabItems="tabItems"
					 spaceBetween=27 fontSize=32 activeColor="#1e95ee" color="#474747" backgroundColor="#FFFFFF"
					 @tabChangeEvent="onTabChange($event)" :curIndex="curIndex"></tbsScrollTab>
				</div>
		<!-- 超级导航栏 end-->
		
		<!-- 三线按钮 -->
		 <div class="nav-btn flex-allcenter" @click="showSNB"  :style="{'top':tbsScrollTabMT+'px'}" >
			 <image src="../../static/icons/threeline.png" class="threeline" mode=""></image>
		 </div>
		
		<!-- 实际内容 start -->
		<div class="lists" v-if="curIndex==id" v-for="it,id in real_data"  :style="{'padding-top':listsPT+'px'}">
			<div class="welfare-item fr-space-between"  v-for="item,index in it.data"   data-ttl="公益"   :data-id="item.id" @click="toDetail">
				<div class="wi-txt fc-space-between">
					<div class="wi-h1 show_three">
						{{item.title}}
						
					</div>
					<div class="wi-h2 textHidden">
						{{item.create_time}}<image src="../../static/icons/eye.png" class="eye" style="margin-left: 15rpx;margin-right: 7rpx;vertical-align: bottom;"></image>{{item.view}}
					</div>
				</div>
				<image :src="item.thumb"  mode="aspectFill" class="wi-img"></image>
			</div>
			<div class="isNoMore" v-if="it.isNoMore==1">没有更多内容了</div>
		</div>
		<!-- 实际内容 end -->
		
		<!-- 导航栏悬浮框选项卡 start-->
		<div class="black-wrapper" @touchmove.stop.prevent="touchMoveHandler" @click="hideSNB" v-if="isShowWrapper" :class="{'black-wrapper-show':isShowSNB}">asdsadsa</div>
		 <div class="super-nav-block"  :style="{top:snTop+'px'}">
			 <div class="sn-h">我的频道<text style="font-size: 28rpx;margin-left: 20rpx;color: #ababab;">点击进去频道</text></div>
			 <div class="sn-btns fr-start" >
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==0?true:false}" @click="setBtnAndGo(0)">益新闻</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==1?true:false}" @click="setBtnAndGo(1)">益活动</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==2?true:false}" @click="setBtnAndGo(2)">守望计划</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==3?true:false}" @click="setBtnAndGo(3)">益影像</div>
			
			 </div>
			 <image src="../../static/icons/cancel_btn.png" class="cancel_btn" @click="hideSNB"></image>
		 </div>
		 <!-- 导航栏悬浮框选项卡 end-->
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	import tbsScrollTab from "../../components/tbs-scrollTab/tbs-scrollTab.vue";
	import { mapState } from "vuex"
	
	export default {
		data() {
			return {
				bgRadio:100,
				curIndex:0,//超级选项卡当前选择页
				isShowWrapper:false,
				isShowSNB:false,
				tabItems: [{
					name: '益新闻',
					data: {}
				}, {
					name: '益活动',
					data: {}
				}, {
					name: '守望计划',
					data: {}
				}, {
					name: '益影像',
					data: {}
				}],//数据
				real_data:[
					//{data:[],isNoMore:0,isInitialTotalPages:false,totalPage:2,nextPage:1}
				],
				offset:78,
				
				
				//调整位置
				tbsScrollTabMT:149,
				listsPT:149+85,
				
				is_outer:false,
				
				snTop:149-600,
				snTop1:0,
				snTop2:0
			};
		},components:{
			returnBtn,
			tbsScrollTab
		},
		methods:{
			onTabChange(e) {
				this.curIndex = e.tabIndex;
			},go(url){
				uni.navigateTo({
					url:url
				});
			},
			showSNB(){//展示SNB
				this.isShowWrapper=true;
				this.isShowSNB=true;
				this.snTop=this.snTop2;
				this.forbidScroll=true;
			},
			hideSNB(){//隐藏 SNB
				this.isShowSNB=false;
				this.snTop=this.snTop1;
				
				setTimeout(res=>{
					this.isShowWrapper=false;
					this.forbidScroll=false;
				},450);
			},
			setBtnAndGo(index){//选择SNB的按钮 改变样式并跳转
				
				if(index==this.curIndex){
					return ;
				}
				this.curIndex=index;
				this.hideSNB();
			},
			touchMoveHandler(){
				return;
			},
			
			goWelfareDetail(){
				uni.navigateTo({
					url:"/pages/welfare_detail/welfare_detail"
				})
			}//获取数据
			,getDataByColumn(isPush){ //push表明是否是添加数据（比如下拉刷新）
					var _this=this,timestamp=this.gts(), //时间戳
						data, //上传到http的data
						curIndex=this.curIndex,
						columnId;//根据curIndex获取应该访问的栏目
						
					columnId=curIndex+this.offset; 
					// if(curIndex>4){
					// 	columnId=curIndex+82-5;
					// }
					
					//没有更多内容了
					if(this.real_data[curIndex].isInitialTotalPages && this.real_data[curIndex].totalPage<this.real_data[curIndex].nextPage){//如果初始化总页数数组 并且当前访问页已经超过总页数则不访问
						this.real_data[curIndex].isNoMore=1;
						return;
					}
					
					//根据不同的data参数
					//访问不同的数据
					if(isPush){
						data={
							column:columnId,
							page:this.real_data[curIndex].nextPage,
							timestamp:timestamp,
							sign:this.md52(""+columnId+this.real_data[curIndex].nextPage+timestamp+this.secretkey)
						}
					}else{
						data={
							column:columnId,
							timestamp:timestamp,
							sign:this.md52(""+columnId+timestamp+this.secretkey)
						}
					}
					
					this.$H({
						url:isPush?"/get_text_lists_more":"/get_text_lists",
						methods:'POST',
						data:data,
						success(res){
							//获取总页数
							if(isPush && !_this.real_data[curIndex].isInitialTotalPages){
								_this.real_data[curIndex].totalPage=Math.ceil(res.data.data.lists.last_page);
								_this.real_data[curIndex].isInitialTotalPages=true;
							}
							
							if(isPush){
								_this.real_data[curIndex].data=_this.real_data[curIndex].data.concat(res.data.data.lists.data);
								_this.real_data[curIndex].nextPage++;
								
								if(res.data.data.lists.last_page==res.data.data.lists.current_page){
									this.isNoMore=1;
								}
								
								return;
							}
							
							_this.real_data[curIndex].data=[...res.data.data.lists];
							_this.real_data[curIndex].nextPage++;
							
						}
					});
				},
				initialRealData(total){ //初始化realData数组
					for(var i=0;i<total;i++){
						this.real_data.push({data:[],isNoMore:0,isInitialTotalPages:false,totalPage:2,nextPage:1});
					}
				},
				
				//初始化样式
				returnBtnInitial(obj){
					this.tbsScrollTabMT=obj.height;
					this.listsPT=obj.height+uni.upx2px(85);
					
					this.snTop1=obj.height-uni.upx2px(600);
					this.snTop2=obj.height+uni.upx2px(20);
					this.snTop=this.snTop1;
				}
			},
			computed:{
				...mapState(['secretkey'])
			},onLoad(options) {
				if(options.is_outer!=undefined &&options.is_outer==1){
					this.is_outer=true;
				}
				
				this.initialRealData(4); //初始化真实数据
				this.getDataByColumn(false);
				
			},watch:{
				curIndex(new_val){
					if(this.real_data[this.curIndex].data.length==0){
						this.getDataByColumn(false);
					}
				}
			},onReachBottom() {//下拉刷新
				this.getDataByColumn(true);
			}
		,onShareAppMessage (){
			return {title:'这里有临泉最新的公益咨询',path:'/pages/welfare/welfare?is_outer=1'};
		}
	}
</script>

<style lang="less">
	//没有更多了 start
	.isNoMore{
		font-size: 20rpx;
		line-height: 40rpx;
		text-align: center;
		width: 100%;
		color: #999;
	}
		//没有更多了 end
//实际内容start
.lists{
	margin-top: 41rpx;
}
.welfare-item{
	width: 750-18*2-14-30rpx;
	margin: 0 auto;
	padding: 20rpx 14rpx 20rpx 30rpx;
	border-top-right-radius: 25rpx;
	border-bottom-left-radius: 25rpx;
	border-bottom-right-radius: 25rpx;
	box-shadow: 0px 0px 20rpx #ddd;
	margin-bottom: 27rpx;
	
	.wi-txt{
		width: 437rpx;
		height: 203rpx;
		
		.wi-h1{
			line-height: 10+29rpx;
			font-size: 32rpx;
			color: #474747;
			padding-top: 21-5-1rpx;
		}
		.wi-h2{
			font-size: 24rpx;
			color: #989898;
			line-height: 24rpx;
			padding-bottom: 20-2rpx;
		}
	}
	.wi-img{
		width: 188rpx;
		height: 203rpx;
		border-radius: 25rpx;
	}
}
//实际内容end

.nav-wrapper{
	top: 149rpx;
	position: fixed;
	z-index: 50;
	width: 750rpx;
}

.nav-btn{
	position: fixed;
	height: 84rpx;
	width: 92rpx;
	background-color: #fff;
	top: 149rpx;
	right: 0;
	box-shadow: -10rpx 0rpx 10rpx #fff;
	z-index: 51;
	
	.threeline{
		width: 33rpx;
		height: 27rpx;
	}
}


//超级上层选项卡
.black-wrapper{
	background: rgba(0,0,0,0);
	width: 100%;
	height: 100%;
	z-index: 80;
	position: fixed;
	left: 0;
	top: 0;
	transition: background 300ms ease-out;
	transition-delay: 1ms;
}
.black-wrapper-show{
	background: rgba(0,0,0,0.7);
}
.super-nav-block{
	background-color: #fff;
	position: fixed;
	z-index: 81;
	left: 0;
	top:149-404rpx;
	width: 750rpx;
	padding-top: 42rpx;
	border-radius: 25rpx;
	transition: all 300ms ease-out;
	transition-delay: 50ms;
	
	.sn-h{
		top: 149rpx;
		line-height: 34rpx;
		font-size: 34rpx;
		color: #333;
		margin: 0 auto;
		width: 684rpx;
		.sn-h2{
			
		}
	}
	.sn-btns{
		margin: 0 auto;
		margin-top: 42rpx;
		flex-wrap: wrap;
		width: 684rpx;
		padding-bottom: 66rpx;
		
		.sn-item{
			margin-bottom: 28rpx;
			margin-right: (684-219*3)/2rpx;
			width: 219rpx;
			height: 86rpx;
			line-height: 86rpx;
			text-align: center;
			font-size: 32rpx;
			letter-spacing: 4rpx;
			background-color: #f2f2f2;
			border-radius: 6rpx;
		}
		.sn-item-selected{
			background-color: #1e95ee;
			color: #fff;
		}
		.sn-item:nth-child(3n){
			margin-right: 0;
			
		}
	}
}
.super-nav-block-show{
	top:149rpx;
	transition-delay: 0ms;
}
.cancel_btn{
	width: 29rpx;
	height: 29rpx;
	position: absolute;
	right: 33rpx;
	top: 42rpx;
}


</style>
