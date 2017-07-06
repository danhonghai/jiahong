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
  .controller('RepaymentCtrl', ['$scope','$ionicPopup','$state', function($scope,$ionicPopup,$state){
      console.log("RepaymentCtrl");
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
  .controller('InviterewardsCtrl', ['$scope', function($scope){
      console.log("InviterewardsCtrl");
  }])
  .controller('HistorybillCtrl', ['$scope', function($scope){
      console.log("HistorybillCtrl");
  }])
  .controller('HistorybilldetailCtrl', ['$scope', function($scope){
      console.log("HistorybilldetailCtrl");
  }])

