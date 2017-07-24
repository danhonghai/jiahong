angular.module('my.controllers', [])
  //我的
  .controller('MyCtrl', ['$scope','$ionicPopup','Services','$ionicHistory','$ionicLoading','$state', function($scope,$ionicPopup,Services,$ionicHistory,$ionicLoading,$state){
      $scope.showShare = function() {
          $scope.optionsPopup = $ionicPopup.show({
              template: "您未登入，是否立即登入",
              title: "温馨提示",
              scope: $scope,
              buttons: [{
                  text: "返回",
                  onTap: function(e) {
                      $ionicHistory.goBack();
                  }
              }, {
                  text: "立即登入",
                  type: "button-positive",
                  onTap: function(e) {
                      $state.go('login');
                  }
              }]
          });
      };
      if (sessionStorage.userInfo) {
          //已登入
          Services.ionicLoading();
          var userInfosession = angular.fromJson(sessionStorage.userInfo);
          var parameterObj = {
          }
              //获取用户信息
          Services.getData("A014", parameterObj).success(function(data) {
              $ionicLoading.hide();
              console.log(data);
              //$scope.userInfosession = data.body;
              $scope.userInfosession = {
                  payAmount : '999999.99',
                  payDate : '2017.06.30',
                  phone: '18356421234',
                  headImg: '',
                  msgNum: '2'
              };
          });
      } else {
          $scope.showShare();
      }
      // $scope.$on("$ionicView.unloaded", function() {
      //     if ($scope.optionsPopup) {
      //         $scope.optionsPopup.close();
      //     }
      // });
  }])
  //帮助中心
  .controller('HelpcenterCtrl', ['$scope','$ionicPopup', function($scope,$ionicPopup){
      console.log("HelpcenterCtrl");
      $scope.showModal = function() {
           // 自定义弹窗
          var myModal = $ionicPopup.show({
              template: "<div class='cff7d2e font-size24 text-center'>400-400-4000</div>",
              title: '全国统一客服',
              subTitle: '（周一至周五 8:30~19:00）',
              scope: $scope,
              buttons: [
                  { text: '<span class="cs9">取消</span>' },
                  {
                    text: '呼叫',
                    type:'borleft',
                    onTap: function(e) {
                        window.location.href = 'tel://400-4000-400';
                    }
                  },
              ]
          });
      };
  }])
  //常见问题
  .controller('HelpdetailCtrl', ['$scope', function($scope){
      console.log("HelpdetailCtrl");
  }])
  //在线留言
  .controller('OnlinemsgCtrl', ['$scope', function($scope){
      console.log("OnlinemsgCtrl");
  }])
  //我的消息
  .controller('MymsgCtrl', ['$scope', function($scope){
      console.log("MymsgCtrl");
  }])
  //免息券
  .controller('InterestfreeCtrl', ['$scope', function($scope){
      console.log("InterestfreeCtrl");
      $scope.tabs = [
        {name: "可使用",success: true},
        {name: "已使用",success: false}
      ];

      $scope.clickTab = function(index){
          for (var i = 0, len = $scope.tabs.length; i < len; i++) {
              if(i == index){
                  $scope.tabs[i].success = true;
              }else{
                  $scope.tabs[i].success = false;
              }
          };
      }
  }])
  //个人信息设置
  .controller('UsersettingCtrl', ['$scope','$ionicActionSheet','Services','$ionicLoading','$state', function($scope,$ionicActionSheet,Services,$ionicLoading,$state){
      $scope.bindBankArray = [{
          "text" : "未绑定",
          "color" : "#999"
      },{
          "text" : "已绑定",
          "color" : "#444"
      }];
      var userInfosession = angular.fromJson(sessionStorage.userInfo);
      var parameterObj = {
      }
      //获取用户信息
      Services.ionicLoading();
      Services.getData("A015", parameterObj).success(function(data) {
          $ionicLoading.hide();
          console.log(data);
          //$scope.userUserInfoData = data.body;
          $scope.userUserInfoData = {
              headImg: '',
              isbindBank : false
          };
          if($scope.userUserInfoData.isbindBank){
              $scope.bandBank = $scope.bindBankArray[1];
          }else{
              $scope.bandBank = $scope.bindBankArray[0];
          };
      });
      // 点击按钮触发，或一些其他的触发条件
      $scope.show = function() {
          // 显示操作表
          $ionicActionSheet.show({
              buttons: [
                  { text: '拍照' },
                  { text: '从相册选择' },
              ],
              cancelText: '取消',
              buttonClicked: function(index) {
                  return true;
              }
          });
      };
      //退出登录
      $scope.loginOut = function(){
          sessionStorage.userInfo = "";
          $state.go('login');
      }
  }])
  //设置手机号
  .controller('MobilemangeCtrl', ['$scope','Services','$ionicLoading','$rootScope','$ionicPopup','$state', function($scope,Services,$ionicLoading,$rootScope,$ionicPopup,$state){
      $scope.params = {};
      //获取手机验证码
      $scope.getphoneCode = function() {
          var codeparameterObj = {
              mobileNo: $scope.params.phone
          }
          if ($scope.params.phone) {
              Services.ionicLoading();
              Services.getData("A001", codeparameterObj).success(function(data) {
                  $ionicLoading.hide();
                  if (data.respHead.respCode == "000000") {
                      $rootScope.timer(60, "#sendButton_mobile");
                      //Services.ionicpopup('发送成功', "验证码发送成功！");
                  } else {
                      Services.ionicpopup('发送失败', "验证码发送失败，请重试！");
                  }
              });
          } else {
              Services.ionicpopup('发送失败', "请输入手机号");
          }
      };
      //修改手机号
      $scope.setMobile = function(){
          console.log($scope.params);
          Services.ionicLoading();
          Services.getData("A201",$scope.params).success(function(data){
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                  $ionicPopup.show({
                      template: "提示信息",
                      title: "修改成功",
                      scope: $scope,
                      buttons: [{
                          text: "确定",
                          type: "button-positive",
                          onTap: function(e) {
                              $state.go('usersetting');
                          }
                      }]
                  })
                  .then(function(res) {
                      //按钮回调
                  });
              }else {
                  Services.ionicpopup('提示信息', data.respHead.respMsg);
              }

          });
      };
  }])
  //修改绑定手机号
  .controller('UpdatemobileCtrl', ['$scope','Services','$ionicLoading','$ionicPopup','$state', function($scope,Services,$ionicLoading,$ionicPopup,$state){
      $scope.params = {};
      //修改密码
      $scope.updatepass = function(){
          console.log($scope.params);
          Services.ionicLoading();
          Services.getData("A201",$scope.params).success(function(data){
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                  $ionicPopup.show({
                      template: "提示信息",
                      title: "修改成功",
                      scope: $scope,
                      buttons: [{
                          text: "确定",
                          type: "button-positive",
                          onTap: function(e) {
                              $state.go('usersetting');
                          }
                      }]
                  })
                  .then(function(res) {
                      //按钮回调
                  });
              }else {
                  Services.ionicpopup('提示信息', data.respHead.respMsg);
              }
          });
      };
  }])
  //忘记密码
  .controller('ForgetpassCtrl', ['$scope','Services','$ionicLoading','$ionicPopup','$state','$rootScope', function($scope,Services,$ionicLoading,$ionicPopup,$state,$rootScope){
      $scope.params = {};
      $scope.params.phone = $state.params.phone;
      //获取手机验证码
      $scope.getphoneCode = function() {
          var codeparameterObj = {
              mobileNo: $scope.params.phone
          }
          if ($scope.params.phone) {
              Services.ionicLoading();
              Services.getData("A001", codeparameterObj).success(function(data) {
                  $ionicLoading.hide();
                  if (data.respHead.respCode == "000000") {
                      $rootScope.timer(60, "#sendButton_pass");
                      //Services.ionicpopup('发送成功', "验证码发送成功！");
                  } else {
                      Services.ionicpopup('发送失败', "验证码发送失败，请重试！");
                  }
              });
          } else {
              Services.ionicpopup('发送失败', "请输入手机号");
          }
      };
      //忘记密码
      $scope.forgetpass = function(){
          console.log($scope.params);
          Services.ionicLoading();
          Services.getData("A201",$scope.params).success(function(data){
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                  //用户信息
                  sessionStorage.userInfo = angular.toJson(data.body);
                  $ionicPopup.show({
                      template: "提示信息",
                      title: "修改成功",
                      scope: $scope,
                      buttons: [{
                          text: "确定",
                          type: "button-positive",
                          onTap: function(e) {
                              $state.go('usersetting');
                          }
                      }]
                  })
                  .then(function(res) {
                      //按钮回调
                  });
              }else {
                  Services.ionicpopup('提示信息', data.respHead.respMsg);
              }

          });
      };
  }])
  //修改密码
  .controller('UpdatepassCtrl', ['$scope','Services','$ionicLoading','$ionicPopup','$state',  function($scope,Services,$ionicLoading,$ionicPopup,$state){
      $scope.params = {};
      //修改密码
      $scope.updatepass = function(){
          console.log($scope.params);
          Services.ionicLoading();
          Services.getData("A201",$scope.params).success(function(data){
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                  $ionicPopup.show({
                      template: "提示信息",
                      title: "修改成功",
                      scope: $scope,
                      buttons: [{
                          text: "确定",
                          type: "button-positive",
                          onTap: function(e) {
                              $state.go('usersetting');
                          }
                      }]
                  })
                  .then(function(res) {
                      //按钮回调
                  });
              }else {
                  Services.ionicpopup('提示信息', data.respHead.respMsg);
              }
          });
      };
  }])
  //银行卡管理
  .controller('BankcardCtrl', ['$scope','Services','$ionicLoading','$ionicPopup', function($scope,Services,$ionicLoading,$ionicPopup){

      //查询银行卡信息
      $scope.queryBankList = function(){
          var userInfosession = angular.fromJson(sessionStorage.userInfo);
          var parameterObj = {}
          Services.ionicLoading();
          Services.getData("A086", parameterObj).success(function(data){
              console.log(data);
              $ionicLoading.hide();
              if(data.respHead.respCode == "000000"){
                  //$scope.bankList = data.body;
                  $scope.bankList = [{
                      bankId:"1",
                      bankIcon:"img/icon_gsyh.png",
                      bankName:"中国工商银行",
                      cardNo:"6212261202025854236",
                      isdefault:true
                  },{
                      bankId:"2",
                      bankIcon:"img/icon_gsyh.png",
                      bankName:"中国工商银行",
                      cardNo:"6212261202025854578",
                      isdefault:false
                  },{
                      bankId:"3",
                      bankIcon:"img/icon_gsyh.png",
                      bankName:"中国工商银行",
                      cardNo:"6212261202025853654",
                      isdefault:false
                  }];
              }
          });
      };
      $scope.queryBankList();
      //设为默认
      $scope.setDefault = function(id){
          var params = {"bankId":id};
          Services.ionicLoading();
          Services.getData("A201",params).success(function(data){
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                  $ionicPopup.show({
                      template: "修改成功",
                      title: "提示信息",
                      scope: $scope,
                      buttons: [{
                          text: "确定",
                          type: "button-positive",
                          onTap: function(e) {
                              $scope.queryBankList();
                          }
                      }]
                  })
                  .then(function(res) {
                      //按钮回调
                  });
              }else {
                  Services.ionicpopup('提示信息', data.respHead.respMsg);
              }
          });
      };
      //删除银行卡
      $scope.delBank = function(id){
          var params = {"bankId":id};
          Services.ionicLoading();
          Services.getData("A201",params).success(function(data){
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                  $ionicPopup.show({
                      template: "删除成功",
                      title: "提示信息",
                      scope: $scope,
                      buttons: [{
                          text: "确定",
                          type: "button-positive",
                          onTap: function(e) {
                              $scope.queryBankList();
                          }
                      }]
                  })
                  .then(function(res) {
                      //按钮回调
                  });
              }else {
                  Services.ionicpopup('提示信息', data.respHead.respMsg);
              }
          });
      };
  }])
  //添加银行卡
  .controller('AddbankcardCtrl', ['$scope','Services','$ionicLoading','$ionicPopup','$state', function($scope,Services,$ionicLoading,$ionicPopup,$state){
      $scope.params = {};
      //查询开户行
      Services.getData("A086").success(function(data){
          if(data.respHead.respCode == "000000"){
              //$scope.bankAll = data.body;
              $scope.bankAll = [{
                  bankId:"1",
                  bankName:"中国工商银行"
              },{
                  bankId:"2",
                  bankName:"中国农业银行"
              },{
                  bankId:"3",
                  bankName:"中国建设银行"
              }];
          }
      });
      //添加银行卡
      $scope.addCard = function(){
          Services.ionicLoading();
          Services.getData("A201",$scope.params).success(function(data){
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                  $ionicPopup.show({
                      template: "添加成功",
                      title: "提示信息",
                      scope: $scope,
                      buttons: [{
                          text: "确定",
                          type: "button-positive",
                          onTap: function(e) {
                              $state.go('bankcard');
                          }
                      }]
                  })
                  .then(function(res) {
                      //按钮回调
                  });
              }else {
                  Services.ionicpopup('提示信息', data.respHead.respMsg);
              }
          });
      };
  }])
  //模板合同协议
  .controller('ContractCtrl', ['$scope', function($scope){
      console.log("ContractCtrl");
  }])
  //关于我们
  .controller('AboutusCtrl', ['$scope', function($scope){
      console.log("AboutusCtrl");
  }])
  //登录
  .controller('LoginCtrl', ['$scope','$state','Services','$ionicLoading', function($scope,$state,Services,$ionicLoading){
      //登录输入手机号
      $scope.params = {};
      $scope.loginSubmit = function(){
          console.log($scope.params.phone);
          Services.ionicLoading();
          Services.getData("A201",$scope.params).success(function(data){
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                  if (data.body.register == true) {
                    $state.go('password',$scope.params);
                  }else{
                    $state.go('register',$scope.params);
                  }
              }

          });
      };
  }])
  //输入密码
  .controller('PasswordCtrl', ['$scope','$state','Services','$ionicLoading', function($scope,$state,Services,$ionicLoading){
      //登录输入密码
      $scope.params = {};
      $scope.params.phone = $state.params.phone;
      $scope.login = function(){
          console.log($scope.params);
          Services.ionicLoading();
          Services.getData("A201",$scope.params).success(function(data){
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                  sessionStorage.userInfo = angular.toJson(data.body);
                  $state.go('tab.my');
              }

          });
      };
  }])
  //注册
  .controller('RegisterCtrl', ['$scope','$rootScope','$state','Services','$ionicLoading','$ionicPopup', function($scope,$rootScope,$state,Services,$ionicLoading,$ionicPopup){

      $scope.params = {};
      $scope.params.phone = $state.params.phone;
      //获取手机验证码
      $scope.getphoneCode = function() {
          var codeparameterObj = {
              mobileNo: $scope.params.phone
          }
          if ($scope.params.phone) {
              Services.ionicLoading();
              Services.getData("A001", codeparameterObj).success(function(data) {
                  $ionicLoading.hide();
                  if (data.respHead.respCode == "000000") {
                      $rootScope.timer(60, "#sendButton_reg");
                      //Services.ionicpopup('发送成功', "验证码发送成功！");
                  } else {
                      Services.ionicpopup('发送失败', "验证码发送失败，请重试！");
                  }
              });
          } else {
              Services.ionicpopup('发送失败', "请输入手机号");
          }
      };
      //注册
      $scope.register = function(){
          console.log($scope.params);
          Services.ionicLoading();
          Services.getData("A201",$scope.params).success(function(data){
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                  //用户信息
                  sessionStorage.userInfo = angular.toJson(data.body);
                  $ionicPopup.show({
                      template: "感谢您的注册！",
                      title: "注册成功",
                      scope: $scope,
                      buttons: [{
                          text: "确定",
                          type: "button-positive",
                          onTap: function(e) {
                              $state.go('tab.my');
                          }
                      }]
                  })
                  .then(function(res) {
                      //按钮回调
                  });
              }else {
                  Services.ionicpopup('注册失败', data.respHead.respMsg);
              }

          });
      };
  }])
  //借款记录
  .controller('LoanlistCtrl', ['$scope', function($scope){
      console.log("LoanlistCtrl");
      $scope.tabs = [
        {name: "进行中",success: true},
        {name: "已完结",success: false}
      ];

      $scope.clickTab = function(index){
          for (var i = 0, len = $scope.tabs.length; i < len; i++) {
              if(i == index){
                  $scope.tabs[i].success = true;
              }else{
                  $scope.tabs[i].success = false;
              }
          };
      }
  }])
  //提前还款
  .controller('RepaymentaheadCtrl', ['$scope','$ionicPopup','$state', function($scope,$ionicPopup,$state){
      console.log("RepaymentaheadCtrl");
      $scope.showModal = function() {
           // 自定义弹窗
          var myModal = $ionicPopup.show({
              templateUrl: "templates/pass_modal.html",
              title: '请输入交易密码',
              scope: $scope,
              buttons: [
                  {
                    text: '忘记密码',
                    onTap: function(e) {
                      $state.go("forgetpass");
                    }
                  },
                  {
                    text: '确定',
                    type:'borleft c0099ff',
                    onTap: function(e) {
                        myModal.close();
                    }
                  },
              ]
          });
      };
  }])
  //还款
  .controller('RepaymentCtrl', ['$scope','$ionicPopup','$state', function($scope,$ionicPopup,$state){
      console.log("RepaymentCtrl");
  }])
  //邀请记录
  .controller('InviterewardsCtrl', ['$scope', function($scope){
      console.log("InviterewardsCtrl");
  }])
  //历史账单
  .controller('HistorybillCtrl', ['$scope', function($scope){
      console.log("HistorybillCtrl");
  }])
  //历史账单详情
  .controller('HistorybilldetailCtrl', ['$scope', function($scope){
      console.log("HistorybilldetailCtrl");
  }])

