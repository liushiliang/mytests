<template name="tbsScrollTab">
	<view>
		<view class="scroll-view-container" :style="scrollViewContainerStyle">
			<scroll-view id="tab-bar" :scroll-x="true" :show-scrollbar="false" :scroll-with-animation="true" :scroll-left="scrollToLeft"
			 @scroll="onScroll">
				<view v-for="(tab,index) in tabItems" :key="index" class="tab-container" :style="index==0||index==(tabItems.length-1)?(index==0?tabContainerStyleFirst:tabContainerStyleLast):tabContainerStyle" :id="'tab-container-'+index"
				 :data-current="index" @click="ontabtap">
					<view style="display: flex; flex-direction: column; align-items: center;" >
						<text 
						:class="tabIndex==index ? 'tab-container-title-active' : 'tab-container-title'" :style="tabIndex==index ?titleStyleActive:titleStyle">{{tab.name}}</text>
						<view :class="tabIndex==index ? 'under-line active' : 'under-line'" :style="underlineStyle"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="line-h"></view>
	</view>
</template>

<script>
	export default {
		name: "tbsScrollTab",
		props: {
			tabItems: { // tab 条目数组
				type: Array,
				default () {
					return[{
						name: '推荐',
						data: {}
					}, {
						name: '政要新闻',
						data: {}
					}, {
						name: '临泉头条',
						data: {}
					}, {
						name: '专题报道',
						data: {}
					}, {
						name: '图片新闻',
						data: {}
					}, {
						name: '热点排行',
						data: {}
					}]
				}
			},

			fontSize: {
				type: [Number,String],
				default: 30 //upx
			},

			spaceBetween: { // 相邻两个 tab 之间的距离
				type: [Number,String],
				default: 68 //upx
			},

			color: {
				type: String,
				default: '#555'
			},

			activeColor: {
				type: String,
				default: 'blue'
			},

			backgroundColor: {
				type: String,
				default: ''
			},
			curIndex:{// 当前 tab 的 index 序号
				type: [Number,String],
				default: 0
			}
		},

		data() {
			return {
				scrollToLeft: 0, // 计算得到的即将滚动到的 left 值
				scrolledLeft: 0, // 最近一次滚到到的 left 值
				tabIndex:0
			};
		},
		watch: {
			curIndex(newVal,val){
				this.tabIndex=newVal;
				this.tabToCenter(newVal);
			}
		},

		computed: {

			scrollViewContainerStyle() {
				let retStyle = //"height:" + (uni.upx2px(this.fontSize / 10) + uni.upx2px(this.fontSize * 2)) + "px; "
				"height:85rpx;line-height:79rpx;";
				retStyle += "background-color:" + this.backgroundColor + ";"
				return retStyle
			},

			tabContainerStyle() { //每个tab项的样式
				let paddingH_px = uni.upx2px(this.spaceBetween / 2)
				let retStyle = //"padding-left:" + paddingH_px + "px; ",
				"padding-left:0rpx;padding-right:27rpx;height:85rpx;line-height:79rpx;";
				//retStyle += "padding-right:" + paddingH_px + "px; "
				return retStyle
			},
			tabContainerStyleFirst(){ //第一个tab的样式
				return "padding-left:20rpx;padding-right:27rpx;height:85rpx;line-height:79rpx;"
			},
			tabContainerStyleLast(){//最后一个tab的样式
				return "padding-left:0rpx;padding-right:119rpx;height:85rpx;line-height:79rpx;"
			},
			titleStyle() {
				let retStyle = "font-size: " + uni.upx2px(this.fontSize) + "px; "
				retStyle += "height: " + uni.upx2px(this.fontSize * 2) + "px; "
				retStyle += "line-height: " + uni.upx2px(this.fontSize) * 2 + "px; "
				retStyle += "color: " + this.color + "; letter-spacing:2rpx;line-height:79rpx;height:79rpx;"
				return retStyle
			},
			titleStyleActive() {
				let retStyle = "font-size: " + uni.upx2px(this.fontSize) + "px; "
				retStyle += "height: " + uni.upx2px(this.fontSize - 0) * 2 + "px; "
				retStyle += "line-height: " + uni.upx2px(this.fontSize - 0) * 2 + "px; "
				retStyle += "color: " + this.activeColor + ";letter-spacing:2rpx;line-height:79rpx;height:79rpx;"
				return retStyle
			},

			underlineStyle() {
				let _height = uni.upx2px(this.fontSize / 10)
				if (_height < 2) _height = 2
				let retStyle = "background: " + this.activeColor + "; "
				retStyle += "height:5rpx;";//"height: " + _height + "px; "
				retStyle += "width: " + uni.upx2px(this.fontSize) + "px;width:41rpx;border-radius:2rpx;"
				return retStyle
			},

		},

		mounted() {
			if ((!this.tabItems) || (this.tabItems.length === 0)) return // 当 tabItems 没有值时，不做任何操作
			this.$emit('tabChangeEvent', { // 通过事件执行父组件的方法，将结果传递给父组件，结果由 index 和 tabItem 构成 
				tabIndex: this.tabIndex,
				tabItem: this.tabItems[this.tabIndex]
			})
			
		},

		methods: {
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},

			onScroll(e) {
				this.scrolledLeft = e.detail.scrollLeft
			},

			switchTab(index) {
				if ((this.tabIndex === index) || (!this.tabItems) || this.tabItems.length === 0) return
				this.tabIndex = index
				this.tabToCenter(index)
				this.$emit('tabChangeEvent', {
					tabIndex: this.tabIndex,
					tabItem: this.tabItems[this.tabIndex]
				}) // 通过事件执行父组件的方法，传递 tabItem 的 index 到父组件*/
			},

			tabToCenter(index) {
				let that = this
				const query = wx.createSelectorQuery().in(this)
				query.select('#tab-bar').boundingClientRect()
				query.select('#tab-container-' + index).boundingClientRect()
				query.exec(function(res) {
					let tabBarMiddle = res[0].width / 2
					let tabItemMiddle = res[1].left + res[1].width / 2
					that.scrollToLeft = that.scrolledLeft + tabItemMiddle - tabBarMiddle
				})
			}
		}
	}
</script>

<style scoped>


	.under-line {
		background-color: #007AFF;
		align: center;
		opacity: 0;
	}

	.under-line.active {
		opacity: 1;
	}

	.scroll-view-container {
		overflow: hidden; // 这个设置了就能截掉滚动条啦
	}

	scroll-view {
		height: 100vh;
		flex-direction: row;
		white-space: nowrap;
		text-align: center;
		display: inline-block;
		overflow: hidden;
	}

	.tab-container {
		display: inline-block;
		flex-direction: row;
		padding-left: 34upx;
		padding-right: 34upx;
		flex-wrap: nowrap;
	}

	.tab-container-title {
		color: #555;
		flex-wrap: nowrap;
		white-space: nowrap;
	}

	.tab-container-title-active {
		//	color: #007AFF;
	}

	.line-h {
		height: 1px;
		background-color: #cccccc;
	}
</style>
