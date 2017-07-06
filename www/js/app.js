angular.module('starter', ['ionic', 'borrow.controllers', 'authenticate.controllers', 'my.controllers', 'free.controllers'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
        var online = onlinenetwork({
            "time": 1000,
            "url": ""
        })
        online.onLineHandler(function() {})
        online.offLineHandler(function() {
            $rootScope.stateonline = true;
        })
    })
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
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
        $ionicConfigProvider.scrolling.jsScrolling(true);
        //ionic路由
        $stateProvider
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tab.borrow',{//借款
              url:'/borrow',
              views:{
                  'tab-borrow':{
                      templateUrl:'templates/borrow/tab_borrow.html',
                      controller:'BorrowCtrl'
                  }
              }
            })
            .state('loan', {
                url: '/loan',
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
            .state('tab.my',{//我的
              url:'/my',
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
                url: '/helpdetail?id',
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
                templateUrl: 'templates/my/mymsg.html',
                controller: 'MymsgCtrl'
            })
            .state('interestfree', {//免息券
                url: '/interestfree',
                templateUrl: 'templates/my/interestfree.html',
                controller: 'InterestfreeCtrl'
            })
            .state('loanlist', {//借款记录
                url: '/loanlist',
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
                url: '/forgetpass',
                templateUrl: 'templates/my/forgetpass.html',
                controller: 'ForgetpassCtrl'
            })
            .state('updatepass', {//修改密码／交易密码
                url: '/updatepass',
                templateUrl: 'templates/my/updatepass.html',
                controller: 'UpdatepassCtrl'
            })
            .state('bankcard', {//银行卡管理
                url: '/bankcard',
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
                templateUrl: 'templates/my/login.html',
                controller: 'LoginCtrl'
            })
            .state('password', {//密码
                url: '/password',
                templateUrl: 'templates/my/password.html',
                controller: 'PasswordCtrl'
            })
            .state('register', {//注册
                url: '/register',
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


        $urlRouterProvider.otherwise('/tab/my');
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
