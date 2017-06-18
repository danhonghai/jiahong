angular.module('my.controllers', [])
  .controller('MyCtrl', ['$scope', function($scope){
      console.log("MyCtrl");
  }])
  .controller('HelpcenterCtrl', ['$scope','$ionicPopup', function($scope,$ionicPopup){
      console.log("HelpcenterCtrl");
      var myModal;
      $scope.showModal = function() {
           // 自定义弹窗
          myModal = $ionicPopup.show({
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
      $scope.closeModal = function(){
          myModal.close();
      }
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
  .controller('UsersettingCtrl', ['$scope', function($scope){
      console.log("UsersettingCtrl");
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
