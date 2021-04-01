<template>
	<view>
		<return-btn ttl="我的发布" :radio="bgRadio" :isCenter="true"  @returnBtnInitial="returnBtnInitial"></return-btn>
		<div class="lists" :style="{'margin-top':initialTop+'px'}">
			<div  v-for="item,index in data" >
				
				<!-- 只有招聘和已解决的举报可以删除 -->
				<slipBtn :id="item.id" :btnHeight="true?221:291" marginBottom="40"
					@delete="deleteTheItem(item.id)" :initialValFlag="initialValFlag">
					<!-- initialValFlag用来消除bug -->
					
						<div class="send-fj-item">
							<div class="si-h1 fr-space-between">
								<div class="si-h11">{{item.job_title}}</div>
								<div class="si-h12">{{item.job_salary}}</div>
							</div>
							<div class="si-h2 textHidden">{{item.company_address}}<text class="split-line">|</text>{{item.degree}}<text class="split-line">|</text>{{item.work_experience}}</div>
							<div class="si-h3 fr-space-between">
								<div class="si-h31 textHidden">{{item.company_name}}</div>
								<div class="si-h32" @click="edit" :data-info="JSON.stringify(item)" data-isedit="1">编辑</div>
							</div>
						</div>
						<!-- 
						<div class="send-report-item" v-if="item.type==1">
							<div class="sri-h fr-space-between">
								<div class="sri-h1">垃圾堆放，影响企业接单，影响城市形象</div>
								<div class="sri-h2" style="color:#1e95ee;">已处理</div>
							</div>
							<div class="sri-detail" >
								<div class="sri-h3 show_three" style="width: 100%;">临泉县霞光大道与汇原路交叉临泉县霞光大道与汇原路交叉口临泉县霞光大道与汇原路交叉口临泉县霞光大道与汇原路交叉口临泉县霞光大道与汇原路交叉口口，路边堆放的工业和生活垃圾在路边随意堆放。现在天气炎热，路...</div>
							</div>
							<div class="sri-response textHidden">回复：已联系相关部门处理</div>
						</div> -->
						
				</slipBtn>
				
				<!-- 未解决的问题不可以删除 -->
				<!-- <div class="send-report-item" v-if="item.type==2" style="margin-bottom: 40rpx;">
					<div class="sri-h fr-space-between">
						<div class="sri-h1">垃圾堆放，影响企业接单，影响城市形象</div>
						<div class="sri-h2">已提交</div>
					</div>
					<div class="sri-detail fr-space-between" style="width: 100%;">
						<div>
							<div class="sri-h3 show_three">临泉县霞光大道与汇原路交叉临泉县霞光大道与汇原路交叉口临泉县霞光大道与汇原路交叉口临泉县霞光大道与汇原路交叉口临泉县霞光大道与汇原路交叉口口，路边堆放的工业和生活垃圾在路边随意堆放。现在天气炎热，路...</div>
						</div>
						<image src="../../static/uploads/mysend.jpg" class="sri-img"></image>
					</div>
				</div>
				 -->
			</div>
			<div v-if="isNoMore" class="isNoMore">没有更多收藏了</div>
		</div>
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	import slipBtn from "../../components/slipBtn/slipBtn.vue";
	import {mapState,mapMutations} from "vuex"
	
	export default {
		data() {
			return {
				bgRadio:100,
				/*
				 * type为0是招聘信息

				 * */
				data:[],
				initialTotalPage:false,
				totalPage:2,
				nextPage:1,
				isNoMore:false,
				initialValFlag:0,
				
				initialTop:149+27
				
			};
		},components:{
			returnBtn,
			slipBtn
		},methods:{
			...mapMutations(['logout']),
			deleteTheItem(sendId){
				var st=this.gts(),_this=this;
				
				this.$H({
					url:"/my_recruitment_delete",
					data:{
						id:sendId,
						timestamp:st,
						sign:_this.md52(sendId+st+this.secretkey)
					},
					success(){
						
						var target=0;
						//根据ID删除数据
						_this.data.forEach((item,index)=>{
							if(item.id==sendId){
								target=index;
							}
						});
						var delData=_this.data.splice(target,1);
						
						//解决删除之后会显示其他删除按钮的bug
						_this.initialValFlag++;
					}
				});
				

			},
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
					url:isPush?"/get_my_recruitment_more":"/get_my_recruitment",
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
						
						if(res.data.data.current_page==Math.ceil(res.data.data.total/20)){
							this.isNoMore=true;
						}
					},
					_target_this:_this //当错误时传递this给http方法
				})
			},
			
			edit(e){
				var d=e.currentTarget.dataset;
				uni.navigateTo({
					url:"/pages/findjob/findjob?edit="+d.isedit+"&info="+d.info
				})
			},
			//初始化样式
			returnBtnInitial(obj){
				this.initialTop=obj.height+uni.upx2px(27);
			}
		},
		onReachBottom() {
			this.getData(true);
		},
		computed:{
			...mapState(['secretkey'])
		},
		onLoad() {
			this.getData(false);
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
	// margin-top: 149+27rpx;
}
.send-item-wrapper{
	width: 750+173rpx;
	position: relative;
	transition: all 100ms ease-out;
}
.send-fj-item{ //发布工作的
	padding: 29rpx 33rpx 42rpx 33rpx;
	box-shadow: 0rpx 0rpx 30rpx #ddd;
	width: 750-33*2+4rpx;
	
	.si-h1{
		padding-bottom: 35rpx;
		font-size: 30rpx;
		line-height: 30rpx;
		color: #333;
		
		.si-h12{
			color: #fc7777;
		}
	}
	.si-h2,.si-h3{
		font-size: 28rpx;
		line-height: 28rpx;
		color: #ababab;
	}
	
	.split-line{
		margin: 0rpx 14rpx;
	}
	.si-h3{
		padding-top: 34rpx;
		.si-h31{
			max-width: 600rpx;
		}
	}
}
.send-report-item{
	width: 750-33-38+4rpx;
	padding: 29rpx 33rpx 42rpx 38rpx;
	box-shadow: 0rpx 0rpx 30rpx #ddd;
	
	.sri-h{
		height: 75rpx;
		font-size: 27rpx;
		color: #333;
		line-height: 27+6rpx;
		
		.sri-h1{
			width: 440rpx;
			margin-top: -3rpx;
		}
		.sri-h2{
			line-height: 24rpx;
			font-size: 24rpx;
			color: #f95151;
		}
	}
	.sri-detail{
		font-size: 25rpx;
		line-height: 25+7rpx;
		
		.sri-h3{
			margin-top: -7/2rpx;
			color: #ababab;
			width: 430rpx;
		}
		
		.sri-img{
			width: 195rpx;
			height: 120rpx;
			border-radius: 10rpx;
		}
	}
	.sri-response{
		font-size: 26rpx;
		line-height: 26rpx;
		color: #1e95ee;
		padding-top: 29-7/2rpx;
	}
}


</style>
