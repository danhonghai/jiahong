angular.module('authenticate.controllers', [])
    .controller('AuthenticateCtrl', ['$scope', function($scope){
        console.log("AuthenticateCtrl");
    }])
    .controller('IdcardCtrl', ['$scope','$ionicActionSheet', function($scope,$ionicActionSheet){
        console.log("IdcardCtrl");
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
    .controller('BankmangeCtrl', ['$scope','$ionicPopup','$state', function($scope,$ionicPopup,$state){
        console.log("BankmangeCtrl");
        $scope.faceModalOk = function(){
            $ionicPopup.show({
              title:'<span class="font-size24 modalTitle">识别成功</span>',
              scope: $scope,
              buttons: [{
                  text: "下一步",
                  type:'button-light cff804a',
                  onTap: function(e) {
                      $state.go('contactman');
                  }
              }]
          });
        };
        $scope.faceModelFair = function(){
            $ionicPopup.show({
                title:'<span class="font-size24 modalTitle">识别失败</span><p class="cs9">请严格按照提示进行人脸识别</p>',
                scope: $scope,
                buttons: [{
                    text: "重新识别",
                    type:'button-light cff804a',
                    onTap: function(e) {

                    }
                }]
            });
        };
        $scope.faceRecognition = function(){
            $scope.faceModalOk();
        };
    }])
    .controller('ContactmanCtrl', ['$scope', function($scope){
        console.log("ContactmanCtrl");
    }])
    .controller('ZhimaCtrl', ['$scope','$state', function($scope,$state){
        console.log("ZhimaCtrl");
        $scope.zhimaClick = function(){
            $state.go('zhimaok');
        }
    }])
    .controller('MobileserviceCtrl', ['$scope', function($scope){
        console.log("MobileserviceCtrl");
    }])
    .controller('CarinfoCtrl', ['$scope', function($scope){
        console.log("CarinfoCtrl");
    }])
    .controller('SocialCtrl', ['$scope', function($scope){
        console.log("SocialCtrl");
    }])


