<template>
	<view class="_self_page">
		<return-btn ttl="招聘信息" :radio="bgRadio" :isCenter="true"  @returnBtnInitial="returnBtnInitial"></return-btn>
		<!-- <div style="line-height: 60rpx;margin:0 auto;width: 682rpx;font-size: 24rpx;color: #999;text-align: right;margin-top: 149rpx;">清空所有已填写项</div> -->
		<div class="lists lists1" :style="{'margin-top': initialPT+'px'}">
			<div class="fj-item fj-item1 fr-start" :class="{'errbox-ani':isErrAniOn.jobNameIpt}">
				<div class="fj-h1"><text style="color:#ff3838;">*</text>职位名称</div>
				<div class="fj-h2 textHidden"><input v-model="jobNameIpt" placeholder="请输入职位名称" style="width: 620rpx;"/></div>
			</div>
			<div class="fj-item fj-item2 fr-space-between"  @click="showPv(0)" :class="{'errbox-ani':isErrAniOn.jobSalary}">
				<div class="fr-start">
					<div class="fj-h1" style="color:#fc7777;"><text style="color:#ff3838;">*</text>职位薪资</div>
					<div class="fj-h2 textHidden" :style="{color:isClicked[0]?'#333232':'#7e7d7d'}">{{pickerFields[0]}}</div>
				</div>
				<image src="../../static/icons/right_arrow_gray.png" class="right-arrow-gray"></image>	
			</div>
			<div class="fj-item fj-item3 fr-start" :class="{'errbox-ani':isErrAniOn.jobTypeIpt}">
				<div class="fj-h1"><text style="color:#ff3838;">*</text>职位性质</div>
				<div class="fj-h2 textHidden"><input v-model="jobTypeIpt" placeholder="请输入职位性质 比如:全职/兼职" style="width: 620rpx;"/></div>
			</div>
		</div>
		
		<div class="lists lists2">
			<div class="fj-item fj-item4 fr-space-between" @click="goFjForm1" :class="{'errbox-ani':isErrAniOn.jobdesc}">
				<div class=" fr-start">
					<div class="fj-h1"><text style="color:#ff3838;">*</text>职位描述</div>
					<div class="fj-h2 textHidden" :style="{color:hasBrief[1]?'#333232':'#7e7d7d'}">{{desc_brief}}</div>
				</div>
				<image src="../../static/icons/right_arrow_gray.png" class="right-arrow-gray"></image>	
			</div>
			<div class="fj-item fj-item5 fr-space-between" @click="showPv(1)" :class="{'errbox-ani':isErrAniOn.requiredEdu}">
				<div class="fr-start">
					<div class="fj-h1" ><text style="color:#ff3838;">*</text>学历要求</div>
					<div class="fj-h2 textHidden" :style="{color:isClicked[1]?'#333232':'#7e7d7d'}">{{pickerFields[1]}}</div>
				</div>
				<image  src="../../static/icons/right_arrow_gray.png" class="right-arrow-gray"></image>	
			</div>
			<div class="fj-item fj-item6 fr-start" :class="{'errbox-ani':isErrAniOn.requireCount}">
				<div class="fj-h1"><text style="color:#ff3838;">*</text>招聘人数</div>
				<div class="fj-h2"><input v-model="requireCount" placeholder="请输入招聘人数" type="number" style="width: 620rpx;"/></div>
			</div>
		</div>
		
		<div class="lists lists3" style="margin-bottom: 0rpx;">
			<div class="fj-item fj-item7 fr-start" :class="{'errbox-ani':isErrAniOn.jobExp}">
				<div class="fj-h1"><text style="color:#ff3838;">*</text>工作经验</div>
				<div class="fj-h2"><input v-model="jobExp" placeholder="请输入工作经验" style="width: 620rpx;"/></div>
			</div>
			<div class="fj-item fj-item8 fr-start" :class="{'errbox-ani':isErrAniOn.companyName}">
				<div class="fj-h1"><text style="color:#ff3838;">*</text>公司名称</div>
				<div class="fj-h2"><input v-model="companyName" placeholder="请输入公司名称" style="width: 620rpx;"/></div>
			</div>
			<div class="fj-item fj-item9 fr-start" :class="{'errbox-ani':isErrAniOn.location}">
				<div class="fj-h1"><text style="color:#ff3838;">*</text>工作地点</div>
				<div class="fj-h2"><input v-model="location" placeholder="请输入工作地点" style="width: 620rpx;"/></div>
			</div>
			<div class="fj-item fj-item10 fr-space-between" @click="goFjForm2" :class="{'errbox-ani':isErrAniOn.jobfuli}">
				<div class="fr-start" >
					<div class="fj-h1"><text style="color:#ff3838;">*</text>公司福利</div>
					<div class="fj-h2 textHidden" :style="{color:hasBrief[0]?'#333232':'#7e7d7d'}">{{fuli_brief}}</div>
				</div>
				<image  src="../../static/icons/right_arrow_gray.png" class="right-arrow-gray"></image>	
			</div>
			<div class="fj-item fj-item11 fr-start" :class="{'errbox-ani':isErrAniOn.phoneNumber}">
				<div class="fj-h1"><text style="color:#ff3838;">*</text>联系电话</div>
				<div class="fj-h2"><input v-model="phoneNumber" maxlength="11"  type="number"  placeholder="请输入联系电话" style="width: 620rpx;"/></div>
			</div>
			<div class="fj-item fj-item12 fr-start" :class="{'errbox-ani':isErrAniOn.recipient}">
				<div class="fj-h1"><text style="color:#ff3838;">*</text>联系人</div>
				<div class="fj-h2"><input v-model="recipient" placeholder="请输入联系人称呼 比如:刘女士" style="width: 620rpx;"/></div>
			</div>
			<div class="fj-item fj-item13 fr-start" :class="{'errbox-ani':isErrAniOn.email}">
				<div class="fj-h1"><text style="color:#ff3838;">*</text>简历投递邮箱</div>
				<div class="fj-h2"><input v-model="email" placeholder="请输入邮箱供求职者投递" style="width: 400rpx;"/></div>
			</div>

		</div>
		<div class="btn-wrapper flex-allcenter">
			<div class="submit-btn" @click="goSubmit">立即发布</div>
		</div>
		
			<!-- 黑色遮罩 -->
			<div class="black-wrapper" :class="{'show-wrapper':isShowWrapper}" :style="{opacity:wrapperOpacity}"></div>
			
				<!-- pickerview start -->
				<div class="picker-wrapper" :class="{'picker-wrapper-show':showPicker}" >
					<div class="pv-h fr-space-between">
						<text @click="hidePv">取消</text>
						<text style="color:#1e95ee;" @click="comfirmPv">确定</text>
					</div>
					<!-- :value表示初始数据处于的index -->
					<picker-view class="pv"  indicator-style="height:80rpx;" :value="[curPickerIds[curPickerViewId]]" @change="bindChange">
						<picker-view-column>
							<view class="pick-item" v-for="item in picker_data[curPickerViewId]">{{item}}</view>
						</picker-view-column>
					</picker-view>
				</div>
				<!-- pickerview end -->
				
	</view>
