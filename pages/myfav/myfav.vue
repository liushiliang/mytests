<template>
	<view>
		<return-btn :radio="bgRadio" ttl="我的收藏" :isCenter="true" @returnBtnInitial="returnBtnInitial"></return-btn>
		<div class="lists" :style="{'margin-top':initialTop+'px'}">
			<!-- 单个项目 start -->
			<div v-for="item,index in data" @click="toDetail" :data-id="item.id" :data-ttl="(item.title.length>8)?item.title.slice(0,8)+'...':item.title">
				<div class="fav-item fr-space-between">
					<div class="fi-img flex-allcenter" :class="['fi-img-news']"  v-if="[2,3,4,5,6,7].includes(item.column_id)">
						<image src="../../static/icons/fav_news.png" mode="widthFix"></image>
					</div>
					<div class="fi-img flex-allcenter" :class="['fi-img-house']"  v-if="[9,10,11,12,13].includes(item.column_id)">
						<image src="../../static/icons/fav_house.png" mode="widthFix"></image>
					</div>
					<div class="fi-img flex-allcenter" :class="['fi-img-wedding']"  v-if="[20,21,22,23].includes(item.column_id)">
						<image src="../../static/icons/fav_wedding.png" mode="widthFix"></image>
					</div>
					<div class="fi-img flex-allcenter" :class="['fi-img-qinzi']"  v-if="[25,26,27,28,29,30,31,93,94,95].includes(item.column_id)">
						<image src="../../static/icons/fav_house.png" mode="widthFix"></image>
					</div>
					<div class="fi-img flex-allcenter" :class="['fi-img-edu']" v-if="[33,34,35,36,37,82,83,84,85,86,87].includes(item.column_id)">
						<image src="../../static/icons/fav_edu.png" mode="widthFix"></image>
					</div>
					<div class="fi-img flex-allcenter" :class="['fi-img-food']" v-if="[39,40,41,42,43,88,89,90,91,92].includes(item.column_id)">
						<image src="../../static/icons/fav_food.png" mode="widthFix"></image>
					</div>
					<div class="fi-img flex-allcenter" :class="['fi-img-activity']" v-if="[74,75,76].includes(item.column_id)">
						<image src="../../static/icons/fav_activity.png" mode="widthFix"></image>
					</div>
					<div class="fi-img flex-allcenter" :class="['fi-img-welfare']" v-if="[78,79,80,81].includes(item.column_id)">
						<image src="../../static/icons/fav_welfare.png" mode="widthFix"></image>
					</div>
					<div class="fi-h fc-space-between">
						<div class="fi-h1 show_two">{{item.title}}</div>
						<div class="fi-h2">{{item.create_time}}</div>
					</div>
				</div>
				<div class="center-line"></div>
			</div>
			<!-- 单个项目 end -->
			<div v-if="isNoMore" class="isNoMore">没有更多收藏了</div>
		</div>
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	import {mapState,mapMutations} from "vuex"
	
	export default {
		data() {
			return {
				bgRadio:100,
				data:[],
				initialTotalPage:false,
				totalPage:2,
				nextPage:1,
				isNoMore:false,
				
				initialTop:149
			};
		},components:{
			returnBtn
		},onLoad() {
			this.getData(false);
		},
		onShow(){
			this.data=[];
			this.getData(false);
		},
		onReachBottom() {
			this.getData(true);
		}
		,methods:{
			...mapMutations(['logout']),
			getData(isPush){
				var ts=this.gts(),sign,_this=this,data;
				sign=this.md52(""+ts+this.secretkey);
				
				//总页数初始化成功 并且访问页面已经超过总页数则返回
				if(this.initialTotalPage && this.totalPage<this.nextPage){
					this.isNoMore=true;
					return;
				}
				
				if(!isPush){
					data={
						timestamp:ts,
						sign:sign
					}
				}else{
					data={
						page:this.nextPage,
						timestamp:ts,
						sign:this.md52(""+this.nextPage+ts+this.secretkey)
					}
				}
				
				
				this.$H({
					url:isPush?"/get_my_collection_more":"/get_my_collection",
					data:data,
					success(res){
						
						
						if(!_this.initialTotalPage && isPush){
							_this.totalPage=Math.ceil(res.data.data.total/20);
							_this.initialTotalPage=true;
						}
						
						if(isPush){
							_this.data=_this.data.concat(res.data.data.lists);
							_this.nextPage++;
						}else{
							_this.data=res.data.data.lists;
							_this.nextPage++;
						}
						
						if(res.data.data.current_page==Math.ceil(res.data.data.total/20)){
							this.isNoMore=true;
						}
					},
					_target_this:_this //当错误时传递this给http方法
				})
			},
			
			//初始化样式
			returnBtnInitial(obj){
				this.initialTop=obj.height;
			}
		},
		computed:{
			...mapState(['secretkey'])
		}
	}
</script>

<style lang="less">
.isNoMore{
	padding-top: 20rpx;
	height: 40rpx;
	line-height: 40rpx;
	font-size: 22rpx;
	color: #999;
	text-align: center;
	width: 100%;
}
	.lists{
		margin-top: 149rpx;
	}
.fav-item{
	padding: 30rpx 60rpx 29rpx 34rpx;
	
	.fi-img{
		width: 55rpx;
		height: 55rpx;
		margin-right: 28rpx;
		border-radius: 10rpx;
		
		image{
			width: 31rpx;
		}
	}
	.fi-img-news{
		background-color: #4BA2FC;
	}
	.fi-img-house{
		background-color: #8895fb;
	}
	.fi-img-wedding{
		background-color: #FF6B72;
	}
	.fi-img-qinzi{
		background-color: #28D7A9;
	}
	.fi-img-edu{
		background-color: #D887DD;
	}
	.fi-img-food{
		background-color: #F37B1D;
	}
	.fi-img-activity{
		background-color: #A5673F;
	}
	.fi-img-welfare{
		background-color: #8DC53F;
	}
	.fi-h{
		width: 575rpx;
		height: 108rpx;
	}
	.fi-h1{
		font-size: 30rpx;
		line-height: 28+12rpx;
		margin-top: -12/2rpx;
		color: #474747;
	}
	.fi-h2{
		font-size: 24rpx;
		line-height: 24rpx;
		color: #ababab;
	}
}
.center-line{
	height: 1rpx;
	width: 750rpx;
	background-color: #dcdcdc;
	margin-left: 107rpx;
}
</style>
