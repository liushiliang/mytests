<template>
	<view>
		<return-btn ttl="小区详情" :isCenter="true" :radio="bgRadio" :isBlack="true"  @returnBtnInitial="returnBtnInitial" :usingRedirect="true" url="/pages/community/community" v-if="is_outer"></return-btn>
		<return-btn ttl="小区详情" :isCenter="true" :radio="bgRadio" :isBlack="true"  @returnBtnInitial="returnBtnInitial" v-else></return-btn>
		<image class="comm-cover" :src="info.thumb"></image>
		<div class="whole-page" :style="{top:initialTop+'px'}">
			<div class="comm-block">
				<div class="cb-h fr-start" style="align-items: flex-end;">
					<div><text v-if="info.name!=undefined">{{info.name}}</text></div>
					<div style="line-height: 28rpx;margin-left: 14rpx;font-size: 28rpx;color: #ababab;"><text v-if="info.bname!=undefined">别名：{{info.bname}}</text></div>
				</div>
				<div class="cb-h2-list">
					<div class="cb-h2"><text class="cb-h2-ttl">销售状态：</text><text v-if="info.xsqk!=undefined">{{info.xsqk==0?"停售":"在售"}}</text></div>
					<div class="cb-h2"><text class="cb-h2-ttl">最新开盘：</text><text v-if="info.kptime!=undefined">{{info.kptime}}</text></div>
					<div class="cb-h2"><text class="cb-h2-ttl">交房时间：</text><text v-if="info.jptime!=undefined">{{info.jptime}}</text></div>
				</div>
				<div class="cb-h3-lists">
					<div class="cb-h3"><text class="cb-h2-ttl">楼盘地址：</text><text v-if="info.address!=undefined">{{info.address}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">物业类型：</text><text v-if="info.wylx!=undefined">{{info.wylx}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">参考单价：</text><text v-if="info.price!=undefined">{{info.price}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">容积率： </text><text v-if="info.ljl!=undefined">{{info.ljl}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">总户数： </text><text v-if="info.zhs!=undefined">{{info.zhs}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">开发商： </text><text v-if="info.kfsmc!=undefined">{{info.kfsmc}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">楼盘特点： </text><text v-if="info.lptd!=undefined">{{info.lptd}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">装修情况： </text><text v-if="info.zxqk!=undefined">{{info.zxqk==0?"毛坯":"精装"}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">产权年限： </text><text v-if="info.cqnx!=undefined">{{info.cqnx}}</text></div>
					<!-- <div class="cb-h3"><text class="cb-h2-ttl">项目介绍： </text><text v-if="info.xmjs!=undefined">{{info.xmjs}}</text></div> -->
					<div class="cb-h3"><text class="cb-h2-ttl">设计单位： </text><text v-if="info.sjdw!=undefined">{{info.sjdw}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">建筑单位： </text><text v-if="info.jzdw!=undefined">{{info.jzdw}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">周边配套： </text><text v-if="info.zbpt!=undefined">{{info.zbpt}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">物业费：</text> <text v-if="info.wyf!=undefined">{{info.wyf}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">占地面积：</text> <text v-if="info.zdmj!=undefined">{{info.zdmj}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">建筑面积： </text><text v-if="info.jzmj!=undefined">{{info.jzmj}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">预售证： </text><text v-if="info.ysz!=undefined">{{info.ysz}}</text></div>
					<div class="cb-h3"><text class="cb-h2-ttl">售楼部地址： </text><text v-if="info.slbdz!=undefined">{{info.slbdz}}</text></div>
				</div>
				<div class="split-line"></div>
				<div class="cb-btm fr-start">
					<image src="../../static/icons/phone.png" class="orange-phone"></image>
					<div class="cb-btm-txt" @click="preCallPhone(info.slcdh)">售楼处电话：<text v-if="info.slcdh!=undefined"> {{info.slcdh}}</text></div>
				</div>
			</div>
			<div style="height: 100rpx;" v-if="news.length==0"></div>
			<div class="info-block" v-if="news.length!=0">
				<div class="ib-h">社区消息</div>
				<!-- 单个消息 start -->
				<div class="ib-item fr-space-between" v-for="item,index in news" :data-id="item.id" data-ttl="社区消息" @click="toDetail">
					<div class="ibi-left">
						<div class="ibi-h">{{item.title}}</div>
						<div class="ibi-h2 fc-space-between">
							<div class="ibi-h21 show_two"></div>
							<div class="ibi-h22 textHidden">
								{{item.create_time}}<image src="../../static/icons/eye.png" class="eye" style="margin-left: 15rpx;margin-right: 7rpx;vertical-align: bottom;"></image>{{item.view}}
							</div>
						</div>
					</div>
					<image class="ibi-img" :src="item.thumb" mode="aspectFill"></image>
				</div>
				<!-- 单个消息 end -->
			</div>
		</div>
		
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	import {mapState} from "vuex"
	
	export default {
		data() {
			return {
				bgRadio:0,
				info:{},
				news:[],
				
				initialTop:180,
				
				is_outer:false
			};
		},components:{
			returnBtn
		},methods:{
			goCommDetail2(){
				uni.navigateTo({
					url:"/pages/comm_detail2/comm_detail2"
				})
			},
			
			//初始化whole-page位置
			returnBtnInitial(obj){
				var _this=this;
				this.initialTop=obj.height+uni.upx2px(6);
				
				uni.getSystemInfo({success(res) {
					if(res.brand.toLowerCase().indexOf("xr")!=-1){
						_this.initialTop+=res.statusBarHeight;
					}
				}})
			},
			preCallPhone(phoneStr){
				//存在
				if(phoneStr.indexOf('/')!=-1){
					var phoneArr=phoneStr.split('/');
					phoneArr=phoneArr.map((item,index)=>{
						if(index!=0&& item.length<11){
							return phoneArr[0].split('-')[0]+'-'+item;
						}else{
							return item;
						}
					})
					uni.showActionSheet({
						itemList:phoneArr,
						success:(e)=>{
							this.callPhone(phoneArr[e.tapIndex]);
						}
					})
				}else{
					this.callPhone(phoneStr);
				}
			},
			callPhone(phoneNumber){
				uni.makePhoneCall({
					phoneNumber:phoneNumber,
					fail() {
						uni.showToast({
							title:"拨打失败",
							icon:"none"
						})
					}
				});
			}
		},
		onPageScroll(e) {
			var r=e.scrollTop>100?100:e.scrollTop;
			this.bgRadio=e.scrollTop/100;
		},
		computed:{
			...mapState(['secretkey'])
		},
		onLoad(options) {
			var _this=this,
				ts=this.gts(),
				sign;
			sign=this.md52(""+options.id+ts+this.secretkey);
			
			//是否是从外面访问
			if(options.is_outer!=undefined && options.is_outer==1){
				this.is_outer=true;
			}
			this.id=options.id;
			
			this.$H({
				url:"/get_house_detail",
				data:{
					id:options.id,
					timestamp:ts,
					sign:sign
				},
				success(res){
					var info=res.data.data.info;
					_this.info=info;
					console.log(_this.info.jptime);
					_this.info.jptime=new Date(info.jptime*1000).toISOString().slice(0,10).split("/").join("-");
					_this.news=res.data.data.news;
				}
			});
		},
		//分享功能：监听三点按钮
		onShareAppMessage (){
			return {title:"临泉楼市:"+this.info.name,imageUrl:this.info.thumb,path:'/pages/comm_detail/comm_detail?is_outer=1&id='+this.id};
		}
	}
</script>

<style lang="less">
	
	
.whole-page{
	position: absolute;
	top: 180rpx;
	width: 750rpx;
}
.comm-cover{
	height: 374rpx;
	width: 750rpx;
	display: block;
}
.comm-block{
	width: 690-30*2rpx;
	margin-left: (750-690)/2rpx;
	border-radius: 12rpx;
	background-color: rgba(255,255,255,0.88);
	padding: 0 30rpx;
	box-shadow: 0px 0px 30rpx #97d2ff;
	
	.cb-h{
		padding-top: 28rpx;
		font-size: 34rpx;
		color: #303233;
		line-height: 34rpx;
		align-items: center;
	}
	.cb-h2-ttl{
		color: #888;
	}
	.cb-h2-list{
		padding-top: 44-16/2rpx;
		color: #ababab;
		padding-bottom: 60-16/2-12/2rpx;
		
		.cb-h2{
			font-size: 28rpx;
			line-height: 25+16/2+4+4rpx;
		}
		
	}
	.cb-h3-lists{
		color: #ababab;
		padding-bottom: 6rpx;
		
		.cb-h3{
			font-size: 28rpx;
			line-height: 24+12/2+4+4rpx;
		}
	}
	
	.split-line{
		height: 1rpx;
		width: 690-30*2rpx;
		background-color: #f0f0f0;
	}
	
	.cb-btm{
		padding-top: 22rpx;
		padding-left: 32rpx;
		padding-bottom: 22rpx;
		align-items: center;
		
		.cb-btm-txt{
			color: #f53;
			font-size: 24rpx;
			margin-left: 13rpx;
		}
	}
}

.orange-phone{
	width: 56rpx;
	height: 56rpx;
}

.info-block{
	width: 690rpx;
	margin:0 auto;
	
	.ib-h{
		margin-left: 4rpx;
		padding-top: 44rpx;
		padding-bottom: 27rpx;
		font-size: 28rpx;
		line-height: 28rpx;
		color: #333;
	}
	//实际推送项
	.ib-item{
		padding: 18rpx 16rpx 16rpx 14rpx;
		width: 660rpx;
		margin-bottom: 20rpx;
		box-shadow: 0px 0px 20px #e9e9e9;
		
		.ibi-left{
			width: 480rpx;
			padding-right: 20rpx;
		}
		.ibi-img{
			width: 660-500rpx;
			height: 93+6/2+16-8/2+28*2rpx;
		}
		.ibi-h{
			font-size: 30rpx;
			color: #333;
			padding-bottom: 16-8/2-1rpx;
		}
		.ibi-h2{
			height: 93+6/2rpx;
			
			.ibi-h21{
				font-size: 24rpx;
				line-height: 22+6rpx;
				color: #ababab;
			}
			.ibi-h22{
				font-size: 24rpx;
				color: #ababab;
				line-height: 24rpx;
			}
		}
	}
}
</style>
