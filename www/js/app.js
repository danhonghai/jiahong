angular.module('starter', ['ionic', 'borrow.controllers', 'authenticate.controllers', 'my.controllers', 'free.controllers', 'validation','services'])
    //身份证号过滤器，隐藏中间8位年月日
    .filter('mpidcard', function() {
        return function(value) {
            if (!value) return '';
            var mpidcard = value.substr(0, 6) + '********' + value.substr(14);
            return mpidcard
        };
    })
    //手机号过滤器，隐藏中间4位
    .filter('mphone', function() {
        return function(value) {
            if (!value) return '';
            var mphone = value.substr(0, 3) + '****' + value.substr(7);
            return mphone
        };
    })
    //手机号只显示后四位
    .filter('sphone', function() {
        return function(value) {
            if (!value) return '';
            var sphone = value.substr(7);
            return sphone
        };
    })
    //银行卡号过滤器，隐藏中间12位
    .filter('mcardno', function() {
        return function(value) {
            if (!value) return '';
            var mphone = value.substr(0, 4) + ' **** **** **** ' + value.substr(16);
            return mphone
        };
    })
    //时间转化，20170323转成2017-03-23
    .filter('timeymd', function() {
        return function(value) {
            if (!value) return '';
            var timeymd = value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6);
            return timeymd
        };
    })
    .run(function($ionicPlatform, $rootScope, $state, Services, $ionicHistory, $state) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
        //基础路劲配置
        $rootScope.baseUrl = "/apis/jiahong-web/";
        //点击按钮倒计时
        $rootScope.timer = function(time, buttonid) {
            var btn = $(buttonid);
            btn.attr("disabled", true); //按钮禁止点击
            btn.html(time <= 0 ? "发送动态密码" : ("" + (time) + "秒后可发送"));
            var hander = setInterval(function() {
                if (time <= 0) {
                    clearInterval(hander); //清除倒计时
                    btn.html("发送验证码");
                    btn.attr("disabled", false);
                    return false;
                } else {
                    btn.html("" + (time--) + "秒后可发送");
                }
            }, 1000);
        };
        var online = onlinenetwork({
            "time": 1000,
            "url": ""
        })
        online.onLineHandler(function() {})
        online.offLineHandler(function() {
            $rootScope.stateonline = true;
        });
        wx.config({
          debug: false,
          appId:"",
          noncestr:"",
          signature:"",
          timestamp:"",
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'translateVoice',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'onVoicePlayEnd',
            'pauseVoice',
            'stopVoice',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'closeWindow',
            'scanQRCode',
            'chooseWXPay',
            'openProductSpecificView',
            'addCard',
            'chooseCard',
            'openCard'
          ]
        });
    })
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,$httpProvider) {
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');
        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        //设置$stateProvider.state中定义的templateUrls最大预加载模板数量
        $ionicConfigProvider.platform.ios.templates.maxPrefetch(5);
        $ionicConfigProvider.platform.android.templates.maxPrefetch(5);
        $ionicConfigProvider.scrolling.jsScrolling(true);
        $httpProvider.defaults.cache = false;
        //ionic路由
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tab.borrow',{//借款
              url:'/borrow',
              cache: false,
              views:{
                  'tab-borrow':{
                      templateUrl:'templates/borrow/tab_borrow.html',
                      controller:'BorrowCtrl'
                  }
              }
            })
            .state('loan', {//借款
                url: '/loan',
                cache: false,
                templateUrl: 'templates/borrow/loan.html',
                controller: 'LoanCtrl'
            })
            .state('tab.free',{//免息
              url:'/free',
              views:{
                  'tab-free':{
                      templateUrl:'templates/free/tab_free.html',
                      controller:'FreeCtrl'
                  }
              }
            })
            .state('tab.authenticate',{//认证
              url:'/authenticate',
              cache: false,
              views:{
                  'tab-authenticate':{
                      templateUrl:'templates/authenticate/tab_authenticate.html',
                      controller:'AuthenticateCtrl'
                  }
              }
            })
            .state('idcard', {//身份认证
                url: '/idcard',
                templateUrl: 'templates/authenticate/idcard.html',
                controller: 'IdcardCtrl'
            })
            .state('bankmange', {//银行卡认证
                url: '/bankmange',
                templateUrl: 'templates/authenticate/bankmange.html',
                controller: 'BankmangeCtrl'
            })
            .state('contactman', {//紧急联系人
                url: '/contactman',
                templateUrl: 'templates/authenticate/contactman.html',
                controller: 'ContactmanCtrl'
            })
            .state('zhima', {//芝麻信用
                url: '/zhima',
                templateUrl: 'templates/authenticate/zhima.html',
                controller: 'ZhimaCtrl'
            })
            .state('zhimaok', {//芝麻信用成功
                url: '/zhimaok',
                templateUrl: 'templates/authenticate/zhimaok.html',
                controller: 'ZhimaCtrl'
            })
            .state('mobileservice', {//手机运营商
                url: '/mobileservice',
                templateUrl: 'templates/authenticate/mobileservice.html',
                controller: 'MobileserviceCtrl'
            })
            .state('carinfo', {//车辆信息
                url: '/carinfo',
                templateUrl: 'templates/authenticate/carinfo.html',
                controller: 'CarinfoCtrl'
            })
            .state('social', {//社保
                url: '/social',
                templateUrl: 'templates/authenticate/social.html',
                controller: 'SocialCtrl'
            })
            .state('taobao', {//淘宝
                url: '/taobao',
                templateUrl: 'templates/authenticate/taobao.html',
                controller: 'TaobaoCtrl'
            })
            .state('xuexin', {//学信
                url: '/xuexin',
                templateUrl: 'templates/authenticate/xuexin.html',
                controller: 'XuexinCtrl'
            })
            .state('tab.my',{//我的
              url:'/my',
              cache: false,
              views:{
                  'tab-my':{
                      templateUrl:'templates/my/tab_my.html',
                      controller:'MyCtrl'
                  }
              }
            })
            .state('helpcenter', {//帮助中心
                url: '/helpcenter',
                templateUrl: 'templates/my/helpcenter.html',
                controller: 'HelpcenterCtrl'
            })
            .state('helpdetail', {//帮助中心详情
                url: '/helpdetail?item',
                templateUrl: 'templates/my/helpdetail.html',
                controller: 'HelpdetailCtrl'
            })
            .state('onlinemsg', {//在线留言
                url: '/onlinemsg',
                templateUrl: 'templates/my/onlinemsg.html',
                controller: 'OnlinemsgCtrl'
            })
            .state('mymsg', {//我的消息
                url: '/mymsg',
                cache: false,
                templateUrl: 'templates/my/mymsg.html',
                controller: 'MymsgCtrl'
            })
            .state('interestfree', {//免息券
                url: '/interestfree',
                cache: false,
                templateUrl: 'templates/my/interestfree.html',
                controller: 'InterestfreeCtrl'
            })
            .state('loanlist', {//借款记录
                url: '/loanlist',
                cache: false,
                templateUrl: 'templates/my/loanlist.html',
                controller: 'LoanlistCtrl'
            })
            .state('repaymentahead', {//提前还款
                url: '/repaymentahead',
                templateUrl: 'templates/my/repaymentahead.html',
                controller: 'RepaymentaheadCtrl'
            })
            .state('repayment', {//还款
                url: '/repayment',
                templateUrl: 'templates/my/repayment.html',
                controller: 'RepaymentCtrl'
            })
            .state('usersetting', {//用户设置
                url: '/usersetting',
                templateUrl: 'templates/my/usersetting.html',
                controller: 'UsersettingCtrl'
            })
            .state('mobilemange', {//绑定手机
                url: '/mobilemange',
                templateUrl: 'templates/my/mobilemange.html',
                controller: 'MobilemangeCtrl'
            })
            .state('updatemobile', {//修改绑定手机
                url: '/updatemobile',
                templateUrl: 'templates/my/updatemobile.html',
                controller: 'UpdatemobileCtrl'
            })
            .state('forgetpass', {//忘记密码／忘记交易密码
                url: '/forgetpass?type',  //type: 1.忘记登陆密码，2，忘记支付密码
                templateUrl: 'templates/my/forgetpass.html',
                controller: 'ForgetpassCtrl'
            })
            .state('updatepass', {//修改密码／交易密码
                url: '/updatepass?type',  //type:1标识修改登陆密码，2标识修改支付密码
                templateUrl: 'templates/my/updatepass.html',
                controller: 'UpdatepassCtrl'
            })
            .state('bankcard', {//银行卡管理
                url: '/bankcard',
                cache: false,
                templateUrl: 'templates/my/bankcard.html',
                controller: 'BankcardCtrl'
            })
            .state('addbankcard', {//添加银行卡
                url: '/addbankcard',
                templateUrl: 'templates/my/addbankcard.html',
                controller: 'AddbankcardCtrl'
            })
            .state('contract', {//模版合同协议
                url: '/contract',
                templateUrl: 'templates/my/contract.html',
                controller: 'ContractCtrl'
            })
            .state('aboutus', {//关于我们
                url: '/aboutus',
                templateUrl: 'templates/my/aboutus.html',
                controller: 'AboutusCtrl'
            })
            .state('login', {//登录
                url: '/login',
                cache: false,
                templateUrl: 'templates/my/login.html',
                controller: 'LoginCtrl'
            })
            .state('password', {//密码
                url: '/password?mobile',
                cache: false,
                templateUrl: 'templates/my/password.html',
                controller: 'PasswordCtrl'
            })
            .state('register', {//注册
                url: '/register?mobile',
                templateUrl: 'templates/my/register.html',
                controller: 'RegisterCtrl'
            })
            .state('inviterewards', {//邀请奖励
                url: '/inviterewards',
                templateUrl: 'templates/my/inviterewards.html',
                controller: 'InviterewardsCtrl'
            })
            .state('historybill', {//历史账单
                url: '/historybill',
                templateUrl: 'templates/my/historybill.html',
                controller: 'HistorybillCtrl'
            })
            .state('historybilldetail', {//历史账单详情
                url: '/historybilldetail',
                templateUrl: 'templates/my/historybilldetail.html',
                controller: 'HistorybilldetailCtrl'
            })


        $urlRouterProvider.otherwise('/tab/borrow');
    })
    .directive('definedRadio',[function(){
        return {
            restrict: 'A',
            link: function(scope, elem, attr){
                var $radio = angular.element(elem[0].querySelectorAll('input'));
                angular.forEach($radio,function(obj,$index){
                    angular.element(obj).on('click',function(e){
                        var labelDom=angular.element(elem[0].querySelectorAll('.label_radio'));
                        angular.forEach(labelDom,function(labelObj,$i){
                            if($i == $index){
                                angular.element(labelObj).children('.icon').removeClass('ion-ios-circle-outline').addClass('ion-ios-circle-filled');
                            }else{
                                angular.element(labelObj).children('.icon').removeClass('ion-ios-circle-filled').addClass('ion-ios-circle-outline');
                            }
                        })
                    })
                })
            }
        }
    }]);
