<template>
	<view>
		<return-btn ttl="社区" :radio="bgRadio" :isCenter="true" :disableBtn="true"  @returnBtnInitial="returnBtnInitial"></return-btn>
		
		<!-- 超级导航栏 start-->
			<div class="nav-wrapper" :style="{top:initialH+'px'}">
				<div class="nav-lists">
					<div class="nav-item-wrapper"  @click="setCurIndex(0)">
						<div class="nav-item" :class="{'nav-item-selected':curIndex==0}">
							热门小区
						</div>
						<div class="ni-underline-wrapper flex-allcenter">
							<div class="ni-underline" :class="{'ni-underline-selected':curIndex==0}"></div>
						</div>
					</div>
					<div class="nav-item-wrapper"  @click="setCurIndex(1)">
						<div class="nav-item" :class="{'nav-item-selected':curIndex==1}">
							全部小区
						</div>
						<div class="ni-underline-wrapper flex-allcenter">
							<div class="ni-underline" :class="{'ni-underline-selected':curIndex==1}"></div>
						</div>
					</div>
				</div>
			</div>
		<!-- 超级导航栏 end-->
		
		<div class="comm-lists" :style="{'margin-top':initialCommListT+'px'}" v-if="curIndex==id" v-for="it,id in real_data">
			<div class="comm-item fr-space-between" v-for="item,index in it.data" :data-id="item.id"  @click="goDetails">
				<image :src="item.thumb" class="ci-img" mode="aspectFill"></image>
				<div class="ci-txt fc-space-between">
					<div>
						<div class="ci-h1 textHidden">{{item.name}}</div>
						<div class="ci-h2 textHidden">{{item.price}}</div>
						<div class="ci-h3 textHidden">{{item.address}}</div>	
					</div>
					<div class="ci-h4 textHidden">最新开盘：{{item.kptime}}</div>
				</div>
			</div>
			<div class="isNoMore" v-if="it.isNoMore==1">没有更多内容了</div>
		</div>
		
		<div style="height: 100rpx;"></div>
		<tabbar curPage="1" @showJobBox="showJobBox"></tabbar>
		
		<!-- 工作应聘窗口组件-->
		<job-box :isShowFlag="isShowJobBox" @jobBoxHidden="resetIsShowJobBox"></job-box>
		
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	import tbsScrollTab from "../../components/tbs-scrollTab/tbs-scrollTab.vue";
	import tabbar from "../../components/tabbar/tabbar.vue";
	import jobBox from "../../components/jobBox/jobBox.vue";
	import { mapState } from "vuex";
	
	export default {
		data() {
			return {
				bgRadio:100,
				curIndex:0,
				//应聘窗口 start
				isShowJobBox:false,  //展示应聘JOB BOX组件
				isShowWrapper:false, //防止页面滚动的遮罩层
				//应聘窗口 end
				//数据
				real_data:[
					//{data:[],isNoMore:0,isInitialTotalPages:false,totalPage:2,nextPage:1}
				],
				offset:1,
				
				//调整位置
				initialH:149,
				initialCommListT:149+34+28+26+6
			}
		},
		components:{
			returnBtn,
			tbsScrollTab,
			tabbar,
			jobBox
		},
		methods:{
			setCurIndex(id){
				this.curIndex=id;
			},
			goCommDetail(){
				uni.navigateTo({
					url:"/pages/comm_detail/comm_detail"
				})
			},showJobBox(){//展示JOB-BOX组件窗口
			
				this.isShowJobBox=true;
				this.isShowWrapper=true;
				
			},resetIsShowJobBox(){ //JOB-BOX组件一旦退出 则充值flag 以确保还可以使用
			
				this.isShowJobBox=false;
				this.isShowWrapper=false;
				
			},
			goDetails(e){
				uni.navigateTo({
					url:"/pages/comm_detail/comm_detail?id="+e.currentTarget.dataset.id
				})
			},
			//获取数据
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
						url:isPush?"/get_house_lists_more":"/get_house_lists",
						methods:'POST',
						data:data,
						success(res){
							//获取总页数
							if(isPush && !_this.real_data[curIndex].isInitialTotalPages){
								_this.real_data[curIndex].totalPage=Math.ceil(res.data.data.lists.last_page);
								_this.real_data[curIndex].isInitialTotalPages=true;
							}
							
							//增加数据
							if(isPush){
								_this.real_data[curIndex].data=_this.real_data[curIndex].data.concat(res.data.data.lists.data);
								console.log(_this.real_data[curIndex].data);
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
					this.initialH=obj.height;
					this.initialCommListT=obj.height+uni.upx2px(34+28+26+6);
				}
			},
			computed:{
				...mapState(['secretkey'])
			},onLoad() {
				
				this.initialRealData(2); //初始化真实数据
				this.getDataByColumn(false);
				
			},watch:{
				curIndex(new_val){
					if(this.real_data[this.curIndex].data.length==0){
						this.getDataByColumn(false);
					}
				}
			},onReachBottom() {//下拉刷新
				this.getDataByColumn(true);
			},
		//分享功能：监听三点按钮
		onShareAppMessage (){
			return {title:'这里有临泉最新的楼市咨询 请查看',path:'/pages/community/community'};
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
		
.nav-wrapper{
	// top: 149rpx
	position: fixed;
	z-index: 50;
	width: 750rpx;
	border-bottom: 2rpx solid #f4f4f4;
	background-color: #fff;
	
	.nav-lists{
		padding-top: 34rpx;
		text-align: center;
		
		.nav-item-wrapper{
			display: inline-block;
			margin-right: 192rpx;
			height: 60rpx;
			
			.nav-item{
				color: #acacac;
				font-size:28rpx;
				line-height: 28rpx;
			}
			.nav-item-selected{
				color: #1e95ee;
			}
			.ni-underline-wrapper{
				padding-top: 26rpx;
				
				.ni-underline{
					width: 38rpx;
					height: 6rpx;
					border-radius: 4rpx;
					background-color: transparent;
				}
				.ni-underline-selected{
					background-color: #1e95ee;
				}
			}
		}
		.nav-item-wrapper:last-child{
			margin-right: 0;
		}
	}
	
}
.comm-lists{
	// margin-top: 149+34+28+26+6rpx;
	
	.comm-item{
		padding: 41rpx 34rpx 28rpx 34rpx;
		width: 750-34*2rpx;
		border-bottom: 1rpx solid #d5d5d5;
		
		.ci-img{
			width: 222rpx;
			height: 162rpx;
			border-radius: 10rpx;
		}
		.ci-txt{
			width: 436rpx;
			height: 162rpx;
			color: #303233;
			font-size: 25rpx;
			
			.ci-h1{
				padding-top: 0rpx;
				font-size: 30rpx;
				line-height: 30rpx;
				padding-bottom: 22-2rpx;
			}
			.ci-h2{
				color: #f53;
				max-width: 100%;
				font-size: 24rpx;
				line-height: 24rpx;
				padding-bottom: 25-1rpx;
			}
			.ci-h3,.ci-h4{
				font-size: 24rpx;
				line-height: 24rpx;
				color: #ababab;
			}
		}
	}
}

</style>
