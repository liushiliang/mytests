<template>
	<view>
		<return-btn :ttl="ttl" :radio="bgRadio" :isCenter="true" delta="1" :usingRedirect="true" url="/pages/index/index" @returnBtnInitial="returnBtnInitial" v-if="is_outer"></return-btn>
		<return-btn :ttl="ttl" :radio="bgRadio" :isCenter="true" delta="1" @returnBtnInitial="returnBtnInitial" v-else></return-btn>
		
		<div :style="{height: initialH+'px'}"></div>
		
		<div class="container">
			<div class="h">
				{{title}}
			</div>
			<div class="h2 fr-space-between">
				<div class="h21">{{time}} <image src="../../static/icons/eye.png" style="vertical-align: bottom;margin-left: 20rpx;margin-right: 7rpx;" class="eye"></image>{{view}}</div>
				<div class="h22" @click="addToFav"><image :src="showRedHeart?'../../static/icons/redheart.png':'../../static/icons/heart.png'" class="heart"></image>收藏</div>
			</div>
			<div class="detail">
				 <rich-text :nodes="content" class="p"></rich-text>
				<!-- <div class="p">
					   为认真贯彻落实习近平总书记“从根本上消除事故隐患，有效遏制重特大事故发生”的重要指示精神，推动全国安全生产专项整治三年行动安全风险隐患排查整治工作顺利开展。临泉县图书馆按照主管局工作部署，充分发挥公共图书馆的宣传教育职能，结合国务院安委会办公室和应急管理部发起的“消除事故隐患，筑牢安全防线”的主题，在2020年第19个全国“安全生产月”开展主题宣传活动。
				</div>
			<image src="../../static/uploads/activity.jpg" class="img" mode="widthFix"></image>
				<div class="p">  活动开始前，图书馆馆长李梦云组织全馆工作人员进行消防安全大排查，针对消防设施、设备、电路电器等进行全面检查，消除事故隐患，确保图书馆安全开放。活动期间，利用LED屏幕循环播出“消除事故隐患，筑牢安全防线”等宣传标语；馆内馆外，志愿者为广大人民群众发放消防安全常识二十条、中国消防救援海报等；利用多媒体室为读者播放2020年全国“安全生产月”活动</div>-->
			</div> 
			
		</div>
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	import { mapState,mapMutations } from "vuex"
	
	export default {
		data() {
			return {
				bgRadio:100,
				showRedHeart:false,//是否显示红心
				title:"",
				view:0,
				time:"",
				content:'',
				ttl:"", //导航栏上的标题
				detailId:0,
				thumb:"/static/icons/shave.jpg",
				is_outer:false,
				
				//调整位置
				initialH:149
			};
		},
		components:{
			returnBtn
		},
		methods:{
			...mapMutations(['logout']),
			
			addToFav(){//添加至收藏
				
				this.operateWithAuth((function(_this){
					return function(){
						_this.showRedHeart=!_this.showRedHeart;
						var ts=_this.gts(),sign;
						sign=_this.md52(_this.detailId+ts+_this.secretkey);
						
						_this.$H({
							url:"/set_text_collection",
							data:{
								id:_this.detailId,
								timestamp:ts,
								sign:sign
							},
							success(res){
								uni.showToast({
									title:res.data.msg=="关注成功"?"收藏成功":"取消收藏成功",
									icon:"none"
								})
							},
							noShowRequest:true,
							_target_this:_this
						})
					}
				})(this));
		
			},
			
			//初始化样式
			returnBtnInitial(obj){
				this.initialH=obj.height;
			}
		},
		computed:{
			...mapState(['secretkey','isLogin'])
		},
		onLoad(options){
			
			this.detailId=options.id;
			
			var timestamp=this.gts(),sign,_this=this;
			sign=this.md52(options.id+timestamp+this.secretkey);
			
			this.ttl=options.ttl;
		
			//判断是否来自于外部分享进入
			if(options.is_outer!=undefined && options.is_outer==1){
				this.is_outer=true;
			}
		
			this.$H({
				url:_this.isLogin?"/get_text_detail_login":"/get_text_detail",
				data:{
					id:options.id,
					timestamp:timestamp,
					sign:sign
				},
				success(res){
					var info=res.data.data.info,tempCont,tempContArr;
					_this.title=info.title;
					_this.view=info.view;
					_this.time=info.create_time;
					_this.thumb=info.thumb;
					tempCont=info.content;
					
					//如果登录了可以获取收藏标签
					if(_this.isLogin && info.collection==true){
						_this.showRedHeart=true;
					}
					
					if(tempCont.indexOf("http")!=-1){
						tempCont=tempCont.split("src=\"").join("mode=\"widthFix\" style=\"width:100%;display:block;margin-bottom:10px;margin-top:10px;border-radius:10px;\" src=\"");
					}else{
						//修改图片资源
						tempCont=tempCont.split("src=\"").join("mode=\"widthFix\" style=\"width:100%;display:block;margin-bottom:10px;margin-top:10px;border-radius:10px;\" src=\"http://www.lq0558.com");
					}
					
					
					// if(tempCont.indexOf('rgb')!=-1){
					// 	var arr,newArr=[];
						
					// }
					
					//部分图片居中样式不需要
					// if(tempCont.indexOf("<p style=\"text-align: center;\"><img")!=-1){
					// 	var arr,newArr=[];
					// 	arr=tempCont.split("<p style=\"text-align: center;\"><img");
						
					// 	arr.forEach(function(item,index){
					// 		if(index!=arr.length-1){
					// 			arr[index]+="<img";
					// 		}
							
					// 		if(index!=0){
					// 			arr[index]=arr[index].substring(0,arr[index].indexOf("</p>"))+
					// 				arr[index].slice(arr[index].indexOf("</p>")+"</p>".length);
					// 		}
					// 	});
						
					// 	tempCont=arr.join("");
					// }
					var newArr,textAlignArr=[],realArr; //有几钟text-align
					
					//默认居中样式全部复原
					// if((newArr=tempCont.match(/<p[a-zA-Z:\"0-9-\s=;]*(text-align)[;a-zA-Z=:\"0-9-\s]*(center)[a-zA-Z:\"0-9-\s=;]*>[\s]*<img/g))!=null){
					// 	newArr.forEach(function(item,index){
					// 		var isIn=0; //
							
					// 		if(index==0){
					// 			textAlignArr.push(item);
					// 		}
							
					// 		//如果没有相同的text-align 则加入textAlignArr数组中
					// 		textAlignArr.forEach(function(it,id){
					// 			if(it==item){
					// 				isIn=1;
					// 			}
					// 		})
							
					// 		if(isIn==0){
					// 			textAlignArr.push(item);
					// 		}
					// 	});
						
					// 	//替换数组
					// 	textAlignArr.forEach(function(item,index){
					// 		// console.log(tempCont);
					// 		realArr=tempCont.split(item);
					// 		// console.log(realArr.join("<img"));
							
					// 		realArr.forEach(function(it,id){
					// 			console.log(it);
								
					// 			if(id!=0){
					// 				realArr[id]=it.substring(0,it.indexOf("</p>"))+
					// 				it.substr(it.indexOf("</p>")+"</p>".length);
					// 			}
					// 		});
					// 		tempCont=realArr.join("<img");
					// 	});
					// }
					if((newArr=tempCont.match(/background-color[\s]*:[\s]*rgb\([\s\d]+,[\s\d]+,[\s\d]+\)/g))!=null){
						newArr.forEach(function(item,index){
							var isIn=0; //
							
							if(index==0){
								textAlignArr.push(item);
							}
							
							//如果没有相同的text-align 则加入textAlignArr数组中
							textAlignArr.forEach(function(it,id){
								if(it==item){
									isIn=1;
								}
							})
							
							if(isIn==0){
								textAlignArr.push(item);
							}
						});
						
						textAlignArr.forEach(function(item,index){
							tempCont=tempCont.split(item).join("");
						});
						
					}
					newArr=[];
					textAlignArr=[];
					if((newArr=tempCont.match(/color[\s]*:[\s]*rgb\([\s\d]+,[\s\d]+,[\s\d]+\)/g))!=null){
						console.log(newArr);
						newArr.forEach(function(item,index){
							var isIn=0; //
							
							if(index==0){
								textAlignArr.push(item);
							}
							
							//如果没有相同的text-align 则加入textAlignArr数组中
							textAlignArr.forEach(function(it,id){
								if(it==item){
									isIn=1;
								}
							})
							
							if(isIn==0){
								textAlignArr.push(item);
							}
						});
						
						// //替换数组
						textAlignArr.forEach(function(item,index){
							tempCont=tempCont.split(item).join("color:#333333");
						});
					}
					
					newArr=[];
					textAlignArr=[];
					if((newArr=tempCont.match(/width\=\"[\d]+\"/g))!=null){
						console.log(newArr);
						newArr.forEach(function(item,index){
							var isIn=0; //
							
							if(index==0){
								textAlignArr.push(item);
							}
							
							//如果没有相同的text-align 则加入textAlignArr数组中
							textAlignArr.forEach(function(it,id){
								if(it==item){
									isIn=1;
								}
							})
							
							if(isIn==0){
								textAlignArr.push(item);
							}
						});
						
						// //替换数组
						textAlignArr.forEach(function(item,index){
							tempCont=tempCont.split(item).join("");
						});
					}
					newArr=[];
					textAlignArr=[];
					
					if((newArr=tempCont.match(/height\=\"[\d]+\"/g))!=null){
						console.log(newArr);
						newArr.forEach(function(item,index){
							var isIn=0; //
							
							if(index==0){
								textAlignArr.push(item);
							}
							
							//如果没有相同的text-align 则加入textAlignArr数组中
							textAlignArr.forEach(function(it,id){
								if(it==item){
									isIn=1;
								}
							})
							
							if(isIn==0){
								textAlignArr.push(item);
							}
						});
						
						// //替换数组
						textAlignArr.forEach(function(item,index){
							tempCont=tempCont.split(item).join("");
						});
					}
					//修改img的大小
					_this.content=tempCont;
				},
				_target_this:_this
			})
		}//分享功能：监听三点按钮
		,onShareAppMessage (){
			return {title:this.ttl,imageUrl:this.thumb,path:'/pages/activity_detail/activity_detail?id='+this.detailId+"&is_outer=1"};
		}
	}
	
</script>

<style lang="less">
.container{
	margin: 0 auto;
	width: 708rpx;
}
.h{
	margin-top: 44-18/2rpx;
	font-size: 44rpx;
	line-height: 44+18rpx;
	margin-bottom: 36-18/2rpx;
	color: #333;
	letter-spacing: 4rpx;
}
.h2{
	font-size: 23rpx;
	line-height: 23rpx;
	color: #7e7d7d;
}
.heart{
	width: 22rpx;
	height: 21rpx;
	margin-right: 7rpx;
}
.detail{
	padding-top: 20rpx;
}
.p{//详情段落
	font-size: 23+7rpx;
	line-height: 24+20rpx;
	// padding-top: 23-23/2rpx;
	padding-bottom: 20-23/2rpx;
	color: #7e7d7d;
	text-indent: 23*2rpx;
	
	.img{
		width: 100%;
		border-radius: 20rpx;
		display: block;
		margin: 20rpx 0;
	}
}
	
	
.no-ls{//无缩进
	text-indent: 0;
}
</style>
