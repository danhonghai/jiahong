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
                  type: "button-stable",
                  onTap: function(e) {
                      $state.go('login');
                  }
              }]
          });
      };
      if (sessionStorage.token) {
          //已登入
          Services.ionicLoading();
          var userInfosession = angular.fromJson(sessionStorage.token);
          var params = {
          }
          //获取用户信息
          Services.getData("A014", params).success(function(data) {
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
  .controller('HelpcenterCtrl', ['$scope','$ionicPopup','Services','$ionicLoading', function($scope,$ionicPopup,Services,$ionicLoading){
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
                    onTap: function(e) {
                        window.location.href = 'tel://400-4000-400';
                    }
                  },
              ]
          });
      };
      $scope.data = [{
          title:'常见问题标题1'
      },{
          title:'常见问题标题2'
      },{
          title:'常见问题标题3'
      },{
          title:'常见问题标题4'
      },{
          title:'常见问题标题6'
      },{
          title:'常见问题标题7'
      }];
      //获取数据
      $scope.queryList = function(params) {
          Services.ionicLoading();
          Services.getData("A001", params).success(function(data) {
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                  $scope.data = data.body.list ? data.body.list : [];

              }
          });
      };
  }])
  //常见问题
  .controller('HelpdetailCtrl', ['$scope','Services','$ionicLoading', function($scope,Services,$ionicLoading){
      console.log("HelpdetailCtrl");
  }])
  //在线留言
  .controller('OnlinemsgCtrl', ['$scope','Services','$ionicLoading', function($scope,Services,$ionicLoading){
      console.log("OnlinemsgCtrl");
      $scope.data = {};
      //提交数据
      $scope.submit = function() {
          if($scope.data.value == undefined){
              Services.ionicpopup('提示信息', "留言不能为空");
              return false;
          }
          Services.ionicLoading();
          Services.getData("A001", $scope.data).success(function(data) {
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                  Services.ionicpopup('提示信息', "您的留言已提交成功感谢您的支持");
              }
          });
      };
  }])
  //我的消息
  .controller('MymsgCtrl', ['$scope','Services','$ionicLoading', function($scope,Services,$ionicLoading){
      console.log("MymsgCtrl");
      $scope.data = [{
          title:'系统通知',
          date:'2017.05.13',
          content : '系统通知内容系统通知内容系统通知内容系统',
      },{
          title:'系统通知',
          date:'2017.05.13',
          content : '系统通知内容系统通知内容系统通知内容系统',
      },{
          title:'系统通知',
          date:'2017.05.13',
          content : '系统通知内容系统通知内容系统通知内容系统',
      },{
          title:'系统通知',
          date:'2017.05.13',
          content : '系统通知内容系统通知内容系统通知内容系统',
      },{
          title:'系统通知',
          date:'2017.05.13',
          content : '系统通知内容系统通知内容系统通知内容系统',
      }];
      $scope.moredata = true; //控制加载更多
      $scope.pageNumber = 0; //分页的第几页
      $scope.pageSize = 10; //分页一页显示几条
      var vm = [];
      var params = {
          pageNumber: $scope.pageNumber,
          pageSize: $scope.pageSize
      };

      //查询免息券信息
      $scope.queryList = function(params) {
          Services.ionicLoading();
          Services.getData("A001", params).success(function(data) {
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                 /* $scope.data = data.body.list ? data.body.list : [];
                  vm = $scope.data;*/
                  $scope.moredata = true;
              }
              if (data.body.totalPage == 1) {
                  $scope.moredata = true;
              } else {
                  $scope.moredata = false;
              }
              $scope.pageNumber = 0;
          })
          .finally(function() {
              // 停止广播ion-refresher
              $scope.$broadcast('scroll.refreshComplete');
          });
      };
      //下拉刷新
      $scope.doRefresh = function() {
          params = {
              pageNumber: $scope.pageNumber,
              pageSize: $scope.pageSize
          }
          $scope.queryList(params);

      };
      //上拉加载
      $scope.loadMore = function() {
          $scope.pageNumber += 1;
          console.log($scope.pageNumber);
          params.pageNumber = $scope.pageNumber;
          params.pageSize = $scope.pageSize;
          console.log(params);
          Services.getData("A001", params).success(function(data) {
              console.log(data);
              if (data.respHead.respCode == "000000") {
                  vm = vm.concat(data.body.list ? data.body.list : []);
                  $scope.data = vm;
                  if ($scope.pageNumber >= data.body.totalPage) {
                      $scope.moredata = true;
                  }
                  $scope.$broadcast('scroll.infiniteScrollComplete');
              }
              console.log($scope.financialData);
          }).error(function() {});
      };
  }])
  //免息券
  .controller('InterestfreeCtrl', ['$scope','Services','$ionicLoading', function($scope,Services,$ionicLoading){
      console.log("InterestfreeCtrl");
      $scope.tabs = [
        {name: "可使用",success: true},
        {name: "已使用",success: false}
      ];
      //切换tab
      $scope.clickTab = function(index){
          for (var i = 0, len = $scope.tabs.length; i < len; i++) {
              if(i == index){
                  $scope.tabs[i].success = true;
              }else{
                  $scope.tabs[i].success = false;
              }
          };
      };
      $scope.datas = [{
          title:'7日借款免息券',
          content : '可用于借款期限为1日的还款免息',
      },{
          title:'7日借款免息券',
          content : '可用于借款期限为1日的还款免息',
      },{
          title:'7日借款免息券',
          content : '可用于借款期限为1日的还款免息',
      },{
          title:'7日借款免息券',
          content : '可用于借款期限为1日的还款免息',
      },{
          title:'7日借款免息券',
          content : '可用于借款期限为1日的还款免息',
      }];
      $scope.moredata = false; //控制加载更多
      $scope.pageNumber = 0; //分页的第几页
      $scope.pageSize = 10; //分页一页显示几条
      var vm = [];
      var params = {
          pageNumber: $scope.pageNumber,
          pageSize: $scope.pageSize
      };

      //查询免息券信息
      $scope.queryList = function(params) {
          Services.ionicLoading();
          Services.getData("A001", params).success(function(data) {
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {
                 /* $scope.data = data.body.list ? data.body.list : [];
                  vm = $scope.data;*/
                  $scope.moredata = true;
              }
              if (data.body.totalPage == 1) {
                  $scope.moredata = true;
              } else {
                  $scope.moredata = false;
              }
              $scope.pageNumber = 0;
          })
          .finally(function() {
              // 停止广播ion-refresher
              $scope.$broadcast('scroll.refreshComplete');
          });
      };
      //下拉刷新
      $scope.doRefresh = function() {
          params = {
              pageNumber: $scope.pageNumber,
              pageSize: $scope.pageSize
          }
          $scope.queryList(params);

      };
      //上拉加载
      $scope.loadMore = function() {
          $scope.pageNumber += 1;
          console.log($scope.pageNumber);
          params.pageNumber = $scope.pageNumber;
          params.pageSize = $scope.pageSize;
          console.log(params);
          Services.getData("A001", params).success(function(data) {
              console.log(data);
              if (data.respHead.respCode == "000000") {
                  vm = vm.concat(data.body.list ? data.body.list : []);
                  $scope.data = vm;
                  if ($scope.pageNumber >= data.body.totalPage) {
                      $scope.moredata = true;
                  }
                  $scope.$broadcast('scroll.infiniteScrollComplete');
              }
              console.log($scope.financialData);
          }).error(function() {});
      };

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
      var params = {
      }
      //获取用户信息
      //Services.ionicLoading();
      Services.getData("A015", params).success(function(data) {
          //$ionicLoading.hide();
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
          sessionStorage.token = "";
          $state.go('login');
      }
  }])
  //设置手机号
  .controller('MobilemangeCtrl', ['$scope','Services','$ionicLoading','$rootScope','$ionicPopup','$state', function($scope,Services,$ionicLoading,$rootScope,$ionicPopup,$state){
      $scope.params = {};
      //获取手机验证码
      $scope.getphoneCode = function() {
          var codeparams = {
              mobile: $scope.params.mobile
          }
          if ($scope.params.phone) {
              Services.ionicLoading();
              Services.getData("A001", codeparams).success(function(data) {
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
                          type: "button-stable",
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
                          type: "button-stable",
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
  //忘记登录密码，忘记支付密码
  .controller('ForgetpassCtrl', ['$scope','Services','$ionicLoading','$ionicPopup','$state','$rootScope', function($scope,Services,$ionicLoading,$ionicPopup,$state,$rootScope){
      var type = $state.params.type;
      var tempId = type==1? "2":"3";
      $scope.params = {
          type: type,
          tempId: tempId
      };
      $scope.repassword = "";
      //获取手机验证码
      $scope.getphoneCode = function() {
          var codeparams = {
              mobile: $scope.params.mobile,
              tempId: tempId    //1.注册，2.忘记密登陆密码，3，忘记支付密码,
          };
          if ($scope.params.mobile) {
              Services.ionicLoading();
              Services.getData("sendsms", codeparams).success(function(data) {
                  $ionicLoading.hide();
                  if (data.code == 0) {
                      $rootScope.timer(60, "#sendButton_pass");
                      //Services.ionicpopup('发送成功', "验证码发送成功！");
                  } else {
                      Services.ionicpopup('提示信息', data.msg);
                  }
              });
          } else {
              Services.ionicpopup('发送失败', "请输入手机号");
          }
      };
      //忘记密码
      $scope.forgetpass = function(){
          Services.ionicLoading();
          Services.getData("forgetpwd",$scope.params).success(function(data){
              $ionicLoading.hide();
              if (data.code == 0) {
                  $ionicPopup.show({
                      template: "提示信息",
                      title: "修改成功",
                      scope: $scope,
                      buttons: [{
                          text: "确定",
                          type: "button-stable",
                          onTap: function(e) {
                              $state.go('usersetting');
                          }
                      }]
                  })
                  .then(function(res) {
                      //按钮回调
                  });
              }else {
                  Services.ionicpopup('提示信息', data.msg);
              }

          });
      };
  }])
  //修改密码
  .controller('UpdatepassCtrl', ['$scope','Services','$ionicLoading','$ionicPopup','$state',  function($scope,Services,$ionicLoading,$ionicPopup,$state){
      var type = $state.params.type;
      $scope.params = {
          type: type
      };
      $scope.repassword = "";
      //修改密码
      $scope.updatepass = function(){
          Services.ionicLoading();
          Services.getData("updatepwd",$scope.params).success(function(data){
              $ionicLoading.hide();
              if (data.code == 0) {
                  $ionicPopup.show({
                      template: "提示信息",
                      title: "修改成功",
                      scope: $scope,
                      buttons: [{
                          text: "确定",
                          type: "button-stable",
                          onTap: function(e) {
                              $state.go('usersetting');
                          }
                      }]
                  })
                  .then(function(res) {
                      //按钮回调
                  });
              }else {
                  Services.ionicpopup('提示信息', data.msg);
              }
          });
      };
      //忘记密码跳转
      $scope.forgetpass = function(){
          $state.go("forgetpass",{type:$state.params.type});
      }
  }])
  //银行卡管理
  .controller('BankcardCtrl', ['$scope','Services','$ionicLoading','$ionicPopup', function($scope,Services,$ionicLoading,$ionicPopup){

      //查询银行卡信息
      $scope.queryBankList = function(){
          var userInfosession = angular.fromJson(sessionStorage.userInfo);
          var params = {}
          Services.ionicLoading();
          Services.getData("A086", params).success(function(data){
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
                          type: "button-stable",
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
                          type: "button-stable",
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
                          type: "button-stable",
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
          console.log($scope.params);
          Services.ionicLoading();
          Services.getData("vaildtel",$scope.params).success(function(data){
              $ionicLoading.hide();
              if (data.code == 0) {
                  $state.go('password',$scope.params);
              }else if(data.code == -1){
                  $state.go('register',$scope.params);
              }else{
                  Services.ionicpopup('提示信息', data.msg);
              }

          });
      };
  }])
  //输入密码
  .controller('PasswordCtrl', ['$scope','$state','Services','$ionicLoading', function($scope,$state,Services,$ionicLoading){
      //登录输入密码
      $scope.params = {};
      $scope.params.mobile = $state.params.mobile;
      $scope.login = function(){
          Services.ionicLoading();
          Services.getData("login",$scope.params).success(function(data){
              $ionicLoading.hide();
              if (data.code == 0) {
                  sessionStorage.token = angular.toJson(data.data.token);
                  $state.go('tab.my');
              }else{
                  Services.ionicpopup('提示信息', data.msg);
              }

          });
      };
  }])
  //注册
  .controller('RegisterCtrl', ['$scope','$rootScope','$state','Services','$ionicLoading','$ionicPopup', function($scope,$rootScope,$state,Services,$ionicLoading,$ionicPopup){

      $scope.params = {
          tempId:1,
          mobile:$state.params.mobile  //获取地址栏参数
      };
      $scope.repassword = "";//重复密码
      $scope.protocol = true; //是否勾选
      //获取手机验证码
      $scope.getphoneCode = function() {
          var codeparams = {
              mobile: $scope.params.mobile,
              tempId:1    //1.注册，2.忘记密登陆密码，3，忘记支付密码,
          }
          if ($scope.params.mobile) {
              Services.ionicLoading();
              Services.getData("sendsms", codeparams).success(function(data) {
                  $ionicLoading.hide();
                  if (data.code == 0) {
                      $rootScope.timer(60, "#sendButton_reg");
                      //Services.ionicpopup('发送成功', "验证码发送成功！");
                  } else {
                      Services.ionicpopup('提示信息', data.msg);
                  }
              });
          } else {
              Services.ionicpopup('发送失败', "请输入手机号");
          }
      };
      //注册
      $scope.register = function(){
          if(!$scope.protocol){
              Services.ionicpopup('提示信息', "请勾选协议");
              return false;
          };
          Services.ionicLoading();
          Services.getData("register",$scope.params).success(function(data){
              $ionicLoading.hide();
              if (data.code == 0) {
                  //用户信息
                  sessionStorage.token = angular.toJson(data.data.token);
                  $ionicPopup.show({
                      template: "感谢您的注册！",
                      title: "注册成功",
                      scope: $scope,
                      buttons: [{
                          text: "确定",
                          type: "button-stable",
                          onTap: function(e) {
                              $state.go('tab.my');
                          }
                      }]
                  })
                  .then(function(res) {
                      //按钮回调
                  });
              }else {
                  Services.ionicpopup('注册失败', data.msg);
              }

          });
      };
  }])
  //借款记录
  .controller('LoanlistCtrl', ['$scope','$ionicPopup','Services','$ionicLoading', function($scope,$ionicPopup,Services,$ionicLoading){
      console.log("LoanlistCtrl");
      $scope.tabs = [
          {name: "进行中",success: true},
          {name: "已完结",success: false}
      ];
      //切换tab
      $scope.clickTab = function(index){
          for (var i = 0, len = $scope.tabs.length; i < len; i++) {
              if(i == index){
                  $scope.tabs[i].success = true;
              }else{
                  $scope.tabs[i].success = false;
              }
          };
      };
      $scope.loanData = {
          loan:'10000.00',
          loanNum : 999999.99,
          accural : 999999.89,
          loanDate :' 2017.05.30',
          state : '还款中／预期'
      };
      //查询借款信息
      $scope.queryLoan = function(){
          Services.ionicLoading();
          var params = {};
          Services.getData("A001", params).success(function(data) {
              $ionicLoading.hide();
              if (data.respHead.respCode == "000000") {

              } else {
                  Services.ionicpopup('提示信息', data.respHead.respMsg);
              }
          });
      };
      //還款和提前還款
      $scope.doRepay = function(){
          //成功：loanDialogOK；失败: loanDialogFail
          var repayClass = "loanDialogOK";
          $ionicPopup.show({
              title:'<div class='+repayClass+'>还款成功</div>',
              scope: $scope,
              buttons: [{
                  text: "确定",
                  type:'button-light',
                  onTap: function(e) {
                  }
              }]
            });
          var element = angular.element(".popup-head").css({padding: '0'});
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

