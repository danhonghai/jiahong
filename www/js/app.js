angular.module('starter', ['ionic', 'borrow.controllers', 'authenticate.controllers', 'my.controllers'])
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
        .state('bankmange', {//银行卡
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

    $urlRouterProvider.otherwise('/tab/borrow');
});
