<template>
	<view>
		<return-btn ttl="搜索" :isCenter="true" :radio="bgRadio"  @returnBtnInitial="returnBtnInitial"></return-btn>
		<div class="search-h fr-start" :style="{'margin-top':initialTop+'px'}">
			<div class="search-bar fr-start">
				<image src="../../static/icons/search_gray.png" class="search_gray" mode=""></image>
				<input type="text" v-model="search_ipt" placeholder="请输入关键字进行搜索" confirm-type="search" class="search_ipt"/>
			</div>
			<div class="search-btn" @click="goSearch">搜索</div>
		</div>
		<div class="container">
			<div v-if="data.length==0">
				<!-- <div class="search-h2">猜你想搜</div> -->
				<!-- <div class="fr-start hot-list" >
					<div class="hot-item textHidden">县委常委会强调，打县委常委会强调，打</div>
					<div class="hot-item textHidden">县委常委会强调，打县委常委会强调，打</div>
					<div class="hot-item textHidden">县委常委会强调，打...</div>
					<div class="hot-item textHidden">县委常委会强调，打...</div>
					<div class="hot-item textHidden">县委常委会强调，打...</div>
					<div class="hot-item textHidden">县委常委会强调，打...</div>
				</div> -->
				
				<div class="search-h2 fr-space-between" v-if="history.length!=0">
					<div>搜索历史</div>
					<image src="../../static/icons/garbage.png" class="garbage" @click="delHis"></image>
				</div>
				<div class="fr-start hot-list" v-if="history.length!=0">
					<div class="hot-item textHidden" v-for="item in history" :data-ipt="item" @click="searchHistoryItem">{{item}}</div>
				</div>
				
			</div>
		</div>
		<!-- 搜索内容 start-->
		<div class="lists">
			<div class="tui-item container fc-space-between" v-for="item,index in data" @click="toDetail" :data-id="item.id" :data-ttl="item.title.length<8?item.title:item.title.slice(0,8)+'...'">
					<div class="tui-h1 show_two">{{item.title}}</div>
					<div class="tui-h2 textHidden"> {{item.create_time}} · {{item.view}}阅读</div>
			</div>
		</div>
		<!-- 搜索内容 end-->
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	import {mapState} from "vuex"
	
	export default {
		data() {
			return {
				bgRadio:100,
				search_ipt:"",
				data:[],
				history:[],
				
				initialTop:149+20
			};
		},components:{
			returnBtn
		},
		computed:{
			...mapState(['secretkey'])
		},
		methods:{
			goSearch(){
				var _this=this,ipt=this.search_ipt.trim(),ts=this.gts(),sign;
				
				sign=this.md52(""+ipt+ts+this.secretkey);
				
				if(ipt.length==0){
					uni.showToast({
						title:"您没有输入任何关键字",
						icon:"none",
						complete() {
							_this.data=[];
						}
					})
					return ;
				}
				
				this.$H({
					url:"/get_search_lists",
					data:{
						keyword: ipt,
						timestamp:ts,
						sign:sign
					},
					success(res){
						var lists=res.data.data.lists,sh;
						
						_this.data=lists;
						
						if(lists.length==0){
							uni.showToast({
								title:"没有任何关于"+ipt+"的内容",
								icon:"none"
							})
						}
						
						//搜索成功并且在本地保存数据
						sh=uni.getStorageSync("search_history");
						if(sh==""){
							uni.setStorage({
								key:"search_history",
								data:JSON.stringify([ipt])
							})
							_this.history=[ipt];
						}else{
							var arr=JSON.parse(sh);
							// arr.unshift(ipt);
							//如果arr里面存在ipt内容 就将它提前
							var i=0;
							//如果存在就去除它 然后在前面加上它
							
							console.log(arr);
							console.log(arr.indexOf(ipt));
							if(arr.indexOf(ipt)!=-1){
								arr.splice(arr.indexOf(ipt),1);
							}
							
							arr.unshift(ipt);
							
							uni.setStorage({
								key:"search_history",
								data:JSON.stringify(arr)
							})
							
							_this.history=arr.slice(0,6);
						}
					}
				});
			},
			delHis(){
				this.history=[];
				uni.removeStorage({
					key:"search_history"
				})
			},
			searchHistoryItem(e){
				this.search_ipt=e.currentTarget.dataset.ipt;
				this.goSearch();
			},
			//初始化样式
			returnBtnInitial(obj){
				this.initialTop=obj.height+uni.upx2px(21);
			}
		},
		onLoad() {
			var sh=uni.getStorageSync("search_history");
			if(sh!=""){
				this.history=JSON.parse(sh).slice(0,6);
			}
		}
	}
</script>

<style lang="less">
.search-h{
	// margin-top: 149+21rpx;
	margin-left: 42rpx;
	align-items: center;
	
	.search-bar{
		width: 594rpx;
		height: 64rpx;
		background-color: #f5f5f5;
		border-radius: 64/2rpx;
		align-items: center;
		
		.search_gray{
			width: 31rpx;
			height: 31rpx;
			display: block;
			margin-left: 22rpx;
			margin-right: 20rpx;
		}
		.search_ipt{
			font-size: 28rpx;
			width: 594-31-22-20-20rpx;
		}
		
	}
	.search-btn{
		margin-left: 25rpx;
		font-size: 28rpx;
		color: #2f2f30;
	}
}

.container{
	width: 684rpx;
	margin: 0 auto;
}
.search-h2{
	font-size: 28rpx;
	color: #b2b2b2;
	line-height: 28rpx;
	margin-top: 44rpx;
	margin-bottom: 43-45/2rpx;
}
.hot-list{
	flex-wrap: wrap;
	margin-bottom: 38-45/2rpx;
	border-bottom: 2rpx solid #ededed;
}
.hot-item{
	font-size: 28rpx;
	line-height: 28rpx;
	margin: 45/2rpx 0rpx;
	width: (684-42*2-3)/2rpx;
	padding-right: 42rpx;
	border-right: 3rpx solid #e6e6e6;
}
.hot-item:nth-child(even){
	padding-right: 0rpx;
	padding-left: 42rpx;
	border-right: none;
}
.hot-item:last-child{
	border-right: none;
}

.garbage{
	width: 26rpx;
	height: 26rpx;
	display: block;
}
.lists{
	margin-top: 30rpx;
}
.tui-item{
			box-shadow: 0px 0px 20rpx 6rpx #eee;
			height: 210-20*2-50rpx;
			padding: 20rpx;
			width: 750-19*2-20*2rpx;
			margin-bottom: 26rpx;
				
				.tui-h1{
					font-size: 30rpx;
					color: #3c3c3c;
					line-height: 26+14rpx;
					margin-top: -12+3rpx;
				}
				.tui-h2{
					font-size: 26rpx;
					color: #7e7d7d;
					margin-left: 15rpx;
				}
		}
</style>