</template>

<script>
	import returnBtn from "../../components/returnBtn/returnBtn.vue";
	import {mapState,mapMutations} from "vuex"
	
	export default {
		data() {
			return {
				bgRadio:100,
				picker_data:[
					['3000元以下','3000元-4000元','4000元-5000元',
					'5000元-6000元','6000元-7000元','8000元-9000元',
					'9000元-10000元','10000元以上'],
					['学历不限','大专','本科',
					'硕士','博士']
					
				],
				showPicker:false, //展示picker
				curPickerViewId:0, //当前picker列表
				curPickerIds:[0,0],//每个列表所选中的项
				pickerFields:["请选择薪资范围","请选择学历要求"],//每个列表所选中的项实际值
				isShowWrapper:false,
				wrapperOpacity:0,
				
				//记录滚动位置
				// scrollY:0, //需要滚动到的位置
				// disablePageFlag:false,
				// curSCROLL:0 //当前scroll
				jobNameIpt:"",
				jobTypeIpt:"",
				requireCount:"",
				jobExp:"",
				companyName:"",
				location:"",
				phoneNumber:"",
				recipient:"",
				email:"",
				//报错信息数组
				errorTextArr:{
					jobNameIpt:"职位名称",
					jobTypeIpt:"职位性质",
					requireCount:"招聘人数",
					jobExp:"工作经验",
					companyName:"公司名称",
					location:"工作地点",
					phoneNumber:"联系电话",
					recipient:"联系人",
					email:"电子邮箱",
					jobdesc:"职位描述",
					jobfuli:"公司福利",
					jobSalary:"职位薪资",
					requiredEdu:"学历要求"
				},
				isErrAniOn:{ //是否错误动画开启
					jobNameIpt:false,
					jobTypeIpt:false,
					requireCount:false,
					jobExp:false,
					companyName:false,
					location:false,
					phoneNumber:false,
					recipient:false,
					email:false,
					jobdesc:false,
					jobfuli:false,
					jobSalary:false,
					requiredEdu:false
				},
				//详情页的简写文字
				fuli_brief:"如：1.无责底薪3500+提成，月综合薪...",
				desc_brief:"如：岗位职责：1.新员工入职后，培训...",
				
				scrollTopArr:[] ,//存储ipt处于的位置
				
				
				
				//修改位置
				initialPT:169,
				
				
				//两个选择框是否点击过
				isClicked:[false,false],
				
				hasBrief:[false,false]
			};
		},components:{
			returnBtn
		},
		methods:{
			...mapMutations(['logout']),
			///提交验证----start
			async goSubmit(){ //提交
				if(this.jobNameIpt==""){
					this.pt(this.scrollTopArr[0]); //滚动到该ipt
					this.st(this.errorTextArr['jobNameIpt']); //滚动到该ipt
					this.showArrBox("jobNameIpt");
				}else if(this.jobTypeIpt==""){
					this.pt(this.scrollTopArr[2]);
					this.st(this.errorTextArr['jobTypeIpt']);
					this.showArrBox("jobTypeIpt");
				}else if(this.requireCount==""){
					this.pt(this.scrollTopArr[5]);
					this.st(this.errorTextArr['requireCount']);
					this.showArrBox("requireCount");
				}else if(this.requireCount.match(/^\d+$/)==null){ //不为数字则不匹配
						this.pt(this.scrollTopArr[5]);
						uni.showToast({
							title:this.errorTextArr['requireCount']+"只能填写正整数",
							icon:"none",
							duration:1700
						});
						this.pt(this.scrollTopArr[5]);
						this.showArrBox("requireCount");
				}else if(parseInt(this.requireCount)<=0){
					this.pt(this.scrollTopArr[5]);
					uni.showToast({
						title:this.errorTextArr['requireCount']+"必须大于零",
						icon:"none",
						duration:1700
					});
					this.showArrBox("requireCount");
				}else if(this.jobExp==""){
					this.pt(this.scrollTopArr[6]);
					this.st(this.errorTextArr['jobExp']);
					this.showArrBox("jobExp");
				}else if(this.companyName==""){
					this.pt(this.scrollTopArr[7]);
					this.st(this.errorTextArr['companyName']);
					this.showArrBox("companyName");
				}else if(this.location==""){
					this.pt(this.scrollTopArr[8]);
					this.st(this.errorTextArr['location']);
					this.showArrBox("location");
				}else if(this.phoneNumber==""){
					this.pt(this.scrollTopArr[10]);
					this.st(this.errorTextArr['phoneNumber']);
					this.showArrBox("phoneNumber");
				}else if(this.phoneNumber.match(/^1[3-9]\d{9}$/)==null){
					this.pt(this.scrollTopArr[10]);
					uni.showToast({
						title:this.errorTextArr['phoneNumber']+"不合法",
						icon:"none",
						duration:1700
					});
					this.showArrBox("phoneNumber");
				}else if(this.recipient==""){
					this.pt(this.scrollTopArr[11]);
					this.st(this.errorTextArr['recipient']);
					this.showArrBox("recipient");
				}else if(this.email==""){
					this.pt(this.scrollTopArr[12]);
					this.st(this.errorTextArr['email']);
					this.showArrBox("email");
				}else if(this.email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)==null){ //电子邮箱名称是否合法
					this.pt(this.scrollTopArr[12]);
					uni.showToast({
						title:this.errorTextArr['email']+"不合法",
						icon:"none",
						duration:1700
					});
					this.showArrBox("email");
				}else if(this.pickerFields[0]=="请选择薪资范围"){
					this.pt(this.scrollTopArr[1]);
					uni.showToast({
						title:"未选择"+this.errorTextArr['jobSalary'],
						icon:"none",
						duration:1700
					});
					this.showArrBox("jobSalary");
				}else if(this.pickerFields[1]=="请选择学历要求"){
					this.pt(this.scrollTopArr[4]);
					uni.showToast({
						title:"未选择"+this.errorTextArr['requiredEdu'],
						icon:"none",
						duration:1700
					});
					this.showArrBox("requiredEdu");
				}else if(uni.getStorageSync("jobdesc")==""){
					this.pt(this.scrollTopArr[3]);
					this.st(this.errorTextArr['jobdesc'])
					this.showArrBox("jobdesc");
				}else if(uni.getStorageSync("jobfuli")==""){
					this.pt(this.scrollTopArr[9]);
					this.st(this.errorTextArr['jobfuli'])
					this.showArrBox("jobfuli");
				}else{
					
					if(this.NonFreq("goSubmit",3)){
						return ;
					}
					
					//进行提交
					var _this=this,ts=this.gts(),sign;
					
					sign=this.md52(""+_this.jobNameIpt+_this.pickerFields[0]+_this.jobTypeIpt
					+uni.getStorageSync("jobdesc")+_this.pickerFields[1]+_this.requireCount+
					_this.jobExp+_this.companyName+uni.getStorageSync("jobfuli")+_this.location
					+_this.recipient+_this.phoneNumber+_this.email+ts+this.secretkey);
					
					console.log({
							job_title:_this.jobNameIpt,
							job_salary:_this.pickerFields[0],
							job_nature:_this.jobTypeIpt,
							job_description:uni.getStorageSync("jobdesc"),
							degree:_this.pickerFields[1],
							number:_this.requireCount,
							work_experience:_this.jobExp,
							company_name:_this.companyName,
							company_welfare:uni.getStorageSync("jobfuli"),
							company_address:_this.location,
							contact_person:_this.recipient,
							contact_number:_this.phoneNumber,
							email:_this.email,
							timestamp:ts,
							sign:sign
						});
					
					this.$H({
						url:"/post_recruitment",
						data:{
							job_title:_this.jobNameIpt,
							job_salary:_this.pickerFields[0],
							job_nature:_this.jobTypeIpt,
							job_description:uni.getStorageSync("jobdesc"),
							degree:_this.pickerFields[1],
							number:""+_this.requireCount,
							work_experience:_this.jobExp,
							company_name:_this.companyName,
							company_welfare:uni.getStorageSync("jobfuli"),
							company_address:_this.location,
							contact_person:_this.recipient,
							contact_number:_this.phoneNumber,
							email:_this.email,
							timestamp:ts,
							sign:sign
						},
						success(res){
							uni.redirectTo({
								url:"/pages/submit_success/submit_success"
							})
						},
						_target_this:_this //当错误时传递this给http方法
					})
				}
			},
			st(ttl){
				uni.showToast({
					title:ttl+"未填写",
					icon:"none",
					duration:1700
				});
			},
			showArrBox(iptName){//特定ipt框进行错误提示
				this.isErrAniOn[iptName]=true;
				
				setTimeout(()=>{
					this.isErrAniOn[iptName]=false;
				},600);
			},
			pt(scrollTop){
				uni.pageScrollTo({
					scrollTop:scrollTop
				})
			},
			///提交验证---end
			
			bindChange(e){//picker
				// console.log(e.detail.value);
				this.curPickerIds[this.curPickerViewId]=e.detail.value;
			},
			showPv(id){ //根据id打开pickerview
				//展示遮罩
				this.isShowWrapper=true;
				setTimeout((res)=>{
					this.wrapperOpacity=1;
				},10);
				
				setTimeout((res)=>{
					this.showPicker=true;
					this.curPickerViewId=id;
				},100);
			},
			hidePv(){ //关闭pickerview
				this.showPicker=false;
				
				setTimeout((res)=>{
					this.wrapperOpacity=0;
				},100);
				setTimeout((res)=>{
					this.isShowWrapper=false;
				},110);
			},
			comfirmPv(){
				// 将选中的项内容保存
				let id=this.curPickerViewId;
				this.pickerFields[id]=this.picker_data[id][this.curPickerIds[id]];
				this.isClicked[id]=true;
				// 隐藏pickerview
				this.hidePv();
			},
			goFjForm1(){//公司福利表单
				uni.navigateTo({
					url:"/pages/findjob_form/findjob_form"
				})
				
			},
			goFjForm2(){//公司福利表单
				uni.navigateTo({
					url:"/pages/findjob_form2/findjob_form2"
				})
			}
			
			// //禁止页面滚动
			// disablePage(){
			// 	this.scrollY=this.curSCROLL;
			// 	console.log(this.scrollY);
			// 	setTimeout((res)=>{
			// 		this.disablePageFlag=true;//禁止页面滚动
			// 	},10)
			// },
			// //禁止页面滚动--复原页面
			// recoverPage(){
			// 	uni.pageScrollTo({
			// 		scrollTop:this.scrollY
			// 	})
			// 	this.disablePageFlag=false;//禁止页面滚动
			// }
			,
			getAllIptScrollTop(){
				var base=0;
				
				// #ifdef MP-WEIXIN
				for(let i=1;i<=13;i++){
					wx.createSelectorQuery().select(".fj-item"+i).boundingClientRect((res)=>{
						if(i==1){
							base=res.top;
						}
						this.scrollTopArr.push(res.top-base);
						
					}).exec();
				}
				// #endif
				// #ifdef APP-PLUS
				for(let i=1;i<=13;i++){
					uni.createSelectorQuery().select(".fj-item"+i).boundingClientRect((res)=>{
						if(i==1){
							base=res.top;
						}
						this.scrollTopArr.push(res.top-base);
						
					}).exec();
				}
				// #endif
				
			},
			
			//初始化返回btn按钮
			returnBtnInitial(obj){
				this.initialPT=obj.height+uni.upx2px(20);
			}
			
		},
		// onPageScroll(e) {//禁止页面滚动--记录滚动位置
		// 	this.curSCROLL=e.scrollTop;
		// }
		onUnload() {
			//清除工作详情页的数据
			uni.removeStorage({
				key:"jobdesc"
			});
			
			//清除工作详情页的数据
			uni.removeStorage({
				key:"jobfuli"
			});
		},
		async onShow() {
			
			//给福利详情和职位描述填写简短的部分
			if(uni.getStorageSync("jobfuli")!=""){
				this.fuli_brief=uni.getStorageSync("jobfuli");
			}else{
				this.fuli_brief="如：1.无责底薪3500+提成，月综合薪..."
			}
			
			if(uni.getStorageSync("jobdesc")!=""){
				this.desc_brief=uni.getStorageSync("jobdesc");
			}else{
				this.desc_brief="如：岗位职责：1.新员工入职后，培训..."
			}
			
			//获取能滚动到该ipt的高度
			await this.getAllIptScrollTop();
			// console.log(this.scrollTopArr);
		},
		computed:{
			...mapState(['secretkey'])
		},
		onLoad(options) {
			uni.removeStorageSync("jobfuli");
			uni.removeStorageSync("jobdesc");
			
			//如果带编辑参数则编辑
			if(options.edit!=undefined){
				var info=JSON.parse(options.info);
				this.jobNameIpt=""+info.job_title;
				this.jobTypeIpt=""+info.job_nature;
				this.requireCount=""+info.number;
				this.jobExp=""+info.work_experience;
				this.companyName=""+info.company_name;
				this.location=""+info.company_address;
				this.phoneNumber=""+info.contact_number;
				this.recipient=""+info.contact_person;
				this.email=""+info.email;
				
				uni.setStorage({
					key:"jobfuli",
					data:info.company_welfare
				})
				
				uni.setStorage({
					key:"jobdesc",
					data:info.job_description
				})
				this.fuli_brief=uni.getStorageSync("jobfuli");
				this.desc_brief=uni.getStorageSync("jobdesc");
				this.pickerFields[0]=""+info.job_salary;
				this.pickerFields[1]=""+info.degree;
			}
		},
		watch:{
			fuli_brief(newVal,val){
				if(newVal=="如：1.无责底薪3500+提成，月综合薪..."){
					this.hasBrief[0]=false;
				}else{
					this.hasBrief[0]=true;
				}
			},
			desc_brief(newVal,val){
				if(newVal=="如：岗位职责：1.新员工入职后，培训..."){
					this.hasBrief[1]=false;
				}else{
					this.hasBrief[1]=true;
				}
			},
		}
	}
