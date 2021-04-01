<template>
	<view class="page" :class="{disablePageScroll:isShowWrapper}">
		<!-- <image v-if="!isShowIndexPage" src="https://img.vanjiax.com/linQuanPage/homeImage.jpg" style="width: 750rpx;" mode="widthFix"></image> -->
		<div>
			<!-- 头部地区 start -->
			<!-- :style="{height:fixedHH+'px'}" -->
			<div class="fixed-header" >
				<!-- <image class="fav" src="../../static/icons/fav.png"></image> -->
				<div class="h1" :style="{'padding-top':h1PT+'px',height:h1H+'px','line-height':h1H+'px'}"><text style="font-size: 24rpx;margin-left: 19rpx;">平安临泉<text style="margin-left: 12px;">智慧社区</text></text></div>
				<div class="h2-wrapper fr-space-between">
					<div class="fr-start">
						<image class="logo" src="../../static/icons/logo.png"></image>
						<div class="h2">
							<div class="h2-ttl fr-start">
								<div class="h2-ttl-item">热点</div>
								<div class="h2-ttl-item" @click="justgo('pindao')" v-if="isShowIndexPage">频道</div>
								<div class="h2-ttl-item" @click="justgo('givejob')">招聘</div>
							</div>
							<div class="h3-ttl fr-start">
								<div class="h3-ttl-item" v-for="index,id in 3" v-if="current_ttl==id"></div>
							</div>
						</div>
					</div>
					<image src="../../static/icons/search.png" class="search" mode="" alt="搜索" @click="justgo('search')"></image>
				</div>
			</div>
			
			<div class="header" :style="{height:headerH+'px'}" v-if="isShowIndexPage">
					
					<swiper circular="true" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" class="sw" :style="{'padding-top':swPT+'px'}">
						<swiper-item class="sw-item" v-for="item,index in swData"  @click="toDetail" :data-id="item.id" :data-ttl="item.title.length<8?item.title:item.title.slice(0,8)+'...'">
							<image :src="item.thumb" mode="aspectFill" class="sw-img"></image>
							<image src="../../static/icons/gradient.png" class="gradient" mode=""></image>
							<div class="sw-label textHidden">{{item.title}}</div>
						</swiper-item>
						<!-- <swiper-item class="sw-item">
							<image src="../../static/uploads/shouye_sw.jpg" mode="" class="sw-img"></image>
							<image src="../../static/icons/gradient.png" class="gradient" mode=""></image>
							<div class="sw-label textHidden">美爆了！临泉打造最美风景线！直通高铁站asdas d</div>
						</swiper-item> -->
					</swiper>
			</div>
			<!-- 头部地区 end -->
			<div :style="{height:swPT+'px'}" v-else></div>
			<!-- 热搜区域 start -->
			<div class="hot-search container fr-space-between" v-if="isShowIndexPage">
				<div class="left-label fr-start">
					<image src="../../static/icons/hot_icon.png" class="hot-icon" mode=""></image>
					<div class="hot-txt">头条榜</div>
					<swiper circular="true" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" vertical="true" class="hot-sw">
						<swiper-item v-for="item,index in hotData"  @click="toDetail" :data-id="item.id" :data-ttl="item.title.length<8?item.title:item.title.slice(0,8)+'...'">
							<view class="hot-sw-item textHidden">{{item.title}}</view>
						</swiper-item>
						<!-- <swiper-item>
							<view class="hot-sw-item textHidden">12312美征收200亿人民币关税</view>
						</swiper-item> -->
					</swiper>
				</div>
				<image src="../../static/icons/right_arrow.png" class="right-arrow" mode=""></image>
			</div>
			<!-- 热搜区域 end -->
			<div style="padding-top: 72rpx;" v-else></div>
			
			
			<!-- 推送区域 start -->
			<div class="lists">
				
				<!-- 单个推送 start -->
				<div class="tui-item container fr-space-between" v-for="item,index in otherData.data"  @click="toDetail" :data-id="item.id" :data-ttl="item.title.length<8?item.title:item.title.slice(0,8)+'...'">
					<div class="tui-txt fc-space-between">
						<div class="tui-h1 show_two">{{item.title}}</div>
						<div class="tui-h2 textHidden">
							<text style="border-bottom: 2rpx dotted #cdd2ef;display: inline-block;height:32rpx;padding-left: 8rpx;padding-right: 12rpx;" :data-id="otherData.type[index]" @click.stop="goPindao" v-if="isShowIndexPage">
								<text v-if="otherData.type[index]==9">房产频道</text>
								<text v-if="otherData.type[index]==25">亲子频道</text>
								<text v-if="otherData.type[index]==20">婚庆频道</text>
								<text v-if="otherData.type[index]==33">教育频道</text>
								<text v-if="otherData.type[index]==39">美食频道</text>
								<text v-if="otherData.type[index]==74">活动频道</text>
								<text v-if="otherData.type[index]==78">公益频道</text>
							</text>
							 · {{item.create_time.slice(5)}} · {{item.view>10000?((item.view/10000).toFixed(1))+"万":item.view}}阅读</div>
					</div>
					<image :src="item.thumb" class="tui-item-img" mode="aspectFill"></image>
				</div>
				<!-- 单个推送 end -->
				<div class="isNoMore" v-if="isNoMore">没有更多的内容了！</div>
			</div>
			<!-- 推送区域 end -->
			
			<div style="height: 100rpx;"></div>
			<tabbar curPage="0" @showJobBox="showJobBox"></tabbar>
			
			<!-- 工作应聘窗口组件-->
			<job-box :isShowFlag="isShowJobBox" @jobBoxHidden="resetIsShowJobBox"></job-box>
		</div>
	</view>
