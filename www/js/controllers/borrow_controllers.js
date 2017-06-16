angular.module('borrow.controllers', [])
  .controller('BorrowCtrl', ['$scope','$timeout', function($scope,$timeout){
      console.log("BorrowCtrl");


      $timeout(function(){
          var swiper = new Swiper('.swiper-container', {
              pagination: '.swiper-pagination',
              paginationClickable: true,
              autoHeight: true, //enable auto height
              autoplay: 2000,
              speed:500,
              autoplayDisableOnInteraction: false,
              loop: true
          });
      },1000);

  }])
  .controller('LoanCtrl', ['$scope','$timeout','$ionicPopup', function($scope,$timeout,$ionicPopup){
      console.log("LoanCtrl");
      var myModal;
      $scope.showModal = function() {
           // 自定义弹窗
          myModal = $ionicPopup.show({
              templateUrl: 'templates/loan_modal.html',
              title: '综合费用',
              scope: $scope
          });
      };
      $scope.closeModal = function(){
          myModal.close();
      }
  }])
