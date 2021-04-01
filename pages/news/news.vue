<template>
	<view class="page" >
		<!-- 顶部按钮 -->
		<return-btn ttl="新闻" :radio="bgRadio" :isCenter="true" @returnBtnInitial="returnBtnInitial" v-if="is_outer" :usingRedirect="true" url="/pages/index/index"></return-btn>
		<return-btn ttl="新闻" :radio="bgRadio" :isCenter="true" @returnBtnInitial="returnBtnInitial" v-else></return-btn>
		
		<!-- 超级导航栏 start-->
		<div class="nav-wrapper" :style="{'top':tbsScrollTabMT+'px'}">
			<tbsScrollTab
			 spaceBetween=27 fontSize=32 activeColor="#1e95ee" color="#474747" backgroundColor="#FFFFFF" :style="{'top':tbsScrollTabMT+'px'}" 
			 @tabChangeEvent="onTabChange($event)" :curIndex="curIndex"></tbsScrollTab>
		</div>
		<!-- 超级导航栏 end-->
		
			<!-- 三线按钮 -->
			 <div class="nav-btn flex-allcenter" :style="{'top':tbsScrollTabMT+'px'}"  @click="showSNB">
				 <image src="../../static/icons/threeline.png" class="threeline" mode=""></image>
			 </div>
		
		<!-- margin-top -->
		<div :style="{height:listsPT+'px'}"></div>
		
			 
		<!-- 推荐区域 start -->
		<div v-if="curIndex==0">
			 <!-- 置顶项 start -->
			 <div class="top-lists">
				 <div class="top-item container" v-for="item,index in tui_data"  data-ttl="新闻" :data-id="item.id" @click="toDetail">
							 <div class="top-item-h1 textHidden">{{item.title}}</div>
							 <div class="top-item-h2 textHidden">
								 <text style="color:#f74444;">置顶</text>
								 <text style="margin-left: 14rpx;margin-right: 14rpx;">{{item.create_time}}</text>
								<image src="../../static/icons/eye.png" class="eye"></image>
								<text style="margin-left: 8rpx;">{{item.view}}</text>
					</div>
				 </div>
			 </div>
			 <!-- 置顶项 end -->
			 
		 </div>
		 <!-- 推荐区域 end -->
		 
		 
		 
		 <div v-if="curIndex==id" v-for="it,id in real_data" >
			 <!-- 单个图片推送项 start -->
			  <!-- v-if="item.thumb.match(/(\.png|\.jpg)$/)!=null" -->
			 <div class="single-img-item container fr-space-between" v-for="item,index in it.data" data-ttl="新闻"  :data-id="item.id" @click="toDetail">
			 				 <div class="si-h fc-space-between">
			 					 <div class="si-h1 show_two">{{item.title}}</div>
			 					 <div class="si-h2">
			 						{{item.create_time}}
			 						<image src="../../static/icons/eye.png" class="eye" style="margin-left: 15rpx;padding-bottom: 1rpx;margin-right: 8rpx;"></image>
			 						{{item.view}}
			 					</div>
			 				 </div>
			 		<image class="si-img" :src="item.thumb" mode="aspectFill"></image>
			 </div>
			 <div class="isNoMore" v-if="it.isNoMore==1">没有更多内容了</div>
			 <!-- 单个图片推送项 end -->
			 <!-- 无图片推送项 start -->
			<!-- <div class="empty-img-item container" v-else>
			 				 <div class="ei-h">{{item.title}}</div>
			 				 <div class="ei-h2 show_two"></div>
			 				<div class="ei-h3"> {{item.create_time}}
			 			 						<image :src="item.thumb" class="eye" style="margin-left: 15rpx;padding-bottom: 1rpx;margin-right: 8rpx;"></image>
			 			 						{{item.view}}</div>
			 </div> -->
			 <!-- 无图片推送项 end -->
		 </div>
		 
		 <!-- <div v-if="curIndex==(index+1)" v-for="(i,index) in 5"> -->
	
			 
			 <!-- 单个图片推送项 start -->
			<!-- <div class="single-img-item container fr-space-between" >
			 				 <div class="si-h fc-space-between">
			 					 <div class="si-h1 show_two">警惕！这里出现不明肺炎！致死率远高于新冠肺炎！</div>
			 					 <div class="si-h2">
			 						 2020-10-12
			 						<image src="../../static/icons/eye.png" class="eye" style="margin-left: 15rpx;padding-bottom: 1rpx;margin-right: 8rpx;"></image>
			 						1023
			 					</div>
			 				 </div>
			 		<image class="si-img" src="../../static/uploads/tui_item.jpg" mode=""></image>
			 </div> -->
			 <!-- 单个图片推送项 end -->
			 
			 
			 <!-- 无图片推送项 start -->
			 <!-- <div class="empty-img-item container">
				 <div class="ei-h">安徽全省严打！</div>
				 <div class="ei-h2 show_two">9月15日，记者从安徽省市场监管局获悉，按照市场监管总局部署，安徽省市场监管局印发...</div>
				<div class="ei-h3"> 2020-10-12
			 						<image src="../../static/icons/eye.png" class="eye" style="margin-left: 15rpx;padding-bottom: 1rpx;margin-right: 8rpx;"></image>
			 						1023</div>
			 </div> -->
			 <!-- 无图片推送项 end -->
			 
			 <!-- 三个图片推送项 start -->
			<!-- <div class="img3-item container">
			 				 <div class="i3-h textHidden">开展反恐防暴演练筑牢安全防线</div>
			 				 <div class="i3-h2 show_two">
			 				为有效提高反恐防暴应急处置能力，8月31日下午，临泉公安于寨派出所民警在辖区城郊中学及游乐场 
			 				 </div>
			 				 <div class="i3-list">
			 					 <image class="i3-img" src="../../static/uploads/tui_item.jpg" v-for="i in 3"></image>
			 				 </div>
			 				 <div class="i3-h3">
			 					 2020-10-12
			 					 <image src="../../static/icons/eye.png" class="eye" style="margin-left: 15rpx;padding-bottom: 1rpx;margin-right: 8rpx;"></image>
			 					 1023
			 				 </div>
			 </div> -->
			 <!-- 三个图片推送项 end -->
			 
		 <!-- </div> -->
		 
		 
		 <!-- 导航栏悬浮框选项卡 start-->
		<div class="black-wrapper" @touchmove.stop.prevent="touchMoveHandler" @click="hideSNB" v-if="isShowWrapper" :class="{'black-wrapper-show':isShowSNB}">asdsadsa</div>
		 <div class="super-nav-block"  :style="{top:snTop+'px'}">
			 <div class="sn-h">我的频道<text style="font-size: 28rpx;margin-left: 20rpx;color: #ababab;">点击进去频道</text></div>
			 <div class="sn-btns fr-start">
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==0?true:false}" @click="setBtnAndGo(0)">推荐</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==1?true:false}" @click="setBtnAndGo(1)">政要新闻</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==2?true:false}" @click="setBtnAndGo(2)">临泉头条</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==3?true:false}" @click="setBtnAndGo(3)">专题报道</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==4?true:false}" @click="setBtnAndGo(4)">图片新闻</div>
				 <div class="sn-item" :class="{'sn-item-selected':curIndex==5?true:false}" @click="setBtnAndGo(5)">热点排行</div>
			 </div>
			 <image src="../../static/icons/cancel_btn.png" class="cancel_btn" @click="hideSNB"></image>
		 </div>
		 <!-- 导航栏悬浮框选项卡 end-->
		
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	import tbsScrollTab from "../../components/tbs-scrollTab/tbs-scrollTab.vue";
	import { mapState } from "vuex";
	
	export default {
		data() {
			return {
				bgRadio:100,
				isShowSNB:false,
				isShowWrapper:false,
				curIndex:0,//超级选项卡当前选择页
				//数据集
				
				//数据
				real_data:[
					//{data:[],isNoMore:0,isInitialTotalPages:false,totalPage:2,nextPage:1}
				],
				offset:2,
				tui_data:[] ,//置顶推送
				
				//调整位置
				tbsScrollTabMT:149,
				listsPT:149+85,
				
				is_outer:false,
				
				snTop:149-600,
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
			},
			go(url){
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
				this.snTop=this.snTop1;
				this.isShowSNB=false;
				
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
			},//获取数据
			getDataByColumn(isPush){ //push表明是否是添加数据（比如下拉刷新）
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
							
							//各栏目第一次访问 start
							//第一次注入数据且是第一个栏目 则分割为置顶推送和普通推送
							if(curIndex==0){
								_this.tui_data=res.data.data.lists.slice(0,3);
								_this.real_data[curIndex].data=res.data.data.lists.slice(3);
								return;
							}
							_this.real_data[curIndex].data=[...res.data.data.lists];
							_this.real_data[curIndex].nextPage++;
							
							//各栏目第一次访问 end
							
						}
					});
				},
				initialRealData(total){ //初始化realData数组
					for(var i=0;i<total;i++){
						this.real_data.push({data:[],isNoMore:0,isInitialTotalPages:false,totalPage:2,nextPage:1});
					}
				}
				,
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
				
				this.initialRealData(6); //初始化真实数据
				this.getDataByColumn(false);
				
			},watch:{
				curIndex(new_val){
					if(this.real_data[this.curIndex].data.length==0){
						this.getDataByColumn(false);
					}
				}
			},onReachBottom() {//下拉刷新
				this.getDataByColumn(true);
			}	//分享功能：监听三点按钮
		,onShareAppMessage (){
			return {title:'这里有临泉最新的新闻咨询',path:'/pages/news/news?is_outer=1'};
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
.container{
	width: 710rpx;
	margin:0 auto;
}
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
//推荐页置顶项
.top-lists{
	padding-top: 42-18rpx;
	padding-bottom: 42-18rpx;
	
	.top-item{
		.top-item-h1{
			font-size: 32rpx;
			line-height: 32rpx;
			padding-top: 18rpx;
			padding-bottom: 10rpx;
			color: #474747;
		}
		.top-item-h2{
			padding-top: 15-2rpx;
			font-size: 24rpx;
			line-height: 24rpx;
			padding-bottom: 18-2rpx;
			color: #989898;
		}
	}
}
//无图推送项
.empty-img-item{
	padding-top: 40rpx;
	border-bottom:1px solid #f4f4f4;
	
	.ei-h{
		font-size: 30rpx;
		line-height: 30rpx;
		color: #474747;
		padding-bottom: 31-3rpx;
	}
	.ei-h2{
		font-size: 26rpx;
		line-height: 23+6rpx;
		color: #989898;
		padding-bottom: 21-3rpx;
	}
	.ei-h3{
		font-size: 24rpx;
		line-height: 24rpx;
		color: #989898;
		padding-bottom: 42rpx;
	}
}
//单图推送项
.single-img-item{
	height: 153rpx;
	padding-bottom: 40rpx;
	padding-top: 42rpx;
	border-top:1px solid #f4f4f4;
	border-bottom:2px solid #f4f4f4;
	
	.si-h{
		width: 440rpx;
		font-size: 32rpx;
		line-height: 28+8rpx;
		margin-top: -4rpx;
		color: #474747;
	}
	.si-h2{
		font-size: 24rpx;
		line-height: 24rpx;
		color: #7e7d7d;
	}
	.si-img{
		width: 226rpx;
		border-radius: 12rpx;
		height: 156rpx;
	}
}

// 三个图片推送项
.img3-item{
	.i3-h{
		padding-top: 42rpx;
		font-size: 27rpx;
		line-height: 27rpx;
		color: #474747;
	}
	.i3-h2{
		padding-top: 29-3rpx;
		font-size: 26rpx;
		line-height: 26+6rpx;
		color: #989898;
	}
	.i3-list{
		padding-top: 29-3rpx;
		.i3-img{
			width: 226rpx;
			height: 156rpx;
			border-radius: 10rpx;
			margin-right: (710-226*3)/2rpx;
			
		}
		.i3-img:last-child{
			margin-right: 0;
		}
	}
	.i3-h3{
		font-size: 20rpx;
		line-height: 20rpx;
		color: #989898;
		padding-top: 20rpx;
		padding-bottom: 40rpx;
	}
	border-bottom: 2rpx solid #f4f4f4;
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
	top:149-600rpx;
	width: 750rpx;
	padding-top: 42rpx;
	border-radius: 25rpx;
	transition: all 300ms ease-out;
	transition-delay: 50ms;
	
	.sn-h{
		top: 149rpx;
		line-height: 29rpx;
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
