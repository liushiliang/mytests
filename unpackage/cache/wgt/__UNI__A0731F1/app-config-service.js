
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/pindao/pindao","pages/news/news","pages/house/house","pages/wedding/wedding","pages/qinzi/qinzi","pages/edu/edu","pages/food/food","pages/activity/activity","pages/activity_detail/activity_detail","pages/welfare/welfare","pages/community/community","pages/comm_detail/comm_detail","pages/findjob/findjob","pages/findjob_form/findjob_form","pages/findjob_form2/findjob_form2","pages/report/report","pages/submit_success/submit_success","pages/me/me","pages/myfav/myfav","pages/mySend/mySend","pages/search/search","pages/givejob/givejob","pages/givejob_detail/givejob_detail","pages/login/login"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"临泉网","navigationStyle":"custom","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"临泉网","compilerVersion":"3.0.7","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"临泉网","navigationStyle":"custom","titleNView":false,"animationType":"fade-in","animationDuration":"300ms","softinputMode":"adjustResize"}},{"path":"/pages/pindao/pindao","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom","softinputMode":"adjustResize"}},{"path":"/pages/news/news","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"softinputMode":"adjustResize"}},{"path":"/pages/house/house","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"softinputMode":"adjustResize"}},{"path":"/pages/wedding/wedding","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"softinputMode":"adjustResize"}},{"path":"/pages/qinzi/qinzi","meta":{},"window":{}},{"path":"/pages/edu/edu","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"softinputMode":"adjustResize"}},{"path":"/pages/food/food","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"softinputMode":"adjustResize"}},{"path":"/pages/activity/activity","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"softinputMode":"adjustResize"}},{"path":"/pages/activity_detail/activity_detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"softinputMode":"adjustResize"}},{"path":"/pages/welfare/welfare","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"softinputMode":"adjustResize"}},{"path":"/pages/community/community","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"animationType":"zoom-fade-out","animationDuration":"300ms","softinputMode":"adjustResize"}},{"path":"/pages/comm_detail/comm_detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"softinputMode":"adjustResize"}},{"path":"/pages/findjob/findjob","meta":{},"window":{"softinputMode":"adjustPan"}},{"path":"/pages/findjob_form/findjob_form","meta":{},"window":{"softinputMode":"adjustResize"}},{"path":"/pages/findjob_form2/findjob_form2","meta":{},"window":{"softinputMode":"adjustResize"}},{"path":"/pages/report/report","meta":{},"window":{"softinputMode":"adjustResize"}},{"path":"/pages/submit_success/submit_success","meta":{},"window":{}},{"path":"/pages/me/me","meta":{},"window":{"animationType":"fade-in"}},{"path":"/pages/myfav/myfav","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"softinputMode":"adjustResize"}},{"path":"/pages/mySend/mySend","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"softinputMode":"adjustResize"}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"softinputMode":"adjustResize"}},{"path":"/pages/givejob/givejob","meta":{},"window":{"softinputMode":"adjustResize"}},{"path":"/pages/givejob_detail/givejob_detail","meta":{},"window":{"softinputMode":"adjustResize"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"softinputMode":"adjustResize"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
