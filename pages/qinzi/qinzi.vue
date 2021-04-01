<template>
	<view>
		<return-btn ttl="亲子" :radio="bgRadio" :isCenter="true" @returnBtnInitial="returnBtnInitial" v-if="is_outer" :usingRedirect="true" url="/pages/index/index"></return-btn>
		<return-btn ttl="亲子" :radio="bgRadio" :isCenter="true" @returnBtnInitial="returnBtnInitial" v-else></return-btn>
		
		<!-- 超级导航栏 start-->
				<div class="nav-wrapper" :style="{'top':tbsScrollTabMT+'px'}">
					<tbsScrollTab :tabItems="tabItems"
					 spaceBetween=27 fontSize=32 activeColor="#1e95ee" color="#474747" backgroundColor="#FFFFFF"
					 @tabChangeEvent="onTabChange($event)" :curIndex="curIndex"></tbsScrollTab>
				</div>
		<!-- 超级导航栏 end-->
		
		<!-- 三线按钮 -->
		 <div class="nav-btn flex-allcenter"  :style="{'top':tbsScrollTabMT+'px'}" @click="showSNB">
			 <image src="../../static/icons/threeline.png" class="threeline" mode=""></image>
		 </div>
		
		
		<!-- 实际内容 start -->
		<div class="lists" v-if="curIndex==index" v-for="it,index in real_data" :style="{'padding-top':listsPT+'px'}">
		
			<!-- 单个推送  start-->
			<div class="item-wrapper"   v-for="item,index in it.data"  data-ttl="亲子" :data-id="item.id" @click="toDetail">
				<!-- 换背景 -->
				<image class="item-bg" :src="'../../static/icons/qinzi_item_bg'+(item.id%3+1)+'.png'"></image>
				<div class="item fr-space-between">
					<image class="item-img" :src="item.thumb" mode="aspectFill"></image>
					
					<div class="item-h fc-space-between">
						<div class="item-h1">{{item.title}}</div>		
						<div class="item-h2">{{item.create_time}}<image src="../../static/icons/eye.png" class="eye" style="margin-left: 15rpx;margin-right: 7rpx;vertical-align: bottom;"></image>{{item.view}}</div>
					</div>
				</div>
			</div>
			<!-- 单个推送  end-->
			<div class="isNoMore" v-if="it.isNoMore==1">没有更多内容了</div>
		</div>
	<!-- 实际内容 end -->
	
	
				
		<!-- 导航栏悬浮框选项卡 start-->
		<div class="black-wrapper" @touchmove.stop.prevent="touchMoveHandler" @click="hideSNB" v-if="isShowWrapper" :class="{'black-wrapper-show':isShowSNB}">asdsadsa</div>
		 <div class="super-nav-block" :style="{top:snTop+'px'}">
			 <div class="sn-h">我的频道<text style="font-size: 28rpx;margin-left: 20rpx;color: #ababab;">点击进去频道</text></div>
			 <div class="sn-btns fr-start">
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==0?true:false}" @click="setBtnAndGo(0)">热门资讯</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==1?true:false}" @click="setBtnAndGo(1)">亲子摄影</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==2?true:false}" @click="setBtnAndGo(2)">孕期指导</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==3?true:false}" @click="setBtnAndGo(3)">亲子活动</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==4?true:false}" @click="setBtnAndGo(4)">宝宝秀</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==5?true:false}" @click="setBtnAndGo(5)">妈咪学堂</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==6?true:false}" @click="setBtnAndGo(6)">母婴商家</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==7?true:false}" @click="setBtnAndGo(7)">亲子游</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==8?true:false}" @click="setBtnAndGo(8)">孕育科学</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==9?true:false}" @click="setBtnAndGo(9)">早教育儿</div>
			 </div>
			 <image src="../../static/icons/cancel_btn.png" class="cancel_btn" @click="hideSNB"></image>
		 </div>
		 <!-- 导航栏悬浮框选项卡 end-->
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	import tbsScrollTab from "../../components/tbs-scrollTab/tbs-scrollTab.vue";
	import {mapState} from "vuex"
	
	export default {
		data() {
			return {
				bgRadio:100,
				curIndex:0,//超级选项卡当前选择页
				isShowWrapper:false,
				isShowSNB:false,
				tabItems: [{
					name: '热门资讯',
					data: {}
				}, {
					name: '亲子摄影',
					data: {}
				}, {
					name: '孕期指导',
					data: {}
				}, {
					name: '亲子活动',
					data: {}
				},
				{
					name: '宝宝秀',
					data: {}
				},
				{
					name: '妈咪学堂',
					data: {}
				}, {
					name: '母婴商家',
					data: {}
				}, {
					name: '亲子游',
					data: {}
				}, {
					name: '孕育科学',
					data: {}
				},
				{
					name: '早教育儿',
					data: {}
				}],
				
				//数据
				real_data:[
					//{data:[],isNoMore:0,isInitialTotalPages:false,totalPage:2,nextPage:1}
				],
				offset:25,
				
				//调整位置
				tbsScrollTabMT:149,
				listsPT:149+85,
				
				is_outer:false,
				
				snTop:149-404-86*2-28*2,
				snTop1:0,
				snTop2:0
			};
		},
		components:{
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
			goQinziDetail(){
				uni.navigateTo({
					url:"/pages/qinzi_detail/qinzi_detail"
				});
			}
			//获取数据
			,getDataByColumn(isPush){ //push表明是否是添加数据（比如下拉刷新）
					var _this=this,timestamp=this.gts(), //时间戳
						data, //上传到http的data
						curIndex=this.curIndex,
						columnId;//根据curIndex获取应该访问的栏目
						
					columnId=curIndex+this.offset; 
					if(curIndex>6){
						columnId=curIndex+93-7;
					}
					
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
					this.listsPT=obj.height+uni.upx2px(85+20);
					
					this.snTop1=obj.height-uni.upx2px(404+86*2+28*2+100);
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
				
				this.initialRealData(10); //初始化真实数据
				this.getDataByColumn(false);
				
			},watch:{
				curIndex(new_val){
					if(this.real_data[this.curIndex].data.length==0){
						this.getDataByColumn(false);
					}
				}
			},onReachBottom() {//下拉刷新
				this.getDataByColumn(true);
			},onShareAppMessage (){
			return {title:'这里有临泉最新的亲子咨询',path:'/pages/qinzi/qinzi?is_outer=1'};
		}
	}
</script>

<style lang="less">
	//没有更多了 start
.isNoMore{
	font-size: 20rpx;
	line-height: 40rpx;
	text-align: center;
	color: #999;
	width: 100%;
}
	//没有更多了 end
	
	
//实际内容 start
.lists{
	margin:0 auto;
	width: 712rpx;
	padding-top: 42rpx;
	position: relative;
	flex-wrap: wrap;
}

.item-wrapper{
	margin:0 auto;
	position: relative;
	width: 712rpx;
	height: 240rpx;
	margin-bottom: 28rpx;
	
	.item-bg{
		width: 712rpx;
		height: 240rpx;
	}		
	
	.item{
		width: 712-28*2rpx;
		height: 240-20*2rpx;
		padding: 20rpx 28rpx;
		position: absolute;
		left: 0;
		top: 0;
		
		.item-img{
			width: 188rpx;
			height: 203rpx;
			border-radius: 25rpx;
		}
		
		.item-h{
			width: 440rpx;

			.item-h1{
				padding-top: 29-11/2rpx;
				font-size: 32rpx;
				line-height: 29+11rpx;
			}
			.item-h2{
				font-size: 24rpx;
				color: #989898;
				line-height: 24rpx;
				padding-bottom: 10rpx;
			}
		}
	}
	
}

//实际内容 end


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
	top:149-404-86*2-28*2rpx;
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
