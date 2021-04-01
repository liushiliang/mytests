const ApiUrl = 'https://lqxcx.uperme.com/api/v1';

export const http = (opt) => {
	//noShowRequest==1 则表明请求成功
	if(opt.noShowRequest==undefined){
		uni.showLoading({
			title: '加载中...',
			mask: true
		});
	}
	
	opt = opt || {};
	opt.url = opt.url || '';
	opt.data = opt.data || null;
	opt.method = opt.method || 'POST';
	opt.header = opt.header || {
		"Authorization": "Bearer" + uni.getStorageSync('token')
	};
	opt.success = opt.success || function() {
		
	};
	
	
	uni.request({
		url: ApiUrl + opt.url,
		data: opt.data,
		method: opt.method,
		header: opt.header,
		dataType: 'json',
		success: function(res) {
			//对成功返回的数据进行状态验证---modified
			
			if(res.data.code==400){
				uni.showToast({
					title:res.data.data.msg,
					icon:"none",
					duration:2000
				})
				return ;
			}
			
			//token失效时执行 需要传递_target_this为app实例
			if(res.data.code==401 || res.data.code==406){
				uni.showToast({
					title:"用户不存在或登录已过期 请重新登录",
					icon:"none",
					duration:2000,
					success() {
						
						//如果token过期了 就把其他信息全部清除
						if(opt._target_this!=undefined){
							opt._target_this.logout();
						}
						
						if(opt.loginPage==1){//如果本身就处于登录页就不跳转
							return;
						}
						
						uni.navigateTo({url:"/pages/login/login"});
					}
				})
				return ;
			}
			//----modified
			
			opt.success(res);
			console.log('https的数据获取----',res)
			if (res.header.Authorization) {
				console.log(res.header.Authorization,"res.header.Authorization")
				uni.setStorage({
					key: 'token',
					data: String(res.header.Authorization).replace('Bearer ','')
				});
			}
			if(opt.noShowRequest==undefined){
				uni.hideLoading();
			}
		},
		fail: function(res) {
			console.log(res)
			uni.showToast({
				title: '请稍后重试'
			});
		}
	})
}