</script>

<style lang="less">
._self_page{
	width: 750rpx;
	height: 100%;
	overflow-x: hidden;
}

//动画
@keyframes redbox{
	0%{
		background-color: #fff;
	}
	25%{
		background-color: rgba(255,39,39,0.2);
	}
	50%{
		background-color: #fff;
	}
	75%{
		background-color: rgba(255,39,39,0.2);
	}
	100%{
		background-color: #fff;
	}
}
.errbox-ani{
	animation: redbox 500ms ease-out;
}

//实际内容
.lists{
	font-size: 30rpx;
	box-shadow: 0px 0px 20rpx #e2e2e2;
	margin-bottom: 14rpx;
	
	.fj-item-wrapper{
		align-items: center;
	}
	.fj-item{
		height: 110rpx;
		padding: 0rpx 34rpx;
		box-sizing: border-box;
		align-items: center;
		border-bottom: 1px solid #e6e6e6;;
		.fj-h1{
			color: #7e7d7d;
		}
		.fj-h2{
			margin-left: 28rpx;
			color: #333232;
			max-width: 500rpx;
		}
	}
	.right-arrow-gray{
		width: 12rpx;
		height: 21rpx;
	}
}
.btn-wrapper{
	width: 750rpx;
	height: 170rpx;
	.submit-btn{
		color: #fff;
		border-radius: 87/2rpx;
		width: 692rpx;
		height: 87rpx;
		line-height: 87rpx;
		background-color: #1e95ee;
		font-size: 30rpx;
		text-align: center;
		letter-spacing: 6rpx;
	}
}



// picker-view start
.picker-wrapper{
	position: fixed;
	bottom: -692rpx;
	left: 0;
	width: 750rpx;
	transition: all 300ms ease-out;
	background-color: #fff;
	z-index:301;
	
	.pv-h{
		height: 90rpx;
		border-bottom: 2rpx solid #ececec;
		width: 684rpx;
		padding:0rpx (750-684)/2rpx;
		align-items: center;
		color: #7e7d7d;
		font-size: 31rpx;
		background-color: #fff;
	}
	.pv{
		width: 750rpx;
		height:500rpx;
		
		.pick-item{
			text-align: center;
			height: 80rpx;
			line-height: 80rpx;
		}
	}
}

.picker-wrapper-show{
	bottom: 0;
}

//picker-view的黑色遮罩
.black-wrapper{
	display: none;
	transition: all 200ms ease-out;
	opacity: 0;
	position: fixed;
	width: 750rpx;
	height: 100%;
	background-color: rgba(0,0,0,0.15);
	z-index: 79;
	top: 0;
	left: 0;
	overflow: hidden;
 }
 .show-wrapper{//展示该wrapper
 	display: block;
 }
 
 // picker-view end
</style>
