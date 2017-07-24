angular.module('borrow.controllers', [])
  .controller('BorrowCtrl', ['$scope','$timeout','Services','$ionicPopup', function($scope,$timeout,Services,$ionicPopup){
      console.log("BorrowCtrl");
      $scope.showShare = function() {
          $scope.optionsPopup = $ionicPopup.show({
              title:'<div><p class="cb00000 font-size24">不在服务区域内</p><p class="cs9">本产品目前只向位于江、浙、沪地区的借款人发放借款，其他区域暂不可用</p></div>',
              /*template: '本产品目前只向位于江、浙、沪地区的借款人发放借款，其他区域暂不可用',
              title: '<span class="cb00000">不在服务区域内</span>',*/
              scope: $scope,
              buttons: [{
                  text: "确定",
                  type:'button-light',
                  onTap: function(e) {
                      //禁用立即借款按钮
                  }
              }]
          });
      };
      $scope.showShare();
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
  .controller('LoanCtrl', ['$scope','$timeout','$ionicPopup','$state', function($scope,$timeout,$ionicPopup,$state){
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
      };
      $scope.loanClick = function() {
           // 自定义弹窗
          var loanModal = $ionicPopup.show({
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
                    type:'c0099ff',
                    onTap: function(e) {
                        loanModal.close();
                        $scope.loanOk()
                    }
                  },
              ]
          });
      };
      $scope.loanOk = function() {
          var loanOk = $ionicPopup.show({
              title:'<div class="row loanOk"><div class="col col-33"><img src="img/icon_ok.png"></div><div class="col"><p class="title">借款成功</p>'+
                        '<p class="cs9 loanInfo">你申请的借款<span>5000</span>元，将转入您所绑定的银行卡。转账需等待一段时间。</p></div></div>',
              // template: '<div class="row loanOk"><div class="col col-33"><img src="img/icon_ok.png"></div><div class="col"><p class="title">借款成功</p>'+
              //           '<p class="cs9">你申请的借款<span>5000</span>元，将转入您所绑定的银行卡。转账需等待一段时间。</p></div></div>',
              scope: $scope,
              buttons: [{
                  text: "确定",
                  type:'button-light',
                  onTap: function(e) {
                      //禁用立即借款按钮
                  }
              }]
          });
          var element = angular.element(".popup-head").css({padding: '10px 5px'});
      };
  }])
  //6位密码输入框
  .directive('passForm', function($http){
      return {
        restrict: 'EA',
        link: function(scope, ele, attr){
          var inputDom=angular.element(ele[0].querySelector('.Jpass'));//密码框
          var spanDoms=ele.find('span');//光标span
          var faguang=angular.element(ele[0].querySelector('.Jfaguang'));//发光外框
          var that=this;
          inputDom.on('focus blur keyup', function(e){
            e=e? e : window.event;
            e.stopPropagation();
            if(e.type==='focus'){
              var _currFocusInputLen=this.value.length===6? 5 : this.value.length;
              //spanDoms.eq(_currFocusInputLen).addClass('active');
              faguang.css({left: _currFocusInputLen * 36+'px', opacity: 1});
            }else if(e.type==='blur'){
              var _currBlurInputLen = this.value.length;
              //spanDoms.eq(_currBlurInputLen).removeClass('active');
              faguang.css({opacity: 0});
            }else if(e.type==='keyup'){
              //键盘上的数字键按下才可以输入
              if(e.keyCode == 8 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)){
                var curInputLen = this.value.length;//输入的文本内容长度
                for (var j = 0; j < 6; j++) {
                  //spanDoms.eq(j).removeClass('active');
                  //spanDoms.eq(curInputLen).addClass('active');
                  spanDoms.eq(curInputLen - 1).next().find('i').css({backgroundColor: 'transparent'});
                  spanDoms.eq(curInputLen - 1).find('i').css({backgroundColor: '#000'});
                  faguang.css({
                    left: curInputLen * 36 + 'px'
                  });
                }
                if (curInputLen === 0) {
                  spanDoms.find('i').css({backgroundColor: 'transparent'});
                }
                if (curInputLen === 6) {
                  //spanDoms.eq(5).addClass('active');
                  faguang.css({
                    left: '375px'
                  });
                  //直接发起密码验证
                  var doSubmitCallback=function(){
                    scope.pass='';
                    spanDoms.find('i').css({backgroundColor: 'transparent'});
                    //spanDoms.removeClass('active').eq(0).addClass('active');
                    faguang.css({
                      left: '0'
                    });
                  };
                }
              }else{
                this.value = this.value.replace(/\D/g,'');
              }

            }
          });
        }
      }
  })
