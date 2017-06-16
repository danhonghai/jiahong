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