</template>

<script>
	import tabbar from "../../components/tabbar/tabbar.vue";
	import jobBox from "../../components/jobBox/jobBox.vue";
	import { mapState } from "vuex"
	
	export default {
		data() {
			return {
				current_ttl:0,
				//应聘窗口 start
				isShowJobBox:false,  //展示应聘JOB BOX组件
				isShowWrapper:false, //防止页面滚动的遮罩层
				//应聘窗口 end
				
				swData:[], //轮播放新闻栏目的推荐栏
				hotData:[], //热门数据放新闻栏目的政务要闻
				otherData:{data:[],type:[]}, //其他数据放 其他频道的第一个栏目
				
				visit_flag:0,
				columnArr:[9,25,20,33,39,74,78],
				totalPageArr:[2,2,2,2,2,2,2],
				isInitialArr:[false,false,false,false,false,false,false],
				isNoMore:false,
				isShowIndexPage:false,
				
				
				// 初始化h1的样式
				h1PT:94,
				h1H:46,
				headerH:486, //初始化顶部固定区的样式
				swPT:10+94+42+30+46,
				
			}
		},
	    async onLoad() {
			var _this=this,sign,ts=this.gts();
			
			
			
			this.$H({
				url:"/get_text_lists",
				data:{
					column:2,
					number:5,
					timestamp:ts,
					sign:_this.md52(""+2+5+ts+_this.secretkey)
				},
				success(res) {
					_this.swData=res.data.data.lists;
					_this.isShowIndexPage =res.data.data.showIndexPage;
					uni.setStorage({
						key:"isShowChannel",
						data:_this.isShowIndexPage?1:0
					})
					
					if(!_this.isShowIndexPage){
						_this.columnArr=[20,33,74,78];
						_this.totalPageArr=[2,2,2,2];
						_this.isInitialArr=[false,false,false,false];
					}
				},
				noShowRequest:1
			})
			
			this.$H({
				url:"/get_text_lists",
				data:{
					column:4,
					number:5,
					timestamp:ts,
					sign:_this.md52(""+4+5+ts+_this.secretkey)
				},
				success(res) {
					_this.hotData=res.data.data.lists;
				},
				noShowRequest:1
			})
	
			this.visit7();
		},
		methods: {
			showJobBox(){//展示JOB-BOX组件窗口
			
				this.isShowJobBox=true;
				this.isShowWrapper=true;
				
			},resetIsShowJobBox(){ //JOB-BOX组件一旦退出 则充值flag 以确保还可以使用
			
				this.isShowJobBox=false;
				this.isShowWrapper=false;
				
			},
			getData(visit_flag){
				var _this=this,ts=this.gts();
				
				
				if(_this.isInitialArr[visit_flag%_this.columnArr.length] && _this.totalPageArr[visit_flag%_this.columnArr.length]< visit_flag%_this.columnArr.length){
					return 0;//如果返回值有0则说明无数据
				}
				
				this.$H({
					url:"/get_text_lists_more",
					data:{
						column:_this.columnArr[visit_flag%_this.columnArr.length],
						number:2,
						page:Math.floor(visit_flag/_this.columnArr.length)+1,
						timestamp:ts,
						sign:_this.md52(""+_this.columnArr[visit_flag%_this.columnArr.length]+2+(Math.floor(visit_flag/_this.columnArr.length)+1)+ts+_this.secretkey)
					},
					success(res) {
						_this.otherData.data=_this.otherData.data.concat(res.data.data.lists.data);
						console.log(visit_flag%_this.columnArr.length);
						console.log(_this.columnArr[visit_flag%_this.columnArr.length]);
						_this.otherData.type=_this.otherData.type.concat([1,1].fill(_this.columnArr[visit_flag%_this.columnArr.length]));
						
						//获取各个页面的最大页数
						if(!_this.isInitialArr[visit_flag%_this.columnArr.length]){
							_this.totalPageArr[visit_flag%_this.columnArr.length]=res.data.data.lists.last_page;
							_this.isInitialArr[visit_flag%_this.columnArr.length]=true;
						}
						
						// _this.visit_flag++;
					},
					noShowRequest:1
				})
				
				return 1;//如果返回值有1则说明有数据
			},
			async visit7(){//访问七次
				var visit_flag=this.visit_flag,isSuccessFlag=[];
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				
				for (var i = visit_flag; i < this.columnArr.length+visit_flag; i++) {
				   await isSuccessFlag.push(this.getData(i));//如果isSuccessFlag含有1则说明肯定返回了数据
				}
				
				uni.hideLoading();
				
				//一个1都不存在  说明数据全部访问完成 则设置isNoMore为true
				if(!isSuccessFlag.includes(1)){
					this.isNoMore=true;
				}
				
				this.visit_flag=this.columnArr.length+visit_flag;
			},
			goPindao(e){
				var id=e.currentTarget.dataset.id,_this=this;
				switch(id){
					case 9:
					_this.justgo("house");
					break;
					case 20:
					_this.justgo("wedding");
					break;
					case 33:
					_this.justgo("edu");
					break;
					case 39:
					_this.justgo("food");
					break;
					case 74:
					_this.justgo("activity");
					break;
					case 78:
					_this.justgo("welfare");
					break;
					case 25:
					_this.justgo("qinzi");
					break;
				}
			}
		},
		computed:{
			...mapState(['secretkey'])
		}
		,
		components:{
			tabbar,
			jobBox
		},
		onReachBottom() {
			this.visit7();
		},mounted() {
			// #ifdef APP-PLUS
			this.h1PT=uni.upx2px(94);
			this.h1H=uni.upx2px(46);
			this.headerH=uni.upx2px(486);
			this.swPT=uni.upx2px(10+94+42+30+46);
			
			// #endif
			// #ifndef APP-PLUS
			//通过微信胶囊样式来设置header各个元素的样式
			let menuButtonInfo=uni.getMenuButtonBoundingClientRect();
			this.h1PT=menuButtonInfo.top;
			this.h1H=menuButtonInfo.height;
			
			// this.fixedHH=menuButtonInfo.top+menuButtonInfo.height+uni.upx2px();
			
			//获取高度
			this.headerH=menuButtonInfo.top+menuButtonInfo.height+uni.upx2px(20+46+4)+uni.upx2px(269);
			this.swPT=menuButtonInfo.top+menuButtonInfo.height+uni.upx2px(20+46+4+4);
			// #endif
			
		},
		
		//分享功能：监听三点按钮
		onShareAppMessage (){
			return {title:'我正在使用临泉网小程序，赶紧跟我一起来体验！',imageUrl:'/static/icons/share.jpg',path:'/pages/index/index'};
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
			
	//版心
	.container{
		width: 750-19*2rpx;
		margin: 0 auto;
	}
	.fixed-header{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
		background-color: #1e95ee;
		width: 750rpx;
		color: #fff;
		
		.h1{ //高度由api获取 css里的值没用
			// padding-top: var(--status-bar-height);
			font-size: 30rpx;
			height: 46px;
			line-height: 46px;
			padding-left: 40rpx;
		}

		
		.h2-wrapper{
			width: 695rpx;
			margin: 0 auto;
			padding-top: 20rpx;
			
			.logo{
				width: 185rpx;
				height: 48rpx;
				margin-top: -4rpx;
			}
			
			.h2{
				width: 83*3+36*3rpx;
				padding-left: 50rpx;
				
				.h2-ttl{
					height: 46rpx;
					.h2-ttl-item{
						width: 83rpx;
						text-align: center;
						margin-right: 36rpx;
						font-size: 32rpx;
						line-height: 32rpx;
					}
				}
				.h3-ttl{
					
					.h3-ttl-item{
						height: 4rpx;
						width: 83rpx;
						background-color: #fff;
						border-radius: 1rpx;
						margin-right: 36rpx;
					}
				}
			}
			.search{
				width: 36rpx;
				height: 36rpx;
				line-height: 36rpx;
				font-size: 36rpx;
				color: #fff;
			}
		}


	}
	.header{
		position: relative;
		color: #fff;
		background-color: #1e95ee;
		height: 269rpx;/*269为下半弧度部分 上半部分需要通过api获取然后更改*/
		border-bottom-left-radius: 200rpx;
		border-bottom-right-radius: 200rpx;
		
		.sw{
			margin: 0rpx auto;
			width: 695rpx;
			height: 314rpx;
			// padding-top: 10+94+42+30+46rpx;
			//api获取
			
			.sw-item{
				width: 695rpx;
				height: 314rpx;
				border-radius: 10rpx;
				position: relative;
				
				.gradient{
					width: 695rpx;
					height: 314rpx;
					border-radius: 10rpx;
					position: absolute;
					top: 0;
					left: 0;
				}
				.sw-img{
					width: 695rpx;
					height: 314rpx;
				}
				.sw-label{
					bottom: 18rpx;
					font-size: 32rpx;
					padding-left: 20rpx;
					line-height: 32rpx;
					position: absolute;
					left: 0;
					width: 670rpx;
				}
			}
		}
	
		
		
	}
	
	//热搜
	.hot-search{
		padding-top: 72rpx;
		height: 40rpx;
		align-items: center;
		padding-bottom: 22rpx;
		
		.left-label{
			margin-left: 9rpx;
			font-size: 32rpx;
			line-height: 30rpx;
			align-items: center;
			
			.hot-icon{
				width: 38rpx;
				height: 38rpx;
			}
			.hot-txt{
				margin-left: 10rpx;
				margin-right: 26rpx;
				color: #da5b70;
			}
			.hot-sw{
				width: 510rpx;
				height: 38rpx;
				line-height: 38rpx;
				color: #474747;
			}
		}
		.right-arrow{
			font-size: 20rpx;
			width: 12rpx;
			height: 19*1.2rpx;
			padding-right: 11rpx;
		}
	}
	
	.lists{
		
		.tui-item{
			box-shadow: 0px 0px 20rpx 6rpx #eee;
			height: 210-20*2rpx;
			padding: 20rpx;
			width: 750-19*2-20*2rpx;
			margin-bottom: 26rpx;
			border-radius: 8rpx;
			
			.tui-item-img{
				width: 209rpx;
				height: 167rpx;
				border-radius: 8rpx;
			}
			.tui-txt{
				width: 447rpx;
				
				.tui-h1{
					font-size: 32rpx;
					color: #3c3c3c;
					line-height: 26+20rpx;
					margin-top: -12+3rpx;
				}
				.tui-h2{
					font-size: 24rpx;
					color: #7e7d7d;
				}
			}
		}
	}
	
	
	.disablePageScroll{
		overflow: hidden;
	}
</style>
