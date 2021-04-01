<template>
	<view>
		<return-btn ttl="招聘" :radio="bgRadio" :isCenter="true"  @returnBtnInitial="returnBtnInitial" :usingRedirect="true" url="/pages/index/index" v-if="is_outer"></return-btn>
		<return-btn ttl="招聘" :radio="bgRadio" :isCenter="true"  @returnBtnInitial="returnBtnInitial" v-else></return-btn>
		<div class="header" :style="{'margin-top':initialTop+'px'}">
			<image src="../../static/icons/givejob.jpg" class="h-img" mode=""></image>
		</div>
<!-- 		<div class="tab-list fr-start">
			<div class="tab-item" :class="{'tab-item-selected':curTab==0}" @click="changeTab(0)">
				<div class="ti-h1">推荐</div>
				<div class="flex-allcenter">
					<div class="ti-h2"></div>
				</div>
			</div>
			<div class="tab-item" :class="{'tab-item-selected':curTab==1}"  @click="changeTab(1)">
				<div class="ti-h1">附近</div>
				<div class="flex-allcenter">
					<div class="ti-h2"></div>
				</div>
			</div>
		</div> -->
		
		<div class="job-list" style="margin-top: 20rpx;">
			<div class="job-item" v-for="item,index in data" :data-id="item.id" @click="goDetail">
				<div class="ji-h fr-space-between">
					<div>{{item.job_title}}</div><div style="color: #fc7777;">{{item.job_salary}}</div>
				</div>
				<div class="ji-h2 textHidden">{{item.company_address}}<text class="split-line">|</text>{{item.degree}}<text class="split-line">|</text>{{item.work_experience}}</div>
				<div class="ji-h3">
					<div class="ji-h31 textHidden">{{item.company_name}}</div>
				</div>
			</div>
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
				curTab:0,
				
				data:[],
				initialTotalPage:false,
				totalPage:2,
				nextPage:1,
				isNoMore:false,
				outerInitial:false,
				
				initialTop:149,
				is_outer:false
			};
		},components:{
			returnBtn
		},onLoad(options) {
			if(options.is_outer!=undefined && options.is_outer==1){
				this.is_outer=true;
				
				if(this.isLogin==false){
					
					uni.showToast({
						title:"请登录",
						icon:"none"
					})
					
					setTimeout(function(){
						uni.navigateTo({
							url:"/pages/login/login?is_outer=1",
						})
					},600);
					return ;
				}
			}
			this.getData(false);
		},onShow() {
			if(this.isLogin && !this.outerInitial){
				this.getData(false);
				this.outerInitial=true;
			}
		},
		onReachBottom() {
			this.getData(true);
		}
		,methods:{
			changeTab(id){
				this.curTab=id;
			},
			goDetail(e){
				uni.navigateTo({
					url:"/pages/givejob_detail/givejob_detail?id="+e.currentTarget.dataset.id
				})
			},
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
					url:isPush?"/get_recruitment_lists_more":"/get_recruitment_lists",
					data:data,
					success(res){
						
						
						if(!_this.initialTotalPage && isPush){
							_this.totalPage=res.data.data.lists.last_page;
							_this.initialTotalPage=true;
						}
						
						if(isPush){
							_this.data=_this.data.concat(res.data.data.lists.data);
							_this.nextPage++;
						}else{
							_this.data=res.data.data.lists;
							_this.nextPage++;
						}
						
						if(res.data.data.lists.current_page!=undefined && res.data.data.lists.current_page==res.data.data.lists.last_page){
							_this.isNoMore=true;
						}
						
						_this.outerInitial=true;
					},
					_target_this:_this //当错误时传递this给http方法
				})
			},
			returnBtnInitial(obj){
				this.initialTop=obj.height;
			}
		},
		computed:{
			...mapState(['secretkey','isLogin'])
		}
		,onShareAppMessage (){
			return {title:'这里有临泉最新的招聘咨询',path:'/pages/givejob/givejob?is_outer=1'}
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
	
	
.header{
	margin-top: 149rpx;
	height: 230rpx;
	background-color: #1e95ee;
	
	.h-img{
		width: 716rpx;
		height: 208rpx;
		border-radius: 25rpx;
		margin-left: (750-716)/2rpx;
	}
}

// 选项卡
.tab-list{
	padding-top: 25rpx;
	border-bottom: 1rpx solid #e8e8e8;
	padding-left: 48rpx;
	
	.tab-item{
		margin-right: 56rpx;
		display: inline-block;
		
		.ti-h1{
			line-height: 34rpx;
			height: 34rpx;
			padding-bottom: 25rpx;
			font-size: 28rpx;
			color: #ababab;
		}
		
		.ti-h2{
			height: 6rpx;
			width: 38rpx;
			background-color: transparent;
			border-radius: 6rpx;
		}
	}
	
	.tab-item-selected{
		.ti-h1{
			font-size: 34rpx;
			color: #1d92e9;
		}
		.ti-h2{
			background-color: #1d92e9;
		}
	}
	
}

/* 职位列表 */
.job-list{
	.job-item{
		padding: 27rpx (750-684)/2rpx 41rpx (750-684)/2rpx;
		box-shadow: 0rpx 0rpx 10rpx #e6e6e6;
		margin-bottom: 30rpx;
		
		.ji-h{
			color: #333;
			font-size: 30rpx;
			padding-bottom: 35rpx;
		}
		.ji-h2,.ji-h3{
			font-size: 28rpx;
			line-height: 28rpx;
			color: #ababab;
		}
		
		.split-line{
			margin: 0rpx 14rpx;
		}
		.ji-h3{
			padding-top: 34rpx;
			.si-h31{
				max-width: 600rpx;
			}
		}
	}
	.job-item:first-child{
		box-shadow: 0rpx 5rpx 5rpx #eee;
	}
}

</style>
