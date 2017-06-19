angular.module('my.controllers', [])
  .controller('MyCtrl', ['$scope', function($scope){
      console.log("MyCtrl");
  }])
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
  .controller('HelpdetailCtrl', ['$scope', function($scope){
      console.log("HelpdetailCtrl");
  }])
  .controller('OnlinemsgCtrl', ['$scope', function($scope){
      console.log("OnlinemsgCtrl");
  }])
  .controller('MymsgCtrl', ['$scope', function($scope){
      console.log("MymsgCtrl");
  }])
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
  .controller('UsersettingCtrl', ['$scope','$ionicActionSheet', function($scope,$ionicActionSheet){
      console.log("UsersettingCtrl");
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
  }])
  .controller('MobilemangeCtrl', ['$scope', function($scope){
      console.log("MobilemangeCtrl");
  }])
  .controller('UpdatemobileCtrl', ['$scope', function($scope){
      console.log("UpdatemobileCtrl");
  }])
  .controller('ForgetpassCtrl', ['$scope', function($scope){
      console.log("ForgetpassCtrl");
  }])
  .controller('UpdatepassCtrl', ['$scope', function($scope){
      console.log("UpdatepassCtrl");
  }])
  .controller('BankcardCtrl', ['$scope', function($scope){
      console.log("BankcardCtrl");
  }])
  .controller('AddbankcardCtrl', ['$scope', function($scope){
      console.log("AddbankcardCtrl");
  }])
  .controller('ContractCtrl', ['$scope', function($scope){
      console.log("ContractCtrl");
  }])
  .controller('AboutusCtrl', ['$scope', function($scope){
      console.log("AboutusCtrl");
  }])
  .controller('LoginCtrl', ['$scope', function($scope){
      console.log("LoginCtrl");
  }])
  .controller('PasswordCtrl', ['$scope', function($scope){
      console.log("PasswordCtrl");
  }])
  .controller('RegisterCtrl', ['$scope', function($scope){
      console.log("RegisterCtrl");
  }])
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
  .controller('RepaymentaheadCtrl', ['$scope','$ionicPopup','$state', function($scope,$ionicPopup,$state){
      console.log("RepaymentaheadCtrl");
      $scope.showModal = function() {
           // 自定义弹窗
          var myModal = $ionicPopup.show({
              template: "<div class='cff7d2e font-size24 text-center'>400-400-4000</div>",
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
                    }
                  },
              ]
          });
      };
  }])
  .controller('RepaymentCtrl', ['$scope', function($scope){
      console.log("RepaymentCtrl");
  }])

