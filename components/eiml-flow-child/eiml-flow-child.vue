<template>
	<view class="wedding-item" @click="go">
		<!-- <image :src="item.src" mode="" :class="{'wi-small-img':item.isSmall,'wi-big-img':!item.isSmall}"></image> -->
		<!-- <div class="wi-h3" v-if="!item.isSmall">{{item.h3}}</div> -->
	</view>
</template>

<script>
	export default {
		props:["item"],
		data() {
			return {
				
			}
		},
		methods: {
			go(){
				uni.navigateTo({
					url:"/pages/wedding_detail/wedding_detail"
				})
			}
		}
	}
</script>

<style lang="less">
	


</style>
